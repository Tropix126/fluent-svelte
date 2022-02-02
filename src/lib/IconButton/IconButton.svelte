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

<!--
@component
An Icon Button is a clickable control that triggers an immediate action. Unlike the Button control, it serves the purpose of encapsulating an icon glyph as it’s content. [Docs](https://fluent-svelte.vercel.app/docs/components/iconbutton)
- Usage:
    ```tsx
    <IconButton>
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 14A6 6 0 108 2a6 6 0 000 12zm0-1A5 5 0 118 3a5 5 0 010 10z" />
        </svg>
    </IconButton>
    ```
-->
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
