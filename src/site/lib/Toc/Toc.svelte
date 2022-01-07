<script lang="ts">
	import { onMount } from "svelte";

	import { ListItem } from "$lib";
	import { page } from "$app/stores";

	export let target: HTMLElement;

	let headings: HTMLHeadingElement[] = [];
	let activeHeading: HTMLHeadingElement;

	$: $page,
		(headings =
			target &&
			Array.from(target.querySelectorAll("h1, h2, h3")).filter(
				node => !node.closest(".component-showcase-grid")
			));

	function handleScroll() {
		if (headings)
			activeHeading = [...headings]
				.reverse()
				.find(heading => heading.offsetTop <= window.scrollY);
	}

	function handleSelect(index: number) {
		const { top } = headings[index].getBoundingClientRect();

		window.scrollTo({ top: top + window.scrollY - 55, behavior: "smooth" });
	}

	onMount(() => {
		window.addEventListener("scroll", handleScroll);
	});
</script>

{#if target}
	<nav class="table-of-contents">
		{#each headings as { tagName, innerText }, i}
			<li style="--fds-depth: {+tagName[1] - 1};">
				<ListItem on:click={() => handleSelect(i)} selected={activeHeading === headings[i]}>
					{innerText}
				</ListItem>
			</li>
		{/each}
	</nav>
{/if}

<style lang="scss">
	@use "./Toc";
</style>
