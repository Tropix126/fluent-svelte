<script lang="ts">
	/** Sets an href value and converts the icon button element into an anchor */
	export let href = "";

	/** Controls whether the icon button is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the icon button */
	let className = "";
	export { className as class };

	let element: HTMLButtonElement | HTMLAnchorElement;

	export const getElement = () => element;
</script>

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
		class="icon-button {className ?? ''}"
		class:disabled
		{href}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
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
		class="icon-button {className ?? ''}"
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
