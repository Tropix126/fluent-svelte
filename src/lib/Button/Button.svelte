<script lang="ts">
	/** Sets an href value and converts the button element into an anchor */
	export let href = "";

	/** Specifies the visual styling of the button */
	export let variant: "standard" | "accent" | "hyperlink" = "standard";

	/** Controls whether the button is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the button */
	let className = "";
	export { className as class };
</script>

{#if href && !disabled}
	<a
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
