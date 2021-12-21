<script lang="ts">
	import { TextBox } from "$lib";
	import { docsPages } from "$site/data/docs";
	import { ListViewItem } from "$site/lib";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	let value = "";
	let searchFocused = false;
	let autoSuggestVisible = false;
	let selection = 0;

	// Determines if the auto-suggest flyout should be shown
	$: if (value && searchFocused) autoSuggestVisible = true;

	// Handler for keyboard navigation in the search autocomplete flyout
	const handleSearchKeys = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === "ArrowUp" || key === "ArrowDown") e.preventDefault();
		if (key === "Enter") {
			if (
				searchResults.length > 0 &&
				$page.path !== `/docs${ searchResults[selection].path }`
			)
				goto(`/docs${ searchResults[selection].path }`, {
					keepfocus: true
				});
		} else if (key === "ArrowDown") {
			selection++;
			if (selection > searchResults.length - 1) selection = 0;
		} else if (key === "ArrowUp") {
			selection--;
			if (selection < 0) selection = searchResults.length - 1;
		}
	};
	// Action for handling clicks outside a DOM node
	const clickOutside = (node: Element, eventHandler: () => boolean) => {
		const handleClick = (event: MouseEvent) => {
			const path = event.composedPath();
			if (!path.includes(node)) eventHandler();
		};
		document.addEventListener("click", handleClick);

		return {
			destroy() {
				document.removeEventListener("click", handleClick);
			}
		};
	};

	$: searchResults = docsPages.filter(item => {
		const prepareQuery = (name: string) => name.replace(" ", "").trim().toLowerCase();

		return prepareQuery(item.name).includes(prepareQuery(value));
	});

	let searchBarInput: () => HTMLInputElement;
	const handleSearchKeybind = (e: KeyboardEvent) => {
		if (e.key === "/" && !document.activeElement.className.includes("search-bar")) {
			e.preventDefault();
			searchBarInput().focus();
		}
	};
</script>

<svelte:window on:keydown={e => handleSearchKeybind(e)} />

<div class="docs-searchbar">
	<div
		class="suggestions-wrapper"
		use:clickOutside={() => (autoSuggestVisible = false)}
	>
		<TextBox
			bind:getElement={searchBarInput}
			bind:value
			class="search-bar"
			flyoutVisible={autoSuggestVisible}
			on:focus={() => (searchFocused = true)}
			on:keydown={handleSearchKeys}
			on:search={() => {
				if (searchResults.length > 0 &&	$page.path !== `/docs${searchResults[selection].path}`)
					goto(`/docs${searchResults[selection].path}`, {
						keepfocus: true
					});
				}
			}
			placeholder="Search Documentation"
			type="search"
		/>
		{#if autoSuggestVisible}
			<div class="suggestions-flyout scroller">
				{#if searchResults.length > 0}
					{#each searchResults as { name, path }, i}
						<ListViewItem selected={selection === i} href="/docs{path}">
							{name}
						</ListViewItem>
					{/each}
				{:else}
					<ListViewItem>No results found</ListViewItem>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@use "DocsSearchSidebar";
</style>