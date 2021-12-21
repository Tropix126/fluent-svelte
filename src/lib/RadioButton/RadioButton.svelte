<script lang="ts">
	import TextBlock from "../TextBlock/TextBlock.svelte";

	/** Value representing a group of radios that the inputs will be bound to */
	export let group: any = [];

	/** Specifies whether the radio is disabled */
	export let disabled = false;

	/** Specifies the input's native value attribute */
	export let value = undefined;

	/** Determines if the radio is checked if `group` is not bound */
	export let checked = false;

	/** Specifies a custom class name for the outer combobox container */
	let className = "";
	export { className as class };

	let element: HTMLInputElement;

	export const getElement = () => element;
</script>

<label class="radio-button-container">
	<input
		on:change
		on:input
		on:beforeinput
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
		type="radio"
		aria-selected={checked || group === value}
		class="radio-button {className ?? ''}"
		bind:group
		bind:this={element}
		{value}
		{checked}
		{disabled}
		{...$$restProps}
	/>
	{#if $$slots.default}
		<TextBlock>
			<slot />
		</TextBlock>
	{/if}
</label>

<style lang="scss">
	@use "./RadioButton";
</style>
