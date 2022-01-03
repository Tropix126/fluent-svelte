<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { uid, focusTrap } from "$lib/internal";

	import FlyoutSurface from "./FlyoutSurface.svelte";

	/** Determines the flyout's visibility. */
	export let open = false;

	/** Determines if the flyout can be closed using conventional user interaction. */
	export let closable = true;

	/** Direction that the flyout will be opened from. */
	export let placement: "top" | "bottom" | "left" | "right" = "top";

	/** Alignment of the menu along the clickable target's given axis. */
	export let alignment: "start" | "center" | "end" = "center";

	/** Distance of the flyout from the control button in pixels. */
	export let offset = 4;

	/** Specifies a custom class name for the flyout. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the content wrapper element. */
	export let wrapperElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the menu's positioning anchor element. */
	export let anchorElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the inner menu element. */
	export let menuElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the menu backdrop, which is present while the menu is `open`. */
	export let backdropElement: HTMLDivElement = null;

	const dispatch = createEventDispatcher();
	const menuId = uid("fds-flyout-anchor-");

	$: dispatch(open ? "open" : "close");

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape" && closable) open = false;
	}

	function closeFlyout() {
		if (closable) open = false;
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

<div
	class="flyout-wrapper"
	aria-expanded={open}
	aria-haspopup={open}
	aria-controls={menuId}
	on:click={() => (open = !open)}
	bind:this={wrapperElement}
>
	<slot />
	{#if open}
		<slot name="override">
			<div
				id={menuId}
				class="flyout-anchor placement-{placement} alignment-{alignment}"
				style="--fds-flyout-offset: {offset}px;"
				use:focusTrap
				bind:this={anchorElement}
				on:click={e => e.stopPropagation()}
			>
				<FlyoutSurface bind:element={menuElement} class={className ?? ""} {...$$restProps}>
					<slot name="flyout" />
				</FlyoutSurface>
			</div>
			<div class="flyout-backdrop" bind:this={backdropElement} on:mousedown={closeFlyout} />
		</slot>
	{/if}
</div>

<style lang="scss">
	@use "./FlyoutWrapper";
</style>
