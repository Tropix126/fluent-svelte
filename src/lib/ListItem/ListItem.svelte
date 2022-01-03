<script lang="ts">
	import { TextBlock } from "$lib";
	import { createEventForwarder } from "$lib/internal";
	import { get_current_component } from "svelte/internal";

	/** @restProps {button | a} */
	/** Controls whether the item is selected or not. */
	export let selected = false;

	/** Controls whether the item is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Sets an href value and converts the list element into an anchor. */
	export let href = "";

	/** Specifies a custom class name for the item. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the item's element. */
	export let element: HTMLAnchorElement | HTMLLIElement = null;

	const forwardEvents = createEventForwarder(get_current_component());

	function handleKeyDown({ key, target }) {
		if (key === "Enter") target.click();
	}
</script>

{#if href && !disabled}
	<a
		use:forwardEvents
		on:keydown={handleKeyDown}
		bind:this={element}
		tabindex={disabled ? -1 : 0}
		role="listitem"
		class="list-item {className}"
		class:selected
		class:disabled
		{href}
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
		class="list-item {className}"
		class:selected
		class:disabled
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
