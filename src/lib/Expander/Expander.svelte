<script lang="ts">
	// TODO: progressively enhance this

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder, uid } from "$lib/internal";

	/** Determines whether the expander is expanded (open) or not. */
	export let expanded = false;

	/** Determines the direction that the expander will extend to. */
	export let direction: "down" | "up" = "down";

	// svelte-ignore unused-export-let
	/** Determines the expander header's semantic HTML heading tag (h1-h6). */
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;

	/** Specifies a custom class name for the expander. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the expander's container element. */
	export let containerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the expander's header button element. */
	export let headerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the expander's content container. */
	export let contentElement: HTMLDivElement = null;

	const dispatch = createEventDispatcher();
	const forwardEvents = createEventForwarder(get_current_component(), ["expand", "collapse"]);
	const headerId = uid("fds-expander-header-");
	const contentId = uid("fds-expander-content-");

	$: if (expanded) {
		dispatch("expand");
	} else {
		dispatch("collapse");
	}

	function handleKeydown({ key }) {
		if (key === "Enter" || key === " ") {
			event.preventDefault();
			expanded = !expanded;
		}
	}
</script>

<!--
@component
Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header. [Docs](https://fluent-svelte.vercel.app/docs/components/expander)
- Usage:
    ```tsx
    <Expander>
        Header
        <svelte:fragment slot="content">
            Content
        </svelte:fragment>
    </Expander>
    ```
-->
<div
	use:forwardEvents
	class="expander direction-{direction} {className}"
	role="region"
	class:expanded
	bind:this={containerElement}
	{...$$restProps}
>
	<svelte:element this="h">
		<div
			role="button"
			id={headerId}
			aria-controls={contentId}
			class="expander-header"
			aria-expanded={expanded}
			tabindex="0"
			bind:this={headerElement}
			on:keydown={handleKeydown}
			on:click={() => (expanded = !expanded)}
		>
			{#if $$slots.icon}
				<div class="expander-icon">
					<slot name="icon" />
				</div>
			{/if}
			<span class="expander-header-title">
				<slot />
			</span>
			<button
				class="expander-chevron"
                type="button"
				tabindex="-1"
				id={contentId}
				aria-labelledby={headerId}
			>
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
	</svelte:element>
	<div class="expander-content-anchor">
		<div class="expander-content" bind:this={contentElement}>
			<slot name="content" />
		</div>
	</div>
</div>

<style lang="scss">
	@use "./Expander";
</style>
