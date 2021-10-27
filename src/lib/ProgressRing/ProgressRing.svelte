<script lang="ts">
	/** Determines a completion amount in percentage */
	export let value: number = undefined;

	/** Determines the size of the ring in pixels */
	export let size = 32;

	/** Specifies a custom class name for the ring */
	let className = "";
	export { className as class };

	let element: SVGElement;
	let circle: SVGCircleElement;
	let circumference: number;

	export const getElement = () => element;

	$: if (circle) {
		circumference = Math.PI * (parseInt(circle.getAttribute("r")) * 2);
		if (value < 0) value = 0;
		if (value > 100) value = 100;
	}
</script>

<svg
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
	tabindex="-1"
	class="progress-ring {className ?? ''}"
	class:indeterminate={!value}
	width={size}
	height={size}
	viewBox="0 0 16 16"
	role={value ? "progressbar" : "status"}
	aria-valuemin={value ? 0 : undefined}
	aria-valuemax={value ? 100 : undefined}
	aria-valuenow={value}
	{...$$restProps}
>
	<circle
		bind:this={circle}
		cx="50%"
		cy="50%"
		r="7"
		stroke-dasharray="3"
		stroke-dashoffset={((100 - value) / 100) * circumference}
	/>
</svg>

<style lang="scss" src="./ProgressRing.scss"></style>
