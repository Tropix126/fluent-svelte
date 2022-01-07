<script lang="ts">
	import Showcase from "./Showcase.svelte"
	import { TextBlock } from "$lib"
	import type { PreparedExample } from "$site/data/docs"

	export let example: PreparedExample
	const modulePromise = import(`../../examples/${ example.pagePath }/${ example.componentName }.svelte`)
</script>

<div class="code-example">
	<TextBlock class="example-title" variant="title">{example.title}</TextBlock>
	<div class="example code-example">
		<Showcase columns={3} repl={example.repl}>
			{#await modulePromise then module}
				<svelte:component this={module.default}/>
			{/await}
		</Showcase>
		<pre>
			<code>{example.source}</code>
		</pre>
	</div>
	<TextBlock class="example-description">{@html example.description}</TextBlock>
</div>

<style lang="scss">
	@use "CodeExample";
</style>