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

	const map = {
		caption: {
			tag: "span",
			name: "caption"
		},
		body: {
			tag: "span",
			name: "body"
		},
		bodyStrong: {
			tag: "h5",
			name: "body-strong"
		},
		bodyLarge: {
			tag: "h5",
			name: "body-large"
		},
		subtitle: {
			tag: "h4",
			name: "subtitle"
		},
		title: {
			tag: "h3",
			name: "title"
		},
		titleLarge: {
			tag: "h2",
			name: "title-large"
		},
		display: {
			tag: "h1",
			name: "display"
		}
	};
</script>

<svelte:element
	this={tag ? tag : map[variant].tag}
	class="text-block type-{map[variant].name} {className}"
	bind:this={element}
	{...$$restProps}
>
	<slot />
</svelte:element>

<style lang="scss">
	@use "./TextBlock";
</style>
