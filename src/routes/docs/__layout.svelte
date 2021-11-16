<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { DocsExamples, loadExampleModules } from "$sitelib/data/examples";
	import { docsPages } from "$sitelib/data/docs";
	import { page } from "$app/stores";

	export const prerender = true;

	export const load: Load = async ({ page }) => {
		const path = page.path
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
	import { Button } from "$lib";
	import { DocsMap } from "$sitelib/data/docs";
	import { Metadata } from "$sitelib";
	import type { DocsExamples } from "$sitelib/data/examples";
	import { page } from "$app/stores";
	import ArrowRight from "@fluentui/svg-icons/icons/arrow_right_32_regular.svg?raw";

	export let currentPage: DocsMap;
	export let examples: DocsExamples[] = [];
</script>

<svelte:head>
	<Metadata title="Fluent Svelte - {currentPage?.name} - Docs" />
</svelte:head>

<div class="docs-page markdown-body">
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
		{#each examples as example (example.path)}
			<h3>{example.name}</h3>
			<div class="code-example">
				<div class="example code">
					<pre><code>
						{@html example.src}
					</code></pre>
				</div>
				{@html ArrowRight}
				<div class="example preview">
					<svelte:component this={example.mod} />
				</div>
			</div>
		{/each}
	{/if}
</div>

<style global lang="scss">
	@use "src/styles/pages/docs";
</style>