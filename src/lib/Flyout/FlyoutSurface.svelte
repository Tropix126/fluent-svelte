<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder } from "$lib/internal";

	/** Specifies a custom class name for the surface. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the surface element. */
	export let element: HTMLDivElement = null;

	const forwardEvents = createEventForwarder(get_current_component());
</script>

<div class="flyout {className}" use:forwardEvents bind:this={element} {...$$restProps}>
	<slot />
</div>

<style lang="scss">
	@use "./FlyoutSurface";
</style>
