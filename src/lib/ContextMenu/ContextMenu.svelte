<script lang="ts">
	import { createEventDispatcher, setContext } from "svelte";

	import { externalMouseEvents, arrowNavigation } from "../internal";
	import { tabbable } from "tabbable";

	import MenuFlyoutSurface from "../MenuFlyout/MenuFlyoutSurface.svelte";

	export let closeonSelect = true;

	export let open = false;

	let element: HTMLElement;

	export const getElement = () => element;

	const dispatch = createEventDispatcher();

	let menu;
	let anchor: HTMLDivElement;
	let menuPosition = {
		x: 0,
		y: 0
	};
	let mousePosition = {
		x: 0,
		y: 0
	};

	$: dispatch(open ? "open" : "close");
	$: if (menu) tabbable(menu.getElement())[0].focus();
	$: if (anchor) {
		const { width, height, top } = anchor.getBoundingClientRect();

		menuPosition.x = Math.min(window.innerWidth - width, mousePosition.x);
		menuPosition.y =
			mousePosition.y > window.innerHeight - height
				? (mousePosition.y -= height)
				: mousePosition.y;

		if (menuPosition.y < 0) menuPosition.y = 0;
	}

	async function handleContextMenu({ clientX, clientY }: MouseEvent) {
		open = true;

		mousePosition = {
			x: clientX,
			y: clientY
		};
	}

	function handleEscapeKey({ key }) {
		if (key === "Escape") open = false;
	}

	function setAnchorOverflow() {
		anchor.style.overflow = "visible";
	}

	function mountMenu(node: HTMLDivElement) {
		document.body.appendChild(node);
		return {
			destroy: () => node.remove()
		};
	}

	setContext("closeFlyout", () => {
		dispatch("select");
		if (closeonSelect) open = false;
	});
</script>

<svelte:window on:keydown={handleEscapeKey} />

<div
	class="context-menu-wrapper"
	on:contextmenu|preventDefault={handleContextMenu}
	on:contextmenu
	bind:this={element}
>
	<slot />
	{#if open}
		<div
			use:mountMenu
			use:arrowNavigation={{ preventTab: true }}
			use:externalMouseEvents={{ type: "mousedown" }}
			on:contextmenu|stopPropagation={e => e.preventDefault()}
			bind:this={anchor}
			on:outermousedown={() => (open = false)}
			class="context-menu-anchor"
			style="top: {menuPosition.y}px; left: {menuPosition.x}px;"
		>
			<MenuFlyoutSurface
				bind:this={menu}
				on:animationend={setAnchorOverflow}
				{...$$restProps}
			>
				<slot name="menu" />
			</MenuFlyoutSurface>
		</div>
	{/if}
</div>

<style lang="scss">
	@keyframes menu-open {
		from {
			transform: translateY(-50%);
			box-shadow: none;
		}
		to {
			box-shadow: var(--flyout-shadow);
		}
	}

	.context-menu- {
		&wrapper {
			display: contents;
		}
		&anchor {
			position: fixed;
			overflow: hidden;
			z-index: 10000;
			> :global(.menu-flyout) {
				max-block-size: 100vh;
				overflow: auto;
				animation: menu-open var(--control-normal-duration)
					var(--control-fast-out-slow-in-easing);
			}
		}
	}
</style>
