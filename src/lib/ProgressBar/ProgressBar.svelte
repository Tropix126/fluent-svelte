<script lang="ts">
	/** Determines a completion amount in percentage */
	export let value: number = undefined;

	/** Determines the progress bar's visual state. */
	export let status: "running" | "paused" | "error" = "running";

	/** Specifies a custom class name for the bar */
	let className = "";
	export { className as class };

	let element: SVGElement;

	export const getElement = () => element;
</script>

<svg
	class="progress-bar status-{status} {className ?? ''}"
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
		<rect height="1" rx="0.5" y="1" width="100%" class="progress-bar-rail" />
	{:else}
		<rect height="3" ry="3" class="progress-bar-track" />
	{/if}
	<rect width={value ? `${value}%` : undefined} height="3" rx="1.5" class="progress-bar-track" />
</svg>

<style lang="scss">
	@use "./ProgressBar";
</style>
