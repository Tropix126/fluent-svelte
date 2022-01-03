<script lang="ts">
	/** Determines which preset text style should be used. */
	export let variant:
		| "caption"
		| "body"
		| "bodyStrong"
		| "bodyLarge"
		| "subtitle"
		| "title"
		| "titleLarge"
		| "display" = "body";

	/** Specifies a custom class name for the text block */
	export let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the text's element. */
	export let element: HTMLElement = null;
</script>

{#if variant === "caption"}
	<span class="text-block type-caption {className}" bind:this={element} {...$$restProps}>
		<slot />
	</span>
{:else if variant === "body"}
	<span class="text-block type-body {className}" bind:this={element} {...$$restProps}>
		<slot />
	</span>
{:else if variant === "bodyStrong"}
	<h6 class="text-block type-body-strong {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h6>
{:else if variant === "bodyLarge"}
	<h5 class="text-block type-body-large {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h5>
{:else if variant === "subtitle"}
	<h4 class="text-block type-subtitle {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h4>
{:else if variant === "title"}
	<h3 class="text-block type-title {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h3>
{:else if variant === "titleLarge"}
	<h2 class="text-block type-title-large {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h2>
{:else if variant === "display"}
	<h1 class="text-block type-display {className}" bind:this={element} {...$$restProps}>
		<slot />
	</h1>
{/if}

<style lang="scss">
	@use "./TextBlock";
</style>
