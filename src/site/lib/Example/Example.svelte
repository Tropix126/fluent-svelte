<script lang="ts">
	export let src = "";

	$: src = src.trim();
</script>

<div class="example">
	<div class="example-preview">
		<slot name="example" />
	</div>
	<code>
		<pre class="language-svelte"><slot name="code" /></pre>
	</code>
</div>

<style lang="scss">
	@use "./Example";
</style>
