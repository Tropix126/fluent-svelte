<script lang="ts">
    import { InfoBar, Button } from "$lib";
    import { CopyBox } from "$site/lib";
</script>

This page will guide you through the process of adding fluent-svelte to your existing Svelte project. If you don't have a Svelte or SvelteKit project already, you can create one using [this guide](https://svelte.dev/blog/the-easiest-way-to-get-started).

<InfoBar severity="attention" title="Before We Start" message="This tutorial assumes you have basic knowledge of Svelte.">
    <Button slot="action" variant="accent">
        Learn Svelte
    </Button>
</InfoBar>

### Step 1: Install the Library

This will install fluent-svelte and it's required dependencies. This can be done using a package manager of your choice.

<label>
    npm
    <CopyBox value="npm i --save-dev fluent-svelte" />
</label>

<label>
    pnpm
    <CopyBox value="pnpm i --save-dev fluent-svelte" />
</label>

<label>
    yarn
    <CopyBox value="yarn add --dev fluent-svelte" />
</label>

### Step 2: Add Theme File

Fluent Svelte components use a set of common resources to style their elements. These values are defined in a theme file that must be imported into your project before components can render properly.

`src/App.svelte` (or `src/routes/__layout.svelte` if using SvelteKit)

```svelte
<script>
	import "fluent-svelte/theme.css";
</script>
```

<InfoBar title="Bundler Support" severity="caution">
    In some cases, your bundler may not have the capability to resolve CSS files. Both the default Svelte template and the SvelteKit starter project (Vite) have this ability, however you might need to install a <a href="https://gist.github.com/Tropix126/6306afeffbcc551425d5658b856e8c4c" target="_blank" rel="noreferrer noopener">dedicated bundler plugin</a> to import CSS.
</InfoBar>

Alternatively, you can import the theme file from a CDN (though this generally isn't recommended).

```svelte
<style>
	@import url("https://unpkg.com/fluent-svelte/theme.css");
	/* ...or @import url("https://cdn.jsdelivr.net/npm/fluent-svelte/theme.css"); */
</style>
```

### Step 3: Importing a Component

Components are exported from a single index file in the library. They can be imported and used in your project like so:

```svelte example
<script>
	import { Button, Checkbox } from "fluent-svelte";
</script>

<Button>Click me!</Button>
<Checkbox>Check me!</Checkbox>
```

Alternatively you can import under a namespace:

```svelte
<script>
	import * as Fluent from "fluent-svelte";
</script>

<Fluent.Button>Click me!</Fluent.Button>
<Fluent.Checkbox>Check me!</Fluent.Checkbox>
```

### Svelte REPL Usage

`fluent-svelte` components can also be imported into the [Svelte REPL](https://svelte.dev/repl/).

In the REPL, packages are automatically installed by name when using an `import` statement, so the installation step can be skipped. Because the REPL doesn't support importing CSS in `node_modules`, we'll need to import the theme file through a CDN.

```svelte
<script>
	import { Button, Checkbox } from "fluent-svelte";
</script>

<button>Click me!</button>

<style>
	@import url("https://unpkg.com/fluent-svelte/theme.css");

	/* Some base styles to get things looking right. */
	:global(body) {
		background-color: var(--fds-solid-background-base);
		color: var(--fds-text-primary);
	}
</style>
```

<Button variant="hyperlink" href="https://svelte.dev/repl/2a30b6d202d24fb6b14783132b86b706" target="_blank" rel="noreferrer noopener">View this in the REPL</Button>

<style>
    h3 {
        margin-block-start: 72px !important;
    }

    label {
        font-weight: 600;
    }
</style>
