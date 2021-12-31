<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { DocsExamples, loadExampleModules } from "$site/data/examples";
	import { docsPages } from "$site/data/docs";
	import { page } from "$app/stores";

	export const prerender = true;

	export const load: Load = async ({ url }) => {
		const path = url.pathname
			.replace(/\/$/gi, "") // remove trailing slash
			.replace("/docs", ""); // remove /docs

		const currentPage = docsPages.find(p => p.path === path);

		if (currentPage?.examples) {
			const examples: DocsExamples[] = await loadExampleModules(currentPage.path);

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
	import type { DocsExamples, DocsMap } from "$site/data/examples";

	import { page } from "$app/stores";

	import { Metadata, TreeView, Toc, DocsSearch } from "$site/lib";
	import { docsMap } from "$site/data/docs";

	import { Button, TextBlock, TextBox } from "$lib";

	import ArrowRight from "@fluentui/svg-icons/icons/arrow_right_32_regular.svg?raw";

	export let currentPage: DocsMap;
	export let examples: DocsExamples[] = [];

	let article;
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
					rel="noreferrer noopener"
					target="_blank"
					variant="hyperlink">Edit This Page</Button
				>
			</header>
			<slot />
			{#if currentPage?.examples}
				<h2>Examples</h2>
				{#each examples as example (example.name)}
					<h4>{example.name}</h4>
					<div class="code-example">
						<div class="example-preview">
							<svelte:component this={example.mod} />
						</div>
						<pre>
							<code>
							{@html example.src}
							</code>
						</pre>
					</div>
				{/each}
			{/if}
		</article>

		<aside>
			<TextBlock variant="bodyStrong">On This Page</TextBlock>
			<Toc target={article} />
		</aside>
	</div>
</main>

<style global lang="scss">
	@use "src/site/styles/pages/docs";
</style>
