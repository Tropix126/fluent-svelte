<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { docsPages } from "$site/data/docs";
	import { page } from "$app/stores";
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
	import { Button } from "$lib";
	import { Metadata, TreeView, CodeExample } from "$site/lib";
	import { docsMap, DocsMap } from "$site/data/docs";
	import type { DocsExample } from "$site/data/examples";
	import { page } from "$app/stores";

	export let currentPage: DocsMap;
	export let examples: DocsExample[] = [];
</script>

<svelte:head>
	<Metadata title="Fluent Svelte - {currentPage?.name} - Docs" />
</svelte:head>

<div class="docs-page">
	<aside class="sidebar">
		<TreeView tree={docsMap} />
	</aside>
	<article class="markdown-body">
		<header>
			<span>
				{currentPage.path.split("/").join(" / ").substring(2)}
				{currentPage.path === "" ? " / overview" : ""}
			</span>
			<div class="header-right">
				<Button
					href="https://github.com/tropix126/fluent-svelte/edit/main/src/routes/docs{currentPage?.path || '/index'}.md"
					rel="noreferrer noopener"
					target="_blank"
					variant="hyperlink"
				>
				</Button>
			</div>
		</header>
		<h1>{currentPage?.name}</h1>
		<slot />
		{#if currentPage?.examples}
			<h2>Examples</h2>
			<div class="examples">
				{#each examples as example (example.name)}
					<CodeExample {example}/>
				{/each}
			</div>
		{/if}
	</article>
</div>

<style global lang="scss">
	@use "src/site/styles/pages/docs";
</style>