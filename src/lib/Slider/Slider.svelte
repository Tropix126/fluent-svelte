<script lang="ts">
	import TooltipSurface from "../Tooltip/TooltipSurface.svelte";

	/** The slider's current value */
	export let value = 0;

	/** The minimum value of the slider */
	export let min = 0;

	/** The maximum value of the slider */
	export let max = 100;

	/** Determines how much the slider's value should increase per step */
	export let step: number = 1;

	/** Determines the position of slider ticks along the min and max of the track */
	export let ticks: number[] = [];

	/** Determines the placement of slider ticks around the track */
	export let tickPlacement: "around" | "before" | "after" = "around";

	/** Determines if the slider's value tooltip will be shown */
	export let tooltip = true;

	/** Text placed before the slider's value tooltip */
	export let prefix = "";

	/** Text placed after the slider's value tooltip */
	export let suffix = "";

	/** Determines if the slider's fill track will be visible or not */
	export let track = true;

	/** Determines the slider's orientation */
	export let orientation: "vertical" | "horizontal" = "horizontal";

	/** Determines if the slider track will be in reverse direction */
	export let reverse = false;

	/** Controls whether the slider is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the slider's container element */
	let className = "";
	export { className as class };

	let element: HTMLInputElement;
	let rail: HTMLDivElement;
	let dragging = false;
	let holding = false;

	export const getElement = () => element;
	const valueToPercentage = v => ((v - min) / (max - min)) * 100;

	function cancelMove() {
		holding = false;
		dragging = false;
	}

	function handleMove() {
		if (holding) dragging = true;
	}

	function calculateValue(event) {
		if (disabled || !rail) return;
		const { top, bottom, left, right, width, height } = rail.getBoundingClientRect();
		const percentageX = event.touches ? event.touches[0].clientX : event.clientX;
		const percentageY = event.touches ? event.touches[0].clientY : event.clientY;

		let nextStep =
			min +
			Math.round(
				((max - min) *
					(orientation === "horizontal"
						? (percentageX - (reverse ? right : left)) / width
						: -(percentageY - (reverse ? top : bottom)) / height) *
					(reverse ? -1 : 1)) /
					step
			) *
				step;

		if (nextStep <= min) nextStep = min;
		else if (nextStep >= max) nextStep = max;

		value = nextStep;
	}

	function handleArrowKeys(event) {
		const { key } = event;

		if (key === "ArrowDown" || key === "ArrowUp") event.preventDefault();
		if (key === "ArrowLeft" || (key === "ArrowDown" && !disabled)) {
			if (reverse) {
				stepUp();
			} else {
				stepDown();
			}
		} else if (key === "ArrowRight" || (key === "ArrowUp" && !disabled)) {
			if (reverse) {
				stepDown();
			} else {
				stepUp();
			}
		}
	}

	export function stepUp() {
		value += step;
		if (value > max) value = max;
	}

	export function stepDown() {
		value -= step;
		if (value < min) value = min;
	}

	$: percentage = valueToPercentage(value);
	$: {
		if (value <= min) value = min;
		else if (value >= max) value = max;

		if (dragging) {
			calculateValue(event);
			dragging = false;
		}
	}
</script>

<svelte:window
	on:mousemove={handleMove}
	on:touchmove={handleMove}
	on:mouseup={cancelMove}
	on:touchend={cancelMove}
	on:touchcancel={cancelMove}
/>

<div
	on:mousedown={() => {
		holding = true;
		dragging = true;
	}}
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
	on:touchstart|preventDefault={() => (holding = true)}
	on:keydown={handleArrowKeys}
	tabindex={disabled ? -1 : 0}
	style="--fds-slider-percentage: {percentage}%"
	class="slider orientation-{orientation} {className ?? ''}"
	class:disabled
	class:reverse
	{...$$restProps}
>
	<div
		class="slider-thumb"
		role="slider"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
	>
		{#if tooltip && !disabled}
			<TooltipSurface class="slider-tooltip">
				{prefix}{value}{suffix}
				<slot name="tooltip" />
			</TooltipSurface>
		{/if}
	</div>

	<div class="slider-rail" bind:this={rail}>
		{#if track}
			<div class="slider-track" />
		{/if}
	</div>

	{#if ticks}
		<div class="slider-tick-bar placement-{tickPlacement}">
			{#each ticks as tick}
				<div
					class="slider-tick"
					style="--fds-slider-tick-percentage: {valueToPercentage(tick)}%"
				/>
			{/each}
		</div>
	{/if}

	<input
		on:change
		on:input
		on:beforeinput
		type="range"
		hidden
		{min}
		{max}
		{step}
		{disabled}
		bind:value
		bind:this={element}
	/>
</div>

<style lang="scss">
	@use "./Slider";
</style>
