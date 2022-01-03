<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder } from "$lib/internal";

	/** Bindable value representing a group of radio inputs that the input will be bound to. */
	export let group: any = [];

	/** Controls whether the radio is checked or not. Only valid is `group` is not bound. */
	export let checked = false;

	/** Sets the input element's native `value` attribute for usage in forms. */
	export let value: any = undefined;

	/** Controls whether the radio is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Specifies a custom class name for the radio. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the checkbox's <input /> element. */
	export let inputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the checkbox's outer container element. */
	export let containerElement: HTMLLabelElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
</script>

<label class="radio-button-container" bind:this={containerElement}>
	<input
		use:forwardEvents
		type="radio"
		class="radio-button {className}"
		bind:group
		bind:this={inputElement}
		{value}
		{checked}
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
	@use "./RadioButton";
</style>
