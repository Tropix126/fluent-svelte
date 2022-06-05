<script lang="ts">
	import { createEventDispatcher, tick } from "svelte";
	import { get_current_component, onMount } from "svelte/internal";

	import { createEventForwarder, externalMouseEvents, uid } from "$lib/internal";

	import ComboBoxItem from "./ComboBoxItem.svelte";
	import Button from "../Button/Button.svelte";
	import TextBox from "../TextBox/TextBox.svelte";
	import TextBoxButton from "../TextBox/TextBoxButton.svelte";

	interface Item {
		name: string;
		value: any;
		disabled?: boolean;
	}

	/** Determines which specified item is selected. Correspond's to a given item's `value` key. */
	export let value: any = undefined;

	/** Current value of the ComboBox's search box. Only applicable if `searchable` is set to `true`. */
	export let searchValue: any = undefined;

	/** The initial placeholder text displayed if no item is currently selected. */
	export let placeholder = "";

	/** Array of objects representing the dropdown items. */
	export let items: Item[] = [];

	/** Determines if the ComboBox can be searched. */
	export let editable = false;

	/** Specifies whether the combobox is disabled. */
	export let disabled = false;

	/** The current visibility state of the dropdown menu. */
	export let open = false;

	/** Specifies a custom class name for the outer combobox container. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the ComboBox's value input element. */
	export let inputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the ComboBox's searchbox input element. Only applicable if `searchable` is set to `true`. */
	export let searchInputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the ComboBox's outer container element. */
	export let containerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the ComboBox's menu dropdown list element. */
	export let menuElement: HTMLUListElement = null;

	/** Obtains a bound DOM reference to the ComboBox's trigger button element. */
	export let buttonElement: HTMLButtonElement = null;

	const forwardEvents = createEventForwarder(get_current_component(), [
		"open",
		"close",
		"select",
		"change",
		"input",
		"beforeinput",
		"keydown"
	]);
	const dispatch = createEventDispatcher();
	const buttonId = uid("fds-combo-box-button-");
	const dropdownId = uid("fds-combo-box-dropdown-");

	$: selectableItems = items.filter(item => !item.disabled);
	$: selection = items.find(i => i.value === value);
	$: if (menuElement && menuElement.children.length > 0 && !editable) {
		if (selection) {
			(<HTMLLIElement>menuElement.children[items.indexOf(selection)]).focus();
		} else {
			(<HTMLLIElement>menuElement.children[0]).focus();
		}
	}
	$: if (items.length > 0) {
		if (open) {
			dispatch("open");
		} else {
			dispatch("close");
		}
	}
	$: dispatch("select", selection);
	$: menuGrowDirection =
		!selection || items[items.indexOf(selection)] === items[Math.floor(items.length / 2)]
			? "center"
			: items.indexOf(selection) < items.indexOf(items[Math.floor(items.length / 2)])
			? "top"
			: "bottom";

	let inputFocused = false;
	let itemHeight = 36;
	const maxItems = 14; // 504 (`max-block-size` in ComboBox.scss) / 36 (itemHeight)
	let menuOffset =
		itemHeight *
		-(selection
			? items.indexOf(selection)
			: Math.floor(items.length > maxItems ? maxItems / 2 : items.length / 2));

	onMount(() => {
		if (!searchValue) searchValue = value;
	});

	function updateOffset(target: HTMLElement) {
		const { top: containerTop } = containerElement.getBoundingClientRect();
		const { top: targetTop } = target.getBoundingClientRect();

		menuOffset += containerTop - targetTop;
	}

	function selectItem(item: Item) {
		if (item.disabled) return;

		value = item.value;
		searchValue = item.name;
		open = false;
		if (containerElement && !editable) (<HTMLElement>containerElement.children[0]).focus();
	}

	async function openMenu() {
		open = !open;
		await tick();
		if (editable && searchInputElement) searchInputElement.focus();
		if (menuElement && selection)
			updateOffset(<HTMLElement>menuElement.children[items.indexOf(selection)]);
	}

	async function handleKeyboardNavigation(event: KeyboardEvent | CustomEvent) {
		const { key } = <KeyboardEvent>event;
		event.stopPropagation();

		const editableClosed = editable && !open;

		// Conditions for closing the menu.
		if (key === "Tab" || key === "Esc" || key === "Escape") open = false;

		// Oh boy, here we go...
		if (
			key === "ArrowDown" &&
			!editableClosed &&
			!(items.indexOf(selection) >= items.length - 1)
		) {
			value = selectableItems[selectableItems.indexOf(selection) + 1].value; // If down arrow is pressed, check current selection and move to next non-disabled item.
			searchValue = selectableItems[selectableItems.indexOf(selection) + 1].name;
		} else if (key === "ArrowUp" && !editableClosed && !(items.indexOf(selection) <= 0)) {
			value = selectableItems[selectableItems.indexOf(selection) - 1].value; // Do the same with up arrow.
			searchValue = selectableItems[selectableItems.indexOf(selection) - 1].name;
		} else if (key === "Home") {
			value = selectableItems[0].value; // If home is pressed, move to first non-disabled item.
			searchValue = selectableItems[0].name;
		} else if (key === "End") {
			value = selectableItems[selectableItems.length - 1].value; // If end is pressed, move to last non-disabled item.
			searchValue = selectableItems[selectableItems.length - 1].name;
		} else if (open && (key === "Enter" || key === " ")) {
			event.preventDefault();
			selectItem(selection); // Select item when the enter/space key is pressed and the menu is open
		} else if (searchInputElement && document.activeElement !== searchInputElement) {
			searchInputElement.focus(); // If the input element has lost focus, regain it.
		}

		// Prevent the browser's default scrolling behavior for these keys
		if (key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End")
			event.preventDefault();

		// Keybindings for opening the menu when in editable mode using arrow keys
		if (key === "ArrowDown" || (key === "ArrowUp" && editable)) {
			if (open) {
				await tick();
				searchInputElement?.select(); // Select text when an item is chosen.
			} else {
				open = true;
			}
		}
	}

	function handleInputFocus() {
		searchInputElement.select();
		inputFocused = true;
	}

	function handleInputBlur() {
		inputFocused = false;
	}

	function handleInput(event: InputEvent | CustomEvent) {
		const match = selectableItems.find(i =>
			i.name.toLowerCase().startsWith(searchValue.toLowerCase())
		);

		if (!match) value = null;

		if (match && (<InputEvent>event).inputType === "insertText" && searchValue.trim() !== "") {
			searchInputElement.value = match.name;
			searchInputElement.setSelectionRange(searchValue.length, match.name.length);
		}

		if (match && !match.disabled) value = match.value;
		searchValue = searchInputElement.value;
	}
</script>

<!--
@component
Use a combo box (also known as a drop-down list) to present a list of items that a user can select from. A combo box starts in a compact state and expands to show a list of selectable items. 

When the combo box is closed, it either displays the current selection or is empty if there is no selected item. When the user expands the combo box, it displays the list of selectable items.
[Docs](https://fluent-svelte.vercel.app/docs/components/combobox)

- Usage:
    ```tsx
    <ComboBox items={[
		{ name: "Item 0", value: 0 },
		{ name: "Item 1", value: 1 },
		{ name: "Item 2", value: 2 },
	]} />
    ```
-->
<div
	use:forwardEvents
	use:externalMouseEvents={{ type: "mousedown" }}
	class="combo-box {className}"
	class:disabled
	class:editable
	class:open
	on:outermousedown={() => {
		if (open) open = false;
	}}
	bind:this={containerElement}
	{...$$restProps}
>
	{#if editable}
		<TextBox
			clearButton={false}
			class="combo-box-text-box"
			role="combobox"
			aria-activedescendant={inputFocused}
			aria-autocomplete="both"
			aria-controls={dropdownId}
			aria-expanded={open}
			aria-haspopup={open ? "listbox" : undefined}
			bind:value={searchValue}
			bind:inputElement={searchInputElement}
			on:keydown={handleKeyboardNavigation}
			on:input={handleInput}
			on:focus={handleInputFocus}
			on:blur={handleInputBlur}
			on:change
			on:input
			on:beforeinput
			on:keydown
			{placeholder}
			{disabled}
		>
			<TextBoxButton
				aria-expanded={open}
				aria-label="Open dropdown"
				aria-controls={dropdownId}
				class="combo-box-dropdown-button"
				on:click={openMenu}
				bind:element={buttonElement}
				slot="buttons"
			>
				<svg
					aria-hidden="true"
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
			</TextBoxButton>
		</TextBox>
	{:else}
		<Button
			type="button"
			class="combo-box-button"
			id={buttonId}
			aria-labelledby={buttonId}
			aria-haspopup={open ? "listbox" : undefined}
			aria-controls={dropdownId}
			on:keydown={handleKeyboardNavigation}
			on:keydown
			on:click={openMenu}
			bind:element={buttonElement}
			{disabled}
		>
			<span class="combo-box-label" class:placeholder={!selection}>
				{selection?.name || placeholder}
			</span>
			<svg
				aria-hidden="true"
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
	{/if}
	{#if !disabled && items.length > 0}
		{#if open}
			<ul
				bind:this={menuElement}
				on:blur={() => (open = false)}
				id={dropdownId}
				aria-labelledby={buttonId}
				aria-activedescendant={editable
					? undefined
					: `${dropdownId}-item-${items.indexOf(selection)}`}
				role="listbox"
				class="combo-box-dropdown direction-{!editable
					? menuGrowDirection ?? 'center'
					: 'top'}"
				style="--fds-menu-offset: {menuOffset}px;"
			>
				{#each items as item, i}
					<ComboBoxItem
						role="option"
						selected={item.value === value}
						disabled={item.disabled}
						id="{dropdownId}-item-{i}"
						on:keydown={handleKeyboardNavigation}
						on:click={() => selectItem(item)}
					>
						{item.name}
					</ComboBoxItem>
				{/each}
			</ul>
		{/if}

		<input
			type="hidden"
			aria-hidden="true"
			bind:this={inputElement}
			bind:value
			on:change
			on:input
			on:beforeinput
		/>
		<slot />
	{/if}
</div>

<style lang="scss">
	@use "./ComboBox";
</style>
