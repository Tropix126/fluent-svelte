<script lang="ts">
	import { createEventForwarder } from "$lib/internal";
	import { get_current_component } from "svelte/internal";

	export let type = "button";

	let className = "";
	export { className as class };

	export let element: HTMLButtonElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
</script>

<button
	use:forwardEvents
	bind:this={element}
	class="text-box-button {className}"
	{type}
	{...$$restProps}
>
	<slot />
</button>

<style lang="scss">
	@use "./TextBoxButton";
</style>
