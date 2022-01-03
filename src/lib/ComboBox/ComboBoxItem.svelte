<script lang="ts">
	import { createEventForwarder } from "$lib/internal";
	import { get_current_component } from "svelte/internal";

	export let selected = false;
	export let disabled = false;

	let className = "";
	export { className as class };

	const forwardEvents = createEventForwarder(get_current_component());
</script>

<li
	use:forwardEvents
	tabindex="0"
	class="combo-box-item {className}"
	class:selected
	class:disabled
	{...$$restProps}
>
	<slot name="icon" />
	<span>
		<slot />
	</span>
</li>

<style lang="scss">
	@use "./ComboBoxItem";
</style>
