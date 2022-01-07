<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { docsPages } from "$site/data/docs";

	export const prerender = true;

	export const load: Load = async ({ url }) => {
		const path = url.pathname
			.replace(/\/$/gi, "") // remove trailing slash
			.replace("/docs", ""); // remove /docs

		const currentPage = docsPages.find(p => p.path === path);

		return {
			props: {
				currentPage
			}
		};
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";

	import { Metadata, TreeView, Toc } from "$site/lib";
	import { docsMap } from "$site/data/docs";

	import { Button, TextBlock, AutoSuggestBox, ListItem } from "$lib";

	export let currentPage: DocsMap;

	let article;
	let searchValue = "";
	let searchSelection = 0;
	let searchFlyoutOpen = false;
	let searchItems = docsPages.map(page => page.name);

	function handleKeyDown({ key }: KeyboardEvent) {
		if (key === "Enter") {
			searchValue = "";
			// goto(`/docs${docsPages.find(p => p.name === searchItems[searchSelection]).path}`);
		}
	}

	function handleSelection(index) {
		searchValue = searchItems[index];
		searchSelection = index;
		searchFlyoutOpen = false;
	}
</script>

<Metadata title="Fluent Svelte - Docs - {currentPage?.name}" description="" />

<main class="docs-container">
	<div class="docs-container-inner">
		<aside class="docs-sidebar">
			<div class="docs-search">
				<AutoSuggestBox
					placeholder="Search Docs"
					on:keydown={handleKeyDown}
					bind:open={searchFlyoutOpen}
					bind:value={searchValue}
					bind:selection={searchSelection}
					bind:items={searchItems}
				>
					<svelte:fragment slot="item-template" let:selection let:index let:id let:item>
						<ListItem
							on:click={() => handleSelection(index)}
							selected={selection === index}
							href={`/docs${docsPages.find(p => p.name === item).path}`}
							{id}
						>
							{item}
							<svelte:fragment slot="icon">
								{#if docsPages.find(p => p.name === item)}
									{@html docsPages.find(p => p.name === item).icon}
								{/if}
							</svelte:fragment>
						</ListItem>
					</svelte:fragment>
				</AutoSuggestBox>
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
		</article>

		<aside class="docs-sidebar">
			<TextBlock variant="bodyStrong">On This Page</TextBlock>
			<Toc target={article} />
		</aside>
	</div>
</main>

<style global lang="scss">
	@use "src/site/styles/pages/docs";
</style>