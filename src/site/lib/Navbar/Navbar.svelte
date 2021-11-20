<script lang="ts">
	import { page } from "$app/stores";
	import { TextBlock } from "$lib";

	interface Item {
		href: string;
		name: string;
		icon?: string;
	}

	export let items: Item[];

	let scrollY: number;
	let visible = true;
	let hashChanged = false;
	let lastScroll = 0;

	function handleScroll() {
		if (!hashChanged) visible = scrollY < 56 || scrollY < lastScroll;
		lastScroll = scrollY;
		hashChanged = false;
	}
</script>

<svelte:window on:hashchange={() => (hashChanged = true)} on:scroll={handleScroll} bind:scrollY />

<header class="navbar" class:visible>
	<div class="navbar-inner">
		<a class="logo" href="/">
			<img src="/logo.svg" width="32" height="32" alt="Fluent Svelte logo" />
		</a>
		<nav>
			{#each items as { href, name, icon }}
				<a
					{href}
					sveltekit:prefetch
					class:selected={$page.path === href ||
						($page.path.split("/").length > 1 &&
							href.split("/").length > 1 &&
							$page.path.startsWith(href) &&
							!(href === "" || href === "/")) ||
						(href === "/" && $page.path === "")}
				>
					{#if icon}
						{@html icon}
					{/if}
					<TextBlock>{name}</TextBlock>
				</a>
			{/each}
		</nav>
		<div class="buttons">
			<slot name="buttons" />
		</div>
	</div>
</header>

<style lang="scss">
	@use "./Navbar";
</style>
