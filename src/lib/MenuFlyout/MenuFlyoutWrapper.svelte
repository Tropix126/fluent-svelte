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

	$: dispatch(open ? "open" : "close");

	$: if (menu && tabbable(menuElement).length > 0) tabbable(menuElement)[0].focus();

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape" && closable) open = false;
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
	class="menu-flyout-wrapper"
	aria-expanded={open}
	aria-haspopup={open}
	aria-controls={menuId}
	on:click={() => (open = !open)}
	bind:this={wrapperElement}
>
	<slot />
	{#if open}
		<div
			id={menuId}
			class="menu-flyout-anchor placement-{placement} alignment-{alignment}"
			style="--fds-menu-flyout-offset: {offset}px;"
			bind:this={anchorElement}
			use:arrowNavigation={{ preventTab: true }}
			on:click={e => e.stopPropagation()}
		>
			<MenuFlyoutSurface bind:element={menuElement} bind:this={menu} class={className ?? ""} {...$$restProps}>
				<slot name="flyout" />
			</MenuFlyoutSurface>
		</div>
		<div class="menu-flyout-backdrop" bind:this={backdropElement} on:mousedown={() => (open = false)} />
	{/if}
</div>

<style lang="scss">
	.menu-flyout- {
		&wrapper {
			display: inline-block;
			height: auto;
			position: relative;
		}
		&backdrop {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 9999;
		}
		&anchor {
			position: absolute;
			z-index: 10000;
			&.placement- {
				&top {
					--fds-menu-flyout-transition-offset: 50%;
					bottom: calc(100% + var(--menu-flyout-offset));
				}
				&bottom {
					top: calc(100% + var(--menu-flyout-offset));
				}
				&left {
					right: calc(100% + var(--menu-flyout-offset));
				}
				&right {
					left: calc(100% + var(--menu-flyout-offset));
				}
				&top,
				&bottom {
					&.alignment- {
						&start {
							inset-inline-start: 0;
						}
						&end {
							inset-inline-end: 0;
						}
						&center {
							inset-inline-start: 50%;
							transform: translateX(-50%);
						}
					}
				}
				&left,
				&right {
					&.alignment- {
						&start {
							inset-block-start: 0;
						}
						&end {
							inset-block-end: 0;
						}
						&center {
							inset-block-start: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
		}
	}
</style>
