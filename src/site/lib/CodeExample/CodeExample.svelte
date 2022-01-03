<script lang="ts">
	import ArrowDown from "@fluentui/svg-icons/icons/arrow_down_32_regular.svg?raw";
	import type { DocsExample } from "$site/lib/data/examples";

	export let example: DocsExample;
</script>

<div class="code-example">
	<h3>{example.name}</h3>
	<div class="example">
		<div class="example-code">
			<pre><code>
				{@html example.src}
			</code></pre>
		</div>
		{@html ArrowDown}
		<div class="example-preview">
			<svelte:component this={example.mod} />
		</div>
	</div>
	<p class="example-description">{@html example.description}</p>
</div>

<style lang="scss">
	@use "CodeExample";
</style>
