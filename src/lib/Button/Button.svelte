<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder } from "$lib/internal";

	/** @restProps {button | a} */
	/** Specifies the visual styling of the button. */
	export let variant: "standard" | "accent" | "hyperlink" = "standard";

	/** Sets an href value and converts the button element into an anchor/ */
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
A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus. [Docs](https://fluent-svelte.vercel.app/docs/components/button)
- Usage:
    ```tsx
    <Button>Click me!</Button>
    ```
-->
{#if href && !disabled}
	<a
		use:forwardEvents
		bind:this={element}
		role="button"
		class="button style-{variant} {className}"
		class:disabled
		{href}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		use:forwardEvents
		bind:this={element}
		class="button style-{variant} {className}"
		class:disabled
		{disabled}
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	@use "./Button";
</style>
