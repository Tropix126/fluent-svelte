<script lang="ts">
	import Button from "$lib/Button/Button.svelte";
	import { page } from "$app/stores";
	import Home from "@fluentui/svg-icons/icons/home_24_regular.svg?raw";
	import Book from "@fluentui/svg-icons/icons/book_24_regular.svg?raw";

	interface NavbarItem {
		name: string,
		href: string,
		icon: any,
	}

	const isNavbarItemSelected = (path: string) =>
		$page.path === path || // current path includes path without modifications
		($page.path.split("/").length > 1 && path.split("/").length > 1 && $page.path.startsWith(path) && !(path === "" || path === "/")) ||
		(path === "/" && $page.path === "")
			? "selected" : "";

	const items: NavbarItem[] = [
		{
			name: "Home",
			href: "/",
			icon: Home
		},
		{
			name: "Docs",
			href: "/docs",
			icon: Book
		}
	];
</script>

<nav class="navbar">
	<header>
		<a class="header" href="/">Fluent Svelte</a>
	</header>
	<div class="separator"></div>
	<ul class="navbar-items">
		{#each items as item}
			<li class="navbar-item">
				<Button class="navbar-link {isNavbarItemSelected(item.href)}"
				        href={item.href} variant="hyperlink">
					{@html item.icon}
					{item.name}
				</Button>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	@use "Navbar";

	a.header {
		font-weight: 500;
		user-select: none;
	}
</style>