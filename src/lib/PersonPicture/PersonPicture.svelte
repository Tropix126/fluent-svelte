<script lang="ts">
	/** The size of the picture in pixels. */
	export let size = 72;

	/** Source URL used for the picture. */
	export let src: string = undefined;

	/** Defines the alt text used if an `src` attribute is specified. Also used as fallback text if no `src` or slot text is provided. */
	export let alt: string = undefined;

	/** Specifies a custom class name for the inner picture. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the inner picture element. */
	export let element: HTMLImageElement | HTMLDivElement = null;

	/** Obtains a bound DOM reference to the outer picture container. */
	export let containerElement: HTMLDivElement = null;

	let error = false;

	$: if (src) error = false;
</script>

<div
	class="person-picture-container"
	style="--fds-person-picture-size: {size}px"
	bind:this={containerElement}
>
	{#if src && !error}
		<img
			bind:this={element}
			on:error={() => (error = true)}
			class="person-picture {className}"
			width={size}
			height={size}
			{src}
			{alt}
			{...$$restProps}
		/>
	{:else}
		<div bind:this={element} class="person-picture {className}" {...$$restProps}>
			<slot>
				{alt
					?.split(" ")
					.map(i => i.charAt(0))
					.join("")
					.toUpperCase() ?? ""}
			</slot>
		</div>
	{/if}
	{#if $$slots.badge}
		<span class="person-picture-badge">
			<slot name="badge" />
		</span>
	{/if}
</div>

<style lang="scss">
	@use "./PersonPicture";
</style>
