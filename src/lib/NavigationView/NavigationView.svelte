<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let variant: "default" | "compact" | "minimal" = "default";
	export let expanded = true;
	export let menuButton = true;
	export let backButton = true;

	const dispatch = createEventDispatcher();
</script>

<main class="navigation-view variant-{variant}">
	<aside class="navigation-view-pane" class:expanded>
		<header class="navigation-view-pane-header">
			{#if backButton}
				<button type="button" on:click={() => dispatch("back")}>
					{"<-"}
				</button>
			{/if}
			{#if menuButton}
				<button type="button" on:click={() => (expanded = !expanded)}>
					{"-"}
				</button>
			{/if}

			<slot name="header" />
		</header>
		<slot name="items" />
		<footer class="navigation-view-pane-footer">
			<slot name="footer" />
		</footer>
	</aside>
	<article class="navigation-view-page">
		<slot />
	</article>
</main>

<style lang="scss">
	@use "./NavigationView";

	@use "../mixins" as *;

	.navigation-view {
		@include typography-body;
		display: flex;
		inline-size: 100%;
		block-size: 100%;
		&.variant- {
			&-default {
				.navigation-view-pane {
					inline-size: 48px;
					&.expanded {
						inline-size: 320px;
					}
				}
			}
		}
		&-pane {
			@include flex($direction: column);
			user-select: none;
			flex: 0 0 auto;
			block-size: 100%;
			&-header {
				display: block;
				flex: 0 0 auto;
				padding-block-start: 4px;
			}
		}
		&-page {
			@include flex($direction: column);
			flex: 1 1 auto;
			border-start-start-radius: var(--overlay-corner-radius);
			background-clip: padding-box;
			background-color: var(--layer-background-default);
			border: 1px solid var(--card-stroke-default);
			border-block-end: none;
			border-inline-end: none;
			padding-inline: 56px;
			padding-block: 44px;
		}
	}
</style>
