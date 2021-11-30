<script lang="ts">
	import { Button, IconButton, TextBlock } from "$lib";
	import { CopyBox, HeroCard, Metadata, PageSection } from "$site/lib";
	import { homeExampleSrc } from "$site/data/home";
	import Box from "@fluentui/svg-icons/icons/box_16_regular.svg?raw";
	import Book from "@fluentui/svg-icons/icons/book_24_regular.svg?raw";
	import Open from "@fluentui/svg-icons/icons/open_16_regular.svg?raw";
	import Prism from "prismjs";
	import "prism-svelte";

	let exampleCount = 0;

	let example = Promise.resolve(Prism.highlight(homeExampleSrc, Prism.languages.svelte, "svelte"));
</script>

<svelte:head>
	<Metadata
		description="A faithful implementation of Microsoft's Fluent Design System in Svelte"
		title="Fluent Svelte"
	/>
</svelte:head>

<PageSection id="hero-section">
	<div class="hero-contents">
		<h1>Fluent Svelte</h1>
		<p>A faithful implementation of Microsoft's Fluent Design System in Svelte.</p>
		<div class="buttons-spacer">
			<Button variant="accent" href="/docs">Get Started</Button>
			<Button href="/docs">Source Code</Button>
		</div>
	</div>

	<div class="hero-cards">
		<HeroCard>
			<svelte:fragment slot="header">
				<TextBlock variant="bodyStrong">1. Install</TextBlock>
				<IconButton href="https://npmjs.com/package/fluent-svelte" target="_blank" rel="noreferrer noopener">
					{@html Box}
				</IconButton>
			</svelte:fragment>

			<TextBlock>npm</TextBlock>
			<CopyBox value="npm i -D fluent-svelte" />

			<TextBlock>using pnpm</TextBlock>
			<CopyBox value="pnpm i -D fluent-svelte" />

			<TextBlock>...or with yarn</TextBlock>
			<CopyBox value="yarn add --dev fluent-svelte" />

			<Button variant="accent">Learn More</Button>
		</HeroCard>
		<HeroCard>
			<svelte:fragment slot="header">
				<TextBlock variant="bodyStrong">2. Build</TextBlock>
				<IconButton href="/docs">
					{@html Book}
				</IconButton>
			</svelte:fragment>

			<div class="editor-body">
				<ul class="editor-tabs">
					<li>index.svelte</li>
				</ul>
				<div class="editor">
					{#await example}
						<aside class="line-numbers">
							{#each homeExampleSrc.split(/\r\n|\r|\n/) as line, i}
								<span>{i + 1}</span>
							{/each}
						</aside>
						<pre>
							<code>
								{homeExampleSrc}
							</code>
						</pre>
					{:then rendered}
						<aside class="line-numbers">
							{#each rendered.split(/\r\n|\r|\n/) as line, i}
								<span>{i + 1}</span>
							{/each}
						</aside>
						<pre>
							<code>
								{@html rendered}
							</code>
						</pre>
					{:catch _}
						<aside class="line-numbers">
							{#each homeExampleSrc.split(/\r\n|\r|\n/) as line, i}
								<span>{i + 1}</span>
							{/each}
						</aside>
						<pre>
							<code>
								{homeExampleSrc}
							</code>
						</pre>
					{/await}
				</div>
			</div>
		</HeroCard>
		<HeroCard>
			<svelte:fragment slot="header">
				<TextBlock variant="bodyStrong">3. View</TextBlock>
				<IconButton href="https://svelte.dev/repl/b90fb12e06e84aabb303121f713d1296" target="_blank"
				            rel="noreferrer noopener">
					{@html Open}
				</IconButton>
			</svelte:fragment>
			<div class="example-app">
				<TextBlock variant="display">{exampleCount}</TextBlock>
				<div>
					<Button variant="accent" on:click={() => exampleCount += 1}>Increase Count</Button>
					<Button on:click={() => exampleCount = 0}>Reset Count</Button>
				</div>
			</div>
		</HeroCard>
	</div>
</PageSection>

<style lang="scss">
	@use "src/site/styles/pages/home";
</style>