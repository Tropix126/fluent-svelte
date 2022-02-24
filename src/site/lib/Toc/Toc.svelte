<script lang="ts">
	import { onMount } from "svelte";

	import { ListItem } from "$lib";
	import { page } from "$app/stores";

	export let target: HTMLElement;

	let headings: HTMLHeadingElement[] = [];
	let activeHeading: HTMLHeadingElement;

	$: $page, (headings =
			target &&
			Array.from(target.querySelectorAll("h1, h2, h3")).filter(
				node => !node.closest(".component-showcase-grid, .markdown-body > table")
			));

	function handleScroll() {
		if (headings)
			activeHeading = [...headings]
				.reverse()
				.find(heading => heading.offsetTop <= window.scrollY);
	}

	function handleSelect(index: number, id: string) {
		const { top } = headings[index].getBoundingClientRect();

        if (id) history.pushState({}, '', `#${id}`);
		window.scrollTo({ top: top + window.scrollY - 55, behavior: "smooth" });
	}

	onMount(() => {
		window.addEventListener("scroll", handleScroll);
	});
</script>

{#if target}
    {#key $page}
        <nav class="table-of-contents">
            {#each headings as { tagName, innerText, id }, i}
                <li style="--fds-depth: {+tagName[1] - 1};">
                    <ListItem on:click={() => handleSelect(i, id)} selected={activeHeading === headings[i]}>
                        {innerText}
                    </ListItem>
                </li>
            {/each}
        </nav>
    {/key}
{/if}

<style lang="scss">
	@use "./Toc";
</style>
