<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"
	import { docsPages, PreparedExample } from "$site/data/docs"

	export const prerender = true

	export const load: Load = async ({ url }) => {
		const path = url.pathname
				.replace(/\/$/gi, "") // remove trailing slash
				.replace("/docs", "") // remove /docs

		const page = docsPages.find(p => p.path === path)

		const examples: PreparedExample[] = page.examples.map((example, index) => {
			return ({
				title: example.name,
				description: example.description,
				source: example.source,
				repl: example?.repl,
				pagePath: page.path.substring(1),
				componentName: `_${ example.name.replace(/\s+/g, "") }${ index }`,
			})
		})

		return {
			props: {
				currentPage: page,
				examples: examples,
			}
		}
	}
</script>

<script lang="ts">
	import { docsMap, DocsMap } from "$site/data/docs"
	import { Metadata, TreeView, TableOfContents, DocsSearch, APIDocs, CodeExample, external } from "$site/lib"
	import { Button, TextBlock } from "$lib"
	import { page } from "$app/stores"

	export let currentPage: DocsMap
	export let examples: PreparedExample[] = []

	let article
</script>

<svelte:head>
	<Metadata title="Fluent Svelte - Docs - {currentPage?.name}" />
</svelte:head>

<main class="docs-container">
	<div class="docs-container-inner">
		<aside>
			<div class="docs-search">
				<DocsSearch type="search" placeholder="Search Docs" />
			</div>
			<TreeView tree={docsMap} />
		</aside>

		<article class="markdown-body" bind:this={article}>
			<header>
				<h1>{currentPage?.name}</h1>
				<Button
						href="https://github.com/tropix126/fluent-svelte/edit/main/src/routes/docs{currentPage?.path ||
						'/index'}.md"
						{...external}
						variant="hyperlink">
					Edit This Page
				</Button>
			</header>
			<slot/>

			{#if currentPage?.examples}
				<h2>Examples</h2>
				{#each examples as example (example.componentName)}
					<CodeExample {example}/>
				{/each}
			{/if}

			{#if currentPage.path.startsWith("/components/")}
				<h3>Component API</h3>
				<!--				<APIDocs component={currentPage.name} />-->
			{/if}
		</article>

		<aside>
			<TextBlock variant="bodyStrong">On This Page</TextBlock>
			<TableOfContents target={article}/>
		</aside>
	</div>
</main>

<style global lang="scss">
	@use "src/site/styles/pages/docs";
</style>
