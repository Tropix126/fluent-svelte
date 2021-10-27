<script lang="ts">
	/** Controls whether the switch is toggled or not */
	export let checked = false;

	/** Controls whether the checkbox is disabled */
	export let disabled = false;

	/** Specifies the input's native value attribute */
	export let value: any = undefined;

	/** Specifies a custom class name for the switch */
	let className = "";
	export { className as class };

	let element: HTMLInputElement;

	export const getElement = () => element;
</script>

<label class="toggle-switch-container" class:disabled>
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
		class="toggle-switch {className ?? ''}"
		type="checkbox"
		bind:checked
		bind:this={element}
		{value}
		{disabled}
		{...$$restProps}
	/>
	{#if $$slots.default}
		<span>
			<slot />
		</span>
	{/if}
</label>

<style lang="scss">
	@use "./ToggleSwitch";
</style>
