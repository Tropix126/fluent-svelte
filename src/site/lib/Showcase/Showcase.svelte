<script lang="ts">
	import { IconButton, Tooltip } from "$lib";

	import _panzoom from "panzoom";
	import type { PanZoomOptions } from "panzoom";

	import Edit from "@fluentui/svg-icons/icons/edit_16_regular.svg?raw";

	export let columns = 1;

	export let columnWidth = "1fr";

	export let repl = "";

	let className = "";
	export { className as class };

	function panzoom(node: HTMLElement, options?: PanZoomOptions) {
		_panzoom(node, options);
	}
</script>

<div class="component-showcase {className}" {...$$restProps}>
	<div use:panzoom={{ minZoom: 0.5, maxZoom: 10, bounds: true }} class="component-showcase-inner">
		<div
			class="component-showcase-grid"
			style="grid-template-columns: {`${columnWidth} `.repeat(columns)}"
		>
			<slot />
		</div>
		<svg class="component-showcase-backdrop">
			<pattern
				id="pattern-14333"
				x="5.800038310074086"
				y="6.229276141719765"
				width="11.17258097342026"
				height="11.17258097342026"
				patternUnits="userSpaceOnUse"
			>
				<circle
					cx="0.2979354926245403"
					cy="0.2979354926245403"
					r="0.2979354926245403"
					fill="var(--fds-text-disabled)"
				/>
			</pattern>
			<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-14333)" />
		</svg>
	</div>
	<div class="component-showcase-buttons">
		{#if repl}
			<Tooltip text="Edit in Svelte REPL" offset={8} placement="left">
				<IconButton
					href="https://svelte.dev/repl/{repl}"
					target="blank"
					rel="noreferrer noopener"
				>
					{@html Edit}
				</IconButton>
			</Tooltip>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "./Showcase";
</style>
