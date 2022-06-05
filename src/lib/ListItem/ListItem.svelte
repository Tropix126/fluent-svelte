<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder } from "$lib/internal";

	import TextBlock from "../TextBlock/TextBlock.svelte";

	/** @restProps {button | a} */
	/** Controls whether the item is selected or not. */
	export let selected = false;

	/** Controls whether the item is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Sets an href value and converts the list element into an anchor. */
	export let href = "";

	/** Specifies an ARIA role for the item. */
	export let role = "listitem";

	/** Specifies a custom class name for the item. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the item's element. */
	export let element: HTMLAnchorElement | HTMLLIElement = null;

	const forwardEvents = createEventForwarder(get_current_component(), ["select"]);
	const dispatch = createEventDispatcher();

	$: if (selected) dispatch("select");

	function handleKeyDown({ key, target }) {
		if (key === "Enter") target.click();
	}
</script>

<!--
@component
List Items display data stacked vertically in a single column. List Items work better for items that have text as a focal point, and for collections that are meant to be read top to bottom (i.e. alphabetically ordered). A few common use cases for List Items include lists of messages and search results. [Docs](https://fluent-svelte.vercel.app/docs/components/listitem)
- Usage:
    ```tsx
    <ListItem>Text</ListItem>
    ```
-->
{#if href && !disabled}
	<a
		use:forwardEvents
		on:keydown={handleKeyDown}
		bind:this={element}
		tabindex={disabled ? -1 : 0}
		aria-selected={selected}
		class="list-item {className}"
		class:selected
		class:disabled
		{href}
		{role}
		{...$$restProps}
	>
		<slot name="icon" />
		<TextBlock>
			<slot />
		</TextBlock>
	</a>
{:else}
	<li
		use:forwardEvents
		on:keydown={handleKeyDown}
		bind:this={element}
		tabindex={disabled ? -1 : 0}
		aria-selected={selected}
		class="list-item {className}"
		class:selected
		class:disabled
		{href}
		{role}
		{...$$restProps}
	>
		<slot name="icon" />
		<TextBlock>
			<slot />
		</TextBlock>
	</li>
{/if}

<style lang="scss">
	@use "./ListItem";
</style>
