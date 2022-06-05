<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { uid, focusTrap, getCSSDuration } from "$lib/internal";
	import { fade } from "svelte/transition";
	import { circOut } from "svelte/easing";

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

	/** Determines if keyboard focus should be locked to the flyout's contents. */
	export let trapFocus = true;

	/** Specifies a custom class name for the content wrapper. */
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

	$: _focusTrap = trapFocus ? focusTrap : () => {};
	$: if (open) {
		dispatch("open");
	} else {
		dispatch("close");
	}

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape" && closable) open = false;
	}

	function closeFlyout() {
		if (closable) open = false;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			open = !open;
		}
	}
</script>

<!--
@component
Flyouts represent a control that displays lightweight UI that is either information, or requires user interaction. Unlike a dialog, a Flyout can be dismissed by clicking or tapping outside of it, or pressing the Esc key. [Docs](https://fluent-svelte.vercel.app/docs/components/flyout)
- Usage:
    ```tsx
    <Flyout>
        <Button>Trigger Button</Button>
        <svelte:fragment slot="flyout">
            Flyout Contents
        </svelte:fragment>
    </Flyout>
    ```
-->

<svelte:window on:keydown={handleEscapeKey} />

<div
	class="flyout-wrapper {className}"
	aria-expanded={open}
	aria-haspopup={open}
	aria-controls={menuId}
	on:click={() => (open = !open)}
	on:keydown={handleKeyDown}
	bind:this={wrapperElement}
>
	<slot />
	{#if open}
		<div
			id={menuId}
			class="flyout-anchor placement-{placement} alignment-{alignment}"
			style="--fds-flyout-offset: {offset}px;"
			use:_focusTrap
			out:fade|local={{
				duration: getCSSDuration("--fds-control-faster-duration"),
				easing: circOut
			}}
			bind:this={anchorElement}
			on:click={e => e.stopPropagation()}
			{...$$restProps}
		>
			<slot name="override">
				<FlyoutSurface bind:element={menuElement}>
					<slot name="flyout" />
				</FlyoutSurface>
			</slot>
		</div>
		<div
			class="flyout-backdrop"
			bind:this={backdropElement}
			on:click={e => e.stopPropagation()}
			on:mousedown={closeFlyout}
		/>
	{/if}
</div>

<style lang="scss">
	@use "./FlyoutWrapper";
</style>
