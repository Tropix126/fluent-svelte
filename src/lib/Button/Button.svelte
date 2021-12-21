<script lang="ts">
	/** @restProps {button | a} */

	/** Specifies the visual styling of the button */
	export let variant: "standard" | "accent" | "hyperlink" = "standard";

	/** Sets an href value and converts the button element into an anchor */
	export let href = "";

	/** Controls whether the button is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the button */
	let className = "";
	export { className as class };

	let element: HTMLButtonElement | HTMLAnchorElement;

	export const getElement = () => element;
</script>


<!--
@component
A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus.
- Usage:
    ```tsx
    <Button>Click me!</Button>
    ```
-->
{#if href && !disabled}
	<a
		bind:this={element}
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
		on:keydown
		on:keyup
		class="button style-{variant} {className ?? ''}"
		class:disabled
		{href}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		bind:this={element}
		on:click
		on:blur
		on:focus
		on:dblclick
		on:contextmenu
		on:mousedown
		on:mouseup
		on:mouseover
		on:mouseout
		on:mouseleave
		on:keypress
		on:keydown
		on:keyup
		class="button style-{variant} {className ?? ''}"
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
