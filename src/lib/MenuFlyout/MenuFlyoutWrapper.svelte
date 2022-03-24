<script lang="ts">
	import type { SvelteComponentTyped } from "svelte";

	import { tabbable } from "tabbable";

	import { createEventDispatcher, setContext } from "svelte";
	import { arrowNavigation, uid } from "$lib/internal";

	import MenuFlyoutSurface from "./MenuFlyoutSurface.svelte";

	/** Determines the flyout's visibility. */
	export let open = false;

	/** Determines if the flyout can be closed using conventional user interaction. */
	export let closable = true;

	/** Controls if the flyout will be closed when clicking a standard variant item. Only applies if `closable` is set to `true`. */
	export let closeOnSelect = true;

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
	export let menuElement: HTMLUListElement = null;

	/** Obtains a bound DOM reference to the menu backdrop, which is present while the menu is `open`. */
	export let backdropElement: HTMLDivElement = null;

	const dispatch = createEventDispatcher();
	const menuId = uid("fds-menu-flyout-anchor-");

	let menu: SvelteComponentTyped = null;
	let previousFocus: Element = null;

	$: dispatch(open ? "open" : "close");

	$: if (menu && tabbable(menuElement).length > 0) tabbable(menuElement)[0].focus();

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape" && closable) open = false;
		(<HTMLElement>previousFocus)?.focus();
	}

	function toggleFlyout() {
		previousFocus = document.activeElement;
		open = !open;
	}

	function closeFlyout() {
		if (closable) open = false;
	}

	setContext("closeFlyout", event => {
		dispatch("select");
		if (closeOnSelect && closable) {
			event.stopPropagation();
			open = false;
		}
	});
</script>

<svelte:window on:keydown={handleEscapeKey} />

<div
	class="menu-flyout-wrapper {className}"
	aria-expanded={open}
	aria-haspopup={open}
	aria-controls={menuId}
	on:click={toggleFlyout}
	bind:this={wrapperElement}
>
	<slot />
	{#if open}
		<div
			id={menuId}
			class="menu-flyout-anchor placement-{placement} alignment-{alignment}"
			style="--fds-menu-flyout-offset: {offset}px;"
			tabindex="-1"
			bind:this={anchorElement}
			use:arrowNavigation={{ preventTab: true }}
			on:click={e => e.stopPropagation()}
		>
			<MenuFlyoutSurface bind:element={menuElement} bind:this={menu} {...$$restProps}>
				<slot name="flyout" />
			</MenuFlyoutSurface>
		</div>
		<div
			class="menu-flyout-backdrop"
			bind:this={backdropElement}
			on:click={e => e.stopPropagation()}
			on:mousedown={closeFlyout}
		/>
	{/if}
</div>

<style lang="scss">
	@use "./MenuFlyoutWrapper";
</style>
