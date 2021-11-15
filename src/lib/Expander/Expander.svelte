<script lang="ts">
	import { createEventDispatcher } from "svelte";

	/** Determines whether the expander is expanded (open) or not */
	export let expanded = false;

	/** Determines the direction that the expander will extend to */
	export let direction: "down" | "up" = "down";

	let className = "";
	export { className as class };

	let element: HTMLElement;

	export const getElement = () => element;
	const dispatch = createEventDispatcher();

	function handleKeydown({ key }) {
		if (key === "Enter" || key === " ") {
			event.preventDefault();
			expanded = !expanded;
		}
	}

	$: if (expanded) {
		dispatch("expand");
	} else {
		dispatch("collapse");
	}
</script>

<div
	class="expander direction-{direction} {className ?? ''}"
	role="region"
	aria-expanded={expanded}
	class:expanded
	bind:this={element}
	on:click
	on:blur
	on:focus
	on:dblclick
	on:contextmenu
	on:mousedown
	on:mouseup
	on:mouseover
	on:mouseout
	on:mouseenter
	on:mouseleave
	on:keypress
	on:keydown
	on:keyup
	{...$$restProps}
>
	<div
		class="expander-header"
		on:keydown={handleKeydown}
		tabindex="0"
		on:click={() => (expanded = !expanded)}
	>
		{#if $$slots.icon}
			<div class="expander-icon">
				<slot name="icon" />
			</div>
		{/if}
		<div class="expander-header-title">
			<slot />
		</div>
		<button class="expander-chevron" tabindex="-1">
			<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
				{#if direction === "down"}
					<path
						fill="currentColor"
						d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"
					/>
				{:else}
					<path
						fill="currentColor"
						d="M2.14645 7.35355C2.34171 7.54882 2.65829 7.54882 2.85355 7.35355L6 4.20711L9.14645 7.35355C9.34171 7.54882 9.65829 7.54882 9.85355 7.35355C10.0488 7.15829 10.0488 6.84171 9.85355 6.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645L2.14645 6.64645C1.95118 6.84171 1.95118 7.15829 2.14645 7.35355Z"
					/>
				{/if}
			</svg>
		</button>
	</div>
	<div class="expander-content-anchor">
		<div class="expander-content">
			<slot name="content" />
		</div>
	</div>
</div>

<style lang="scss">
	@use "./Expander";
</style>