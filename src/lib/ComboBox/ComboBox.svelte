<script lang="ts">
	import { createEventDispatcher, tick } from "svelte";

	import { externalMouseEvents } from "../internal";

	import Button from "../Button/Button.svelte";
	import ComboBoxItem from "./ComboBoxItem.svelte";

	interface Item {
		name: string;
		value: any;
		// disabled?: boolean
	}

	/** Specifies whether the combobox is disabled */
	export let disabled = false;

	/** Key corresponding to the selected item's "value" key */
	export let value = undefined;

	/** Specifies the initial placeholder text on the button */
	export let placeholder = "";

	/** Array of objects representing the rendereddropdown items */
	export let items: Item[] = [];

	/** Specifies a custom class name for the outer combobox container */
	let className = "";
	export { className as class };

	const dispatch = createEventDispatcher();

	$: selection = items.find(i => i.value === value);
	$: if (menu && menu.children.length > 0) {
		if (selection) (menu.children[items.indexOf(selection)] as HTMLLIElement).focus();
		else (menu.children[0] as HTMLLIElement).focus();
	}
	$: dispatch("select", selection);
	$: menuGrowDirection =
		!selection || items[items.indexOf(selection)] === items[Math.floor(items.length / 2)]
			? "center"
			: items.indexOf(selection) < items.indexOf(items[Math.floor(items.length / 2)])
			? "top"
			: "bottom";

	let container: HTMLDivElement;
	let menu: HTMLUListElement;
	let open = false;
	let itemHeight = 36;
	let menuOffset =
		itemHeight * -(selection ? items.indexOf(selection) : Math.floor(items.length / 2));

	export const getElement = () => container;

	function updateOffset(target: HTMLElement) {
		menuOffset = -(
			target.offsetTop - parseInt(getComputedStyle(target).getPropertyValue("margin-top"))
		);
	}

	function selectItem(item: Item) {
		value = item.value;
		open = false;
		if (container) (container.children[0] as HTMLElement).focus();
	}

	async function openMenu() {
		open = !open;
		await tick();
		if (menu && selection) updateOffset(menu.children[items.indexOf(selection)] as HTMLElement);
	}

	function handleArrowKeys(event: KeyboardEvent) {
		const { key } = event;

		if (key === "Tab" || key === "Esc" || key === "Escape") open = false;
		if (key === "ArrowDown" || key === "ArrowUp") event.preventDefault();
		if (key === "ArrowDown" && !(items.indexOf(selection) >= items.length - 1)) {
			value = items[items.indexOf(selection) + 1].value;
		} else if (key === "ArrowUp" && !(items.indexOf(selection) <= 0)) {
			value = items[items.indexOf(selection) + -1].value;
		} else if (menu && selection && key === "Enter") {
			event.preventDefault();
			selectItem(selection);
		} else if (!menu && selection && key === "Enter") openMenu();
	}
</script>

<div
	class="combo-box {className ?? ''}"
	class:disabled
	use:externalMouseEvents={{ type: "mousedown" }}
	on:outermousedown={() => {
		if (open) open = false;
	}}
	bind:this={container}
	{...$$restProps}
>
	<Button
		{disabled}
		on:keydown={handleArrowKeys}
		on:keydown
		on:click={openMenu}
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
		on:keyup
	>
		<span class="combo-box-label" class:placeholder={!selection}>
			{selection?.name || placeholder}
		</span>
		<svg
			class="combo-box-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 48 48"
		>
			<path
				fill="currentColor"
				d="M8.36612 16.1161C7.87796 16.6043 7.87796 17.3957 8.36612 17.8839L23.1161 32.6339C23.6043 33.122 24.3957 33.122 24.8839 32.6339L39.6339 17.8839C40.122 17.3957 40.122 16.6043 39.6339 16.1161C39.1457 15.628 38.3543 15.628 37.8661 16.1161L24 29.9822L10.1339 16.1161C9.64573 15.628 8.85427 15.628 8.36612 16.1161Z"
			/>
		</svg>
	</Button>
	{#if !disabled && items}
		{#if open}
			<ul
				bind:this={menu}
				on:blur={() => (open = false)}
				role="menu"
				class="combo-box-dropdown direction-{menuGrowDirection ?? 'center'}"
				style="--fds-menu-offset: {menuOffset}px;"
			>
				{#each items as item}
					<ComboBoxItem
						role="menuitem"
						selected={item.value === value}
						on:keydown={handleArrowKeys}
						on:click={() => selectItem(item)}
					>
						<slot name="item" />
						{item.name}
					</ComboBoxItem>
				{/each}
			</ul>
		{/if}

		<input type="hidden" aria-hidden="true" {value} />

		<slot />
	{/if}
</div>

<style lang="scss">
	@use "./ComboBox";
</style>
