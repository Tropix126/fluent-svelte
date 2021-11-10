<script lang="ts">
	import { Button } from "$lib";

	import "$lib/theme.css";
</script>

<main>
	<h1>Fluent Svelte</h1>
	<p>A faithful implementation of Microsoft's Fluent Design System in Svelte.</p>
	<div class="button-group">
		<Button variant="accent">Read the Docs</Button>
		<Button variant="hyperlink">Source Code</Button>
	</div>
</main>

<style lang="scss" global>
	@use "../lib/mixins" as *;

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	body {
		@include flex($align: center, $justify: center);
		text-align: center;
		min-height: 100vh;
		margin: 0;
		background: url("https://www.files.community/screenshots/win11-dark.jpg") center/300%
			no-repeat;
		background-color: var(--mica-background);
		box-shadow: inset 0 0 0 100vmax rgb(32, 32, 32, 0.8),
			inset 0 0 0 100vmax var(--layer-background-default);
		backdrop-filter: blur(60px);
	}

	h1 {
		color: var(--text-primary);
		margin: 0;
		font: {
			size: 48px;
			weight: 600;
			family: var(--font-family-display);
		}
	}

	p {
		margin: {
			inset-inline-start: 12px;
			inset-block-end: 24px;
		}
		color: var(--text-secondary);
		font: {
			weight: 400;
			family: var(--font-family-text);
		}
	}

	.button-group {
		@include flex($justify: center);
		gap: 8px;
	}
</style>
