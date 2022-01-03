<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder } from "$lib/internal";

	/** @restProps {button | a} */
	/** Sets an href value and converts the button element into an anchor. */
	export let href = "";

	/** Controls whether the button is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Specifies a custom class name for the button. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the button or anchor element. */
	export let element: HTMLButtonElement | HTMLAnchorElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
</script>

{#if href && !disabled}
	<a
		use:forwardEvents
		bind:this={element}
		class="icon-button {className}"
		class:disabled
		{href}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		use:forwardEvents
		class="icon-button {className}"
		class:disabled
		{disabled}
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	@use "./IconButton";
</style>
