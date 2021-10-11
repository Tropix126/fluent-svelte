<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import FlyoutSurface from "./FlyoutSurface.svelte";

	/** Determines the flyout's visibility */
	export let open = false;

	/** Determines whether the flyout can be closed by clicking the backdrop layer */
	export let closable = true;

	/** Distance of the flyout from the control button */
	export let gap = 5;

	/** Direction the flyout will be opened from */
	export let position: "top" | "bottom" | "left" | "right" = "top";

	const dispatch = createEventDispatcher();

	let wrapper: HTMLDivElement;

	$: if (open) dispatch("open");

	function closeFlyout() {
		if (closable) {
			dispatch("close");
			open = false;
		}
	}
</script>

<div class="flyout-wrapper" aria-expanded={open} bind:this={wrapper} on:click={() => (open = true)}>
	<slot />

	{#if open}
		<div class="flyout-anchor position-{position}" style="--flyout-gap: {gap}px">
			<FlyoutSurface {...$$restProps}>
				<slot name="flyout" />
			</FlyoutSurface>
		</div>

		<div
			aria-hidden="true"
			class="flyout-backdrop"
			on:mousedown={closeFlyout}
		/>
	{/if}
</div>

<style lang="scss">
	@use "./FlyoutWrapper";
</style>
