<script lang="ts">
	import type { SvelteComponentTyped } from "svelte";

	import { createEventDispatcher, getContext } from "svelte";
	import { get_current_component } from "svelte/internal";

	import { arrowNavigation, uid, createEventForwarder } from "$lib/internal";
	import { tabbable } from "tabbable";

	import MenuFlyoutSurface from "../MenuFlyout/MenuFlyoutSurface.svelte";
	import TextBlock from "../TextBlock/TextBlock.svelte";

	/** Specifies an input type for the item. */
	export let variant: "standard" | "radio" | "toggle" = "standard";

	/** Marks the item as having a cascading submenu attached to it, and makes the `flyout` slot available. */
	export let cascading = false;

	/** Secondary hint text displayed to the right of the item. Useful for displaying keyboard accelerators. */
	export let hint: string = undefined;

	/** Specifies if the item should be styled as selected by the user. */
	export let selected = false;

	/** Marks a radio or toggle variant item as checked. */
	export let checked = false;

	/** Indents the left padding of the item making it's text inline with the added icons of other items. */
	export let indented = false;

	/** Specifies a radio input group that the item should be bound to. Only valid if `variant` is set to `radio`. */
	export let group: any = [];

	/** Specifies a form input value attribute if `variant` is set to `toggle` or `radio`. */
	export let value: any = undefined;

	/** Controls whether the item is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** The current visibility state of a cascading submenu. Only valid is `cascading` is true. */
	export let open = false;

	/** INTERNAL USE ONLY: Communicates to the wrapped <svelte:self /> instance that the item variant should not be recursively rendered. */
	export let __depth = false;

	/** Specifies a custom class name for the item. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the item's main container. */
	export let element: HTMLLIElement = null;

	/** Obtains a bound DOM reference to the item's input element, which is present if `variant` is set to `toggle` or `radio`. */
	export let inputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the item's outer label, which is present if `variant` is set to `toggle` or `radio`. */
	export let inputLabelElement: HTMLLabelElement = null;

	/** Obtains a bound DOM reference to the item's submenu anchor element, which is present if the item is cascading and the submenu is visible. */
	export let subMenuAnchorElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the inner submenumenu element, which is present if the item is cascading and the submenu is visible. */
	export let subMenuElement: HTMLUListElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
	const dispatch = createEventDispatcher();
	const closeFlyout = getContext<(event: Event) => void>("closeFlyout");
	const menuId = uid("fds-menu-flyout-submenu-");

	let menu: SvelteComponentTyped = null;
	let subMenuQueue = {
		open: false,
		close: false
	};

	$: dispatch(open ? "open" : "close");
	$: if (open && menu && tabbable(subMenuElement).length > 0) tabbable(subMenuElement)[0].focus();

	function close(event) {
		setTimeout(() => {
			if (!cascading && closeFlyout) closeFlyout(event);
		});
	}

	function handleKeyDown(event) {
		const { key, target } = event;
		if (key === "Enter" || key === " ") {
			event.preventDefault();
			target.click();
		}
		if (cascading) {
			if (key === "ArrowRight") {
				event.stopPropagation();
				open = true;
			} else if (open && key === "ArrowLeft") {
				event.stopPropagation();
				open = false;
				element.focus();
			}
		}
	}

	function handleMouseEnter() {
		subMenuQueue.close = false;
		subMenuQueue.open = true;
		setTimeout(() => {
			if (subMenuQueue.open) open = true;
		}, 500);
	}

	function handleMouseLeave() {
		subMenuQueue.close = true;
		subMenuQueue.open = false;
		setTimeout(() => {
			if (subMenuQueue.close) open = false;
		}, 500);
	}
</script>

{#if variant === "standard" || __depth}
	<li
		tabindex={disabled ? -1 : 0}
		role="menuitem"
		aria-expanded={$$slots.flyout && !disabled && open}
		aria-haspopup={$$slots.flyout && !disabled && open}
		aria-controls={$$slots.flyout && !disabled && menuId}
		aria-selected={selected || checked}
		class="menu-flyout-item type-{variant} {className}"
		class:cascading
		class:selected
		class:checked
		class:disabled
		class:indented
		use:forwardEvents
		bind:this={element}
		on:click={close}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		on:keydown={handleKeyDown}
		{...$$restProps}
	>
		<slot name="icon" />
		<slot />
		{#if hint}
			<TextBlock class="menu-flyout-item-hint" variant="caption">{hint}</TextBlock>
		{/if}
		{#if cascading}
			<svg
				class="menu-flyout-item-arrow"
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
			>
				<path
					d="M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z"
					fill="currentColor"
				/>
			</svg>
			{#if open && $$slots.flyout && !disabled}
				<div
					use:arrowNavigation={{ preventTab: true, stopPropagation: true }}
					bind:this={subMenuAnchorElement}
					id={menuId}
					class="menu-flyout-submenu-anchor"
				>
					<MenuFlyoutSurface bind:element={subMenuElement} bind:this={menu}>
						<slot name="flyout" />
					</MenuFlyoutSurface>
				</div>
			{/if}
		{/if}
	</li>
{:else if variant === "radio" || variant === "toggle"}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label bind:this={inputLabelElement} class="menu-flyout-item-input-label">
		<svelte:self
			checked={checked || group === value}
			{selected}
			{variant}
			{indented}
			{group}
			{disabled}
			__depth
		>
			<slot name="icon" slot="icon" />
			<div class="menu-flyout-item-{variant === 'radio' ? 'bullet' : 'checkmark'}">
				{#if variant === "toggle"}
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.85355 3.14645C10.0488 3.34171 10.0488 3.65829 9.85355 3.85355L5.35355 8.35355C5.15829 8.54882 4.84171 8.54882 4.64645 8.35355L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L5 7.29289L9.14645 3.14645C9.34171 2.95118 9.65829 2.95118 9.85355 3.14645Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
			</div>
			<slot />
		</svelte:self>

		{#if variant === "radio"}
			<input
				type="radio"
				hidden
				on:change
				on:input
				on:beforeinput
				bind:group
				bind:this={inputElement}
				{value}
				{checked}
				{disabled}
			/>
		{:else}
			<input
				type="checkbox"
				hidden
				on:change
				on:input
				on:beforeinput
				bind:this={inputElement}
				bind:group
				bind:checked
				bind:value
				{disabled}
			/>
		{/if}
	</label>
{/if}

<style lang="scss">
	@use "./MenuFlyoutItem";
</style>
