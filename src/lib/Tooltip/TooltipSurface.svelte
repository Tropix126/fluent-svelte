<script lang="ts">
	import { createEventForwarder } from "$lib/internal";
	import { get_current_component } from "svelte/internal";

	/** Specifies a custom class name for the surface. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the surface element. */
	export let element: HTMLDivElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
</script>

<div
	class="tooltip {className}"
	role="tooltip"
	use:forwardEvents
	bind:this={element}
	{...$$restProps}
>
	<slot />
</div>

<style lang="scss">
	@use "./TooltipSurface";
</style>
