<script lang="ts">
	/** Specifies the size of the picture in pixels */
	export let size = 72;

	/** Source URL used for the picture */
	export let src: string = undefined;

	/** Defines the alt text used if an `src` attribute is specified. Also used as a fallback if no src or slots are provided. */
	export let alt: string = undefined;

	/** Specifies a custom class name for the inner picture */
	let className = "";
	export { className as class };

	let element: HTMLImageElement | HTMLDivElement;
</script>

<div class="person-picture-container" style="--fds-person-picture-size: {size}px">
	{#if src}
		<img
			bind:this={element}
			class="person-picture {className ?? ''}"
			width={size}
			height={size}
			{src}
			{alt}
			{...$$restProps}
		/>
	{:else}
		<div bind:this={element} class="person-picture {className ?? ''}" {...$$restProps}>
			<slot>
				{alt
					.split(" ")
					.map(i => i.charAt(0))
					.join("")
					.toUpperCase()}
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
