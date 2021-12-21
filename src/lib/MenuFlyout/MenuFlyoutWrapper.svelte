<script lang="ts">
	import { tabbable } from "tabbable";

	import { createEventDispatcher, setContext } from "svelte";
	import { externalMouseEvents, arrowNavigation, uid } from "../internal";

	import MenuFlyoutSurface from "./MenuFlyoutSurface.svelte";

	/** Determines the flyout's visibility */
	export let open = false;

	/** Determines whether the flyout can be closed by clicking the backdrop layer */
	export let closable = true;

	export let closeonSelect = true;

	/** Distance of the flyout from the control button */
	export let gap = 4;

	/** Direction the flyout will be opened from */
	export let position: "top" | "bottom" | "left" | "right" = "top";

	/** Determines if a backdrop is present to catch click events behind the flyout */
	export let backdrop = true;

	/** Specifies a custom class name for the flyout */
	let className = "";
	export { className as class };

	const dispatch = createEventDispatcher();
	const menuId = uid("fds-menu-flyout-anchor-");

	let menu;

	$: if (open) {
		dispatch("open");
	} else {
		dispatch("close");
	}

	$: if (menu) tabbable(menu.getElement())[0].focus();

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape") open = false;
	}

	function mountMenu(node: HTMLDivElement) {
        document.body.appendChild(node);
		node.style.top = "0";
        return {
            destroy: () => node.remove()
        }
    }

	setContext("closeFlyout", () => {
		dispatch("select");
		if (closeonSelect) open = false;
	});
</script>

<svelte:window on:keydown={handleEscapeKey} />

<div class="menu-flyout-wrapper" aria-expanded={open} aria-haspopup={open} aria-controls={menuId} on:click={() => (open = !open)}>
	<slot />

	{#if open}
		<div
			class="menu-flyout-anchor position-{position}"
			id={menuId}
			style="--fds-menu-flyout-gap: {gap}px"
			on:click={e => e.stopPropagation()}
			use:mountMenu
			use:externalMouseEvents={{ type: "mousedown" }}
			use:arrowNavigation={{ preventTab: true }}
			on:outermousedown={() => (open = false)}
		>
			<slot name="override">
				<MenuFlyoutSurface
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
					bind:this={menu}
					{...$$restProps}
				>
					<slot name="flyout" />
				</MenuFlyoutSurface>
			</slot>
		</div>
	{/if}
</div>

<style lang="scss">
</style>
