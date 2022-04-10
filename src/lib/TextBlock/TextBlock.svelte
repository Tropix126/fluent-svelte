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

    /** Overrides the default HTML tag of the block's element with your own tag. */
    export let tag = undefined;

	/** Specifies a custom class name for the text block */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the text's element. */
	export let element: HTMLElement = null;

    const tags = {
        caption: "caption",
        body: "body",
        bodyStrong: "bodyStrong",
        bodyLarge: "bodyLarge",
        subtitle: "subtitle",
        title: "title",
        titleLarge: "titleLarge",
        display: "display",
    }
</script>

<svelte:element this={tag ? tag : tags[variant]} class="text-block type-{variant} {className}" bind:this={element} {...$$restProps}>
    <slot />
</svelte:element>

<style lang="scss">
	@use "./TextBlock";
</style>
