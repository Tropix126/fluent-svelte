<script lang="ts">
	import { fade } from "svelte/transition";

	import TooltipSurface from "./TooltipSurface.svelte";

	/** Specifies the tooltip's text content */
	export let text = "";

	/** Distance of the tooltip from the alignment axis in pixels */
	export let offset = 48;

	/** Direction the tooltip will appear from */
	export let alignment: "auto" | "top" | "bottom" | "left" | "right" = "auto";

	/** Allows the tooltip to follow the user's cursor if `alignment` is set to "auto" and persistent is true */
	export let followCursor = false;

	/** Prevents the tooltip from disappearing after cursor leaves bounds */
	export let persistent = false;

	/** Determines if the tooltip is visible or not */
	export let visible = false;

	/** Initial delay time for the tooltip to become visible in millseconds */
	export let delay = 1000;

	type Position = { x?: number; y?: number };

	let anchor: HTMLDivElement;
	let wrapper: HTMLDivElement;
	let tooltipDurationTimeout: ReturnType<typeof setTimeout>;
	let currentPosition: Position = {
		x: 0,
		y: 0
	};
	let mousePosition: Position = {
		x: 0,
		y: 0
	};

	export const getElement = () => wrapper;

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
			if (alignment === "auto") updateTooltipPositionAuto(wrapper.getBoundingClientRect());

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
	bind:this={wrapper}
	on:mouseenter={mountTooltip}
	on:mouseleave={destroyTooltip}
	on:mousemove={updateMousePosition}
	on:mousemove={() => {
		if (followCursor) updateTooltipPositionAuto(wrapper.getBoundingClientRect());
	}}
>
	<slot />

	{#if visible}
		<div
			bind:this={anchor}
			class="tooltip-anchor alignment-{alignment}"
			style="{alignment === 'auto'
				? `top: calc(${currentPosition.y}px - var(--fds-tooltip-offset));
				   left: ${currentPosition.x}px;`
				: ''} --fds-tooltip-offset: {offset}px"
			transition:fade={{ duration: 167 }}
		>
			<TooltipSurface {...$$restProps}>
				{text}
				<slot name="tooltip" />
			</TooltipSurface>
		</div>
	{/if}
</div>

<style lang="scss">
	@use "./TooltipWrapper";
</style>
