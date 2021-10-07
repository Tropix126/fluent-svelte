<script>
	/** Controls whether the switch is toggled or not */
	export let checked = false;

	/** Controls whether the checkbox is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the switch */
	let className = "";
	export { className as class };
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
		on:mouseleave
		on:keypress
		on:keydown
		on:keyup
		class="toggle-switch {className || ''}"
		type="checkbox"
		bind:checked
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
