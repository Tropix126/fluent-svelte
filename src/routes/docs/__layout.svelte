<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { docsPages } from "$site/data/docs";
	import { DocsExample, loadExampleModules } from "$site/data/examples";

	export const prerender = true;

	export const load: Load = async ({ page }) => {
		const path = page.path
			.replace(/\/$/gi, "") // remove trailing slash
			.replace("/docs", ""); // remove /docs

		const currentPage = docsPages.find(p => p.path === path);

		if (currentPage?.examples) {
			const examples: DocsExample[] = await loadExampleModules(path);

			return {
				props: {
					currentPage,
					examples
				}
			};
		}

		return {
			props: {
				currentPage
			}
		};
	};
</script>

<script lang="ts">
	import { IconButton, Button } from "$lib";
	import { Metadata, DocsSidebar, CodeExample, DocsSearchBar } from "$site/lib";
	import { docsMap, DocsMap } from "$site/data/docs";
	import type { DocsExample } from "$site/data/examples";
	import Navigation from "@fluentui/svg-icons/icons/navigation_24_regular.svg?raw";
	import ArrowLeft from "@fluentui/svg-icons/icons/arrow_left_24_regular.svg?raw";
	import { page } from "$app/stores";

	export let currentPage: DocsMap;

	export let examples: DocsExample[] = [];

	let innerWidth: number;
	$: shrinkSidebar = innerWidth <= 750;

	let sidebarToggled: boolean = false;
	$: $page.path, (sidebarToggled = false);
</script>

<svelte:head>
	<Metadata
		description="Fluent Svelte - {currentPage?.name ? currentPage.name : ''} Docs"
		title="Fluent Svelte - {currentPage?.name ? currentPage.name : ''} Docs"
	/>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="docs-page">
	{#if !shrinkSidebar || sidebarToggled}
		<aside class="sidebar">
			<div class="sidebar-top">
				<DocsSearchBar />
				{#if shrinkSidebar}
					<IconButton on:click={() => (sidebarToggled = !sidebarToggled)} class="shrink-sidebar-button">
						{@html ArrowLeft}
					</IconButton>
				{/if}
			</div>
			<DocsSidebar tree={docsMap} />
		</aside>
	{/if}
	{#if !sidebarToggled || !shrinkSidebar}
		<article class="markdown-body">
			<header>
				{#if shrinkSidebar}
					<IconButton on:click={() => (sidebarToggled = !sidebarToggled)}>
						{@html Navigation}
					</IconButton>
				{/if}
				<span>
					/
					{currentPage.path.split("/").join(" / ").substring(2)}
					{currentPage.path === "" ? "overview" : ""}
				</span>
				<div class="header-right">
					<Button
						href="https://github.com/tropix126/fluent-svelte/edit/main/src/routes/docs{currentPage?.path || '/index'}.md"
						rel="noreferrer noopener"
						target="_blank"
						variant="hyperlink"
					>
						Edit on GitHub
					</Button>
				</div>
			</header>
			<h1>{currentPage?.name}</h1>
			<slot />
			{#if currentPage?.examples}
				<h2>Examples</h2>
				<div class="examples">
					{#each examples as example (example.name)}
						<CodeExample {example} />
					{/each}
				</div>
			{/if}
		</article>
	{/if}
</div>

<style global lang="scss">
	@use "src/site/styles/pages/docs";
</style>