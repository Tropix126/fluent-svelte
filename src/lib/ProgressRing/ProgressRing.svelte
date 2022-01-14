<script lang="ts">
	import { createEventForwarder } from "$lib/internal";
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	/** Determines a completion amount in percentage (0-100). If no value or an invalid value is provided, the ring will be indeterminate. */
	export let value: number = undefined;

	/** The size (diameter) of the ring in pixels. */
	export let size = 32;

	/** Specifies a custom class name for the ring. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the ring's SVG element. */
	export let element: SVGElement = null;

	/** Obtains a bound DOM reference to the ring's fill circle element. */
	export let circleElement: SVGCircleElement = null;

	const forwardEvents = createEventForwarder(get_current_component(), ["change"]);
	const dispatch = createEventDispatcher();

	let circumference: number;

    $: indeterminate = typeof value === "undefined" || value === null || Number.isNaN(value);
	$: dispatch("change", value);
    $: if (circleElement) circumference = Math.PI * (circleElement.r.baseVal.value * 2);
	$: if (value < 0) {
		value = 0;
	} else if (value > 100) {
		value = 100;
	}
</script>

<svg
	use:forwardEvents
	bind:this={element}
	tabindex="-1"
	class="progress-ring {className}"
	class:indeterminate
	width={size}
	height={size}
	viewBox="0 0 16 16"
	role={value ? "progressbar" : "status"}
	aria-valuemin={!indeterminate ? 0 : undefined}
	aria-valuemax={!indeterminate ? 100 : undefined}
	aria-valuenow={value}
	{...$$restProps}
>
	<circle
		bind:this={circleElement}
		cx="50%"
		cy="50%"
		r="7"
		stroke-dasharray="3"
		stroke-dashoffset={((100 - value) / 100) * circumference}
	/>
</svg>

<style lang="scss" src="./ProgressRing.scss"></style>
