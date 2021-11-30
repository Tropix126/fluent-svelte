<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { page } from "$app/stores";
	import { ListViewItem } from "$site/lib";

	export let tree;

	let treeViewState = writable({});

	onMount(() => {
		// Check localStorage for an existing treeViewState
		// If none exists, use a blank object string
		$treeViewState = JSON.parse(localStorage.getItem("treeViewState") ?? "{}");
	});

	// Utility function for converting regular names to kebab case
	const id = (s: string) => s.toLowerCase().split(" ").join("-");

	// Function for expanding/collapsing docs categories
	const toggleExpansion = (event: MouseEvent, name: string) => {
		event.stopPropagation();
		// Modify treeViewState to have the opposite of the previous entry for the category
		$treeViewState[id(name)] = !$treeViewState[id(name)];
		// Update value in localStorage for persistence
		localStorage.setItem("treeViewState", JSON.stringify($treeViewState));
	};
</script>

<div class="docs-sidebar">
	{#each tree as { name, path, type, pages }}
		{#if type === "category"}
			<div class="category" class:expanded={$treeViewState?.[id(name)]}>
				<ListViewItem
					type="expander"
					expanded={$treeViewState?.[id(name)]}
					on:click={e => toggleExpansion(e, name)}
				>
					{name}
				</ListViewItem>
				{#if $treeViewState?.[id(name)]}
					<div class="category-items">
						<svelte:self tree={pages} />
					</div>
				{/if}
			</div>
		{:else}
			<ListViewItem
				on:click
				type="navigation"
				selected={`/docs${path}` === $page.path}
				href="/docs{path}"
			>
				{name}
			</ListViewItem>
		{/if}
	{/each}
</div>

<style lang="scss">
	@use "./DocsSidebar";
</style>
