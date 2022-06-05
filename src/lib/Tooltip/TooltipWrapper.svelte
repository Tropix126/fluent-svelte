<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { getCSSDuration } from "$lib/internal";

	import TooltipSurface from "./TooltipSurface.svelte";

	/** Specifies the tooltip's text content. */
	export let text = "";

	/** Distance of the tooltip from the alignment axis in pixels. */
	export let offset = 24;

	/** Direction that the tooltip will appear from. */
	export let placement: "top" | "bottom" | "left" | "right" | "auto" = "auto";

	/** Alignment of the tooltip along the placement target's given axis. */
	export let alignment: "start" | "center" | "end" = "center";

	/** Allows the tooltip to follow the user's cursor if `placement` is set to `auto`. */
	export let followCursor = false;

	/** Prevents the tooltip from disappearing after cursor leaves bounds. */
	export let persistent = false;

	/** Determines if the tooltip is visible or not. */
	export let visible = false;

	/** Initial delay time for the tooltip to become visible in millseconds. */
	export let delay = 1000;

	/** Obtains a bound reference to the tooltip surface element. */
	export let tooltipElement: HTMLDivElement = null;

	/** Obtains a bound reference to the tooltip's positioning anchor element. */
	export let anchorElement: HTMLDivElement = null;

	/** Obtains a bound reference to the tooltip's content wrapper element. */
	export let wrapperElement: HTMLDivElement = null;

	let mounted = false;
	let tooltipDurationTimeout: ReturnType<typeof setTimeout>;
	let currentPosition = {
		x: 0,
		y: 0
	};
	let mousePosition = {
		x: 0,
		y: 0
	};

	onMount(() => (mounted = true));

	function updateMousePosition({ clientX, clientY }) {
		mousePosition.x = clientX;
		mousePosition.y = clientY;
	}

	function updateTooltipPositionAuto(wrapperPosition) {
		const { left, top } = wrapperPosition;

		currentPosition.x = mousePosition.x - left;
		currentPosition.y = mousePosition.y - top;
	}

	function mountTooltip() {
		tooltipDurationTimeout = setTimeout(() => {
			if (placement === "auto" && wrapperElement)
				updateTooltipPositionAuto(wrapperElement.getBoundingClientRect());

			visible = true;
		}, delay);
	}

	function destroyTooltip() {
		clearTimeout(tooltipDurationTimeout);
		if (!persistent) visible = false;
	}
</script>

<svelte:window on:scroll={destroyTooltip} />

<div
	class="tooltip-wrapper"
	title={mounted ? undefined : text}
	bind:this={wrapperElement}
	on:mouseenter={mountTooltip}
	on:mouseleave={destroyTooltip}
	on:mousemove={updateMousePosition}
	on:mousemove={() =>
		placement === "auto" &&
		followCursor &&
		updateTooltipPositionAuto(wrapperElement.getBoundingClientRect())}
>
	<slot />

	{#if visible}
		<div
			bind:this={anchorElement}
			in:fade|local={{ duration: getCSSDuration("--fds-control-fast-duration") }}
			class="tooltip-anchor placement-{placement} alignment-{alignment}"
			style="{placement === 'auto'
				? `top: calc(${currentPosition.y}px - var(--fds-tooltip-offset));
				   left: ${currentPosition.x}px;`
				: ''} --fds-tooltip-offset: {offset}px"
		>
			<TooltipSurface bind:element={tooltipElement} {...$$restProps}>
				{text}
				<slot name="tooltip" />
			</TooltipSurface>
		</div>
	{/if}
</div>

<style lang="scss">
	@use "./TooltipWrapper";
</style>
