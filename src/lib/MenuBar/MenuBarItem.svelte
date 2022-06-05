<script lang="ts">
	import type { SvelteComponentTyped } from "svelte";

	import { currentMenu } from "./flyoutState";

	import { tabbable } from "tabbable";
	import { createEventDispatcher, getContext, setContext } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder, arrowNavigation, externalMouseEvents, uid } from "$lib/internal";

	import MenuFlyoutSurface from "../MenuFlyout/MenuFlyoutSurface.svelte";

	/** The current visibility state of the item's menu. */
	export let open = false;

	/** Controls whether the item is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Specifies a custom class name for the item. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the item. */
	export let element: HTMLLIElement = null;

	/** Obtains a bound DOM reference to the menu's positioning anchor element. */
	export let anchorElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the inner menu element. */
	export let menuElement: HTMLUListElement = null;

	let menu: SvelteComponentTyped;

	const forwardEvents = createEventForwarder(get_current_component(), [
		"open",
		"close",
		"select"
	]);
	const dispatch = createEventDispatcher();
	const menuId = uid("fds-menu-flyout-anchor-");
	const handleSideNavigation =
		getContext<(event: Event, activeItem: HTMLElement) => void>("sideNavigation");

	$: if ($currentMenu !== menu) open = false;
	$: if (!menu && element) element.focus();
	$: if (menu) {
		focusFirstItem();
		$currentMenu = menu;
	} else {
		$currentMenu = null;
	}
	$: if ($$slots.flyout && open && !disabled) {
		if (open) {
			dispatch("open");
		} else {
			dispatch("close");
		}
	}

	function focusFirstItem() {
		if (open && menu && tabbable(menuElement).length > 0) tabbable(menuElement)[0].focus();
	}

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape") open = false;
	}

	function handleMouseEnter() {
		if ($currentMenu && $$slots.flyout) {
			$currentMenu = menu;
			open = true;
		}
	}

	function handleKeyDown({ key }) {
		if (key === "Enter" || key === " ") {
			event.preventDefault();
			open = !open;
		}
	}

	function handleFocus() {
		if (open) {
			focusFirstItem();
		} else if ($currentMenu) {
			$currentMenu = menu;
			open = true;
		}
	}

	setContext("closeFlyout", event => {
		dispatch("select");
		event.stopPropagation();
		open = false;
	});
</script>

<svelte:window on:keydown={handleEscapeKey} />

<li
	use:forwardEvents
	class="menu-bar-item {className}"
	class:disabled
	role="menuitem"
	tabindex={disabled ? -1 : 0}
	aria-expanded={$$slots.flyout && !disabled && open}
	aria-haspopup={$$slots.flyout && !disabled && open}
	aria-controls={$$slots.flyout && !disabled && menuId}
	bind:this={element}
	on:keydown={event => handleSideNavigation(event, element)}
	on:keydown|self={handleKeyDown}
	on:focus={handleFocus}
	on:mousedown={() => (open = !open)}
	on:mouseenter={handleMouseEnter}
	{...$$restProps}
>
	<slot />
	{#if $$slots.flyout && open && !disabled}
		<div
			class="menu-flyout-anchor"
			use:arrowNavigation={{ preventTab: true }}
			use:externalMouseEvents={{ type: "mousedown", stopPropagation: true }}
			on:outermousedown={() => (open = false)}
			bind:this={anchorElement}
		>
			<MenuFlyoutSurface bind:element={menuElement} bind:this={menu}>
				<slot name="flyout" />
			</MenuFlyoutSurface>
		</div>
	{/if}
</li>

<style lang="scss">
	@use "./MenuBarItem";
</style>
