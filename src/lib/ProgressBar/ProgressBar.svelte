<script lang="ts">
	/** Determines a completion amount in percentage. If no value or an invalid value is provided, the bar will be indeterminate. */
	export let value: number = undefined;

	/** Determines the progress bar's visual state. */
	// export let status: "running" | "paused" | "error" = "running";

	/** Specifies a custom class name for the bar. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the bar's SVG element. */
	export let element: SVGElement = null;

	/** Obtains a bound DOM reference to the bar's background rail element. Only available if the bar has a determinate value. */
	export let railElement: SVGRectElement = null;

	/** Obtains a bound DOM reference to the bar's primary track element. */
	export let trackElement: SVGRectElement = null;

	/** Obtains a bound DOM reference to the bar's secondary track element. Only available if the bar is indeterminate. */
	export let secondaryTrackElement: SVGRectElement = null;
</script>

<svg
	class="progress-bar {className}"
	role="progressbar"
	width="100%"
	height="3"
	aria-valuemin={value ? 0 : undefined}
	aria-valuemax={value ? 100 : undefined}
	aria-valuenow={value}
	class:indeterminate={!value}
	bind:this={element}
	{...$$restProps}
>
	{#if value}
		<rect
			bind:this={railElement}
			height="1"
			rx="0.5"
			y="1"
			width="100%"
			class="progress-bar-rail"
		/>
	{:else}
		<rect bind:this={secondaryTrackElement} height="3" ry="3" class="progress-bar-track" />
	{/if}
	<rect
		bind:this={trackElement}
		width={value ? `${value}%` : undefined}
		height="3"
		rx="1.5"
		class="progress-bar-track"
	/>
</svg>

<style lang="scss">
	@use "./ProgressBar";
</style>
