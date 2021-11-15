<script lang="ts">
	import { Navbar } from "$sitelib";
	import "$lib/theme.css";
</script>

<Navbar />
<main>
	<slot />
</main>

<style lang="scss">
	@use "src/styles/global";

	h1 {
		font-weight: 500;
		user-select: none;
	}
</style>