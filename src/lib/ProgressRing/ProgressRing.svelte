<script lang="ts">
	/** Determines a completion amount in percentage */
	export let value: number = undefined;

	/** Determines the size of the ring in pixels */
	export let size = 32;

	/** Specifies a custom class name for the ring */
	let className = "";
	export { className as class };

	let circle: SVGCircleElement;
	let circumference: number;

	$: if (circle) {
		circumference = Math.PI * (parseInt(circle.getAttribute("r")) * 2);
		if (value < 0) value = 0;
		if (value > 100) value = 100;
	}
</script>

<svg
	{...$$restProps}
	aria-valuemax={value ? 100 : undefined}
	aria-valuemin={value ? 0 : undefined}
	aria-valuenow={value}
	class="progress-ring{` ${className}` || ''}"
	class:indeterminate={!value}
	height={size}
	on:blur
	on:click
	on:contextmenu
	on:dblclick
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mousedown
	on:mouseleave
	on:mouseout
	on:mouseover
	on:mouseup
	role={value ? "progressbar" : "status"}
	tabindex="-1"
	viewBox="0 0 16 16"
	width={size}
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