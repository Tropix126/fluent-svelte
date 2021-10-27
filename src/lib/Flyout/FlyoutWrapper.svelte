<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { externalMouseEvents } from "../internal";

	import FlyoutSurface from "./FlyoutSurface.svelte";

	/** Determines the flyout's visibility */
	export let open = false;

	/** Determines whether the flyout can be closed by clicking the backdrop layer */
	export let closable = true;

	/** Distance of the flyout from the control button */
	export let gap = 5;

	/** Direction the flyout will be opened from */
	export let position: "top" | "bottom" | "left" | "right" = "top";

	/** Determines if a backdrop is present to catch click events behind the flyout */
	export let backdrop = true;

	/** Specifies a custom class name for the flyout */
	let className = "";
	export { className as class };

	const dispatch = createEventDispatcher();

	let wrapper: HTMLDivElement;

	$: if (open) dispatch("open");

	function closeFlyout() {
		if (closable) {
			dispatch("close");
			open = false;
		}
	}

	function handleEscapeKey({ key }) {
		if (key === "Escape") closeFlyout();
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

<div
	class="flyout-wrapper"
	aria-expanded={open}
	bind:this={wrapper}
	on:click={() => (open = !open)}
>
	<slot />

	{#if open}
		<div
			class="flyout-anchor position-{position}"
			style="--fds-flyout-gap: {gap}px"
			on:click={e => e.stopPropagation()}
			use:externalMouseEvents={{ type: "mousedown" }}
			on:outermousedown={closeFlyout}
		>
			<slot name="override">
				<FlyoutSurface
					class={className ?? ""}
					on:click
					on:blur
					on:focus
					on:dblclick
					on:contextmenu
					on:mousedown
					on:mouseup
					on:mouseover
					on:mouseout
					on:mouseenter
					on:mouseleave
					on:keypress
					on:keydown
					on:keyup
					{...$$restProps}
				>
					<slot name="flyout" />
				</FlyoutSurface>
			</slot>
		</div>

		{#if backdrop}
			<div on:click={e => e.stopPropagation()} aria-hidden="true" class="flyout-backdrop" />
		{/if}
	{/if}
</div>

<style lang="scss">
	@use "./FlyoutWrapper";
</style>
