<script lang="ts">
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"

	import { ListItem, TextBox } from "$lib"
	import { externalMouseEvents } from "$lib/internal"

	import { docsPages } from "$site/data/docs"

	let value = ""
	let searchFocused = false
	let autoSuggestVisible = false
	let selection = 0

	// Determines if the auto-suggest flyout should be shown
	$: if (value && searchFocused) autoSuggestVisible = true

	// Handler for keyboard navigation in the search autocomplete flyout
	function handleSearchKeys(e: KeyboardEvent) {
		const { key } = e;
		if (key === "ArrowUp" || key === "ArrowDown") e.preventDefault();
		if (key === "Enter") {
			if (searchResults.length > 0 && $page.url.pathname !== `/docs${ searchResults[selection].path }`)
				goto(`/docs${ searchResults[selection].path }`, {
					keepfocus: true
				})
		} else if (key === "ArrowDown") {
			selection++;
			if (selection > searchResults.length - 1) selection = 0;
		} else if (key === "ArrowUp") {
			selection--;
			if (selection < 0) selection = searchResults.length - 1;
		}
	}

	$: searchResults = docsPages.filter(item => {
		const prepareQuery = (name: string) => name.replace(" ", "").trim().toLowerCase();
		return prepareQuery(item.name).includes(prepareQuery(value));
	});

	let searchBarInput;
	function handleSearchKeybind(e: KeyboardEvent) {
		if (e.key === "/" && !document.activeElement.className.includes("search-bar")) {
			e.preventDefault();
			searchBarInput.getElement().focus();
		}
	}
</script>

<svelte:window on:keydown={e => handleSearchKeybind(e)} />

<div class="docs-search">
	<div
		class="suggestions-wrapper"
		use:externalMouseEvents
		on:outerclick={() => (autoSuggestVisible = false)}
	>
		<TextBox
			bind:this={searchBarInput}
			bind:value
			class="search-bar"
			flyoutVisible={autoSuggestVisible}
			on:focus={() => (searchFocused = true)}
			on:keydown={handleSearchKeys}
			on:search={() => {
				if (
					searchResults.length > 0 &&
					$page.url.pathname !== `/docs${searchResults[selection].path}`
				)
					goto(`/docs${searchResults[selection].path}`, {
						keepfocus: true
					});
			}}
			placeholder="Search Documentation"
			type="search"
		/>
		{#if autoSuggestVisible}
			<div class="suggestions-flyout">
				{#if searchResults.length > 0}
					{#each searchResults as { name, path }, i}
						<ListItem selected={selection === i} href="/docs{path}">
							{name}
						</ListItem>
					{/each}
				{:else}
					<ListItem>No results found</ListItem>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "./DocsSearch";
</style>
