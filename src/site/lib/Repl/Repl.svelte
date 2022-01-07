<script lang="ts">
	import type { Component } from "./types";

	import { onMount } from "svelte";
    import Tabs from "./Tabs.svelte";

    let textarea: HTMLTextAreaElement;
    let iframe: HTMLIFrameElement;
	let current: number = 0;
	let compiled;
	let worker: Worker;
    let components: Component[] = [
		{
			id: 0,
			name: "App",
			type: "svelte",
			source: `<script>
  import Component from './Component1.svelte';
<\/script>
<Component />`
		},
		{
			id: 1,
			name: "Component1",
			type: "svelte",
			source: "<h1>Hello</h1>"
		}
	];

    const srcdoc = `
<!doctype html>
<html>
	<head>
		<script type="module">
			let c;
			function update(source) {
				const blob = new Blob([source], { type: 'text/javascript' });
				const url = URL.createObjectURL(blob);
				import(url).then(({ default: App }) => {
					if (c) c.$destroy();
					document.body.innerHTML = '';
					c = new App({ target: document.body })
				});
			}
			window.addEventListener('message', event => {
				update(event.data);
			}, false);
		<\/script>
        <style>
            @import url("https://unpkg.com/fluent-svelte/theme.css");
        </style>
	</head>
	<body></body>
</html>
	`.replace(/(\r\n|\n|\r|\t)/gm, "");

    $: current_component = components.findIndex(({ id }) => id === current);
	$: tabs = components.map(({ id, name, type }) => ({ id, name, type }));
	$: iframe && compiled && updateContentWindow(compiled);
	$: compile(components);

	onMount(() => {
		worker = new Worker("/worker.js");

		worker.addEventListener("message", event => {
			compiled = event.data;
		});

        compile(components);
	});

	function compile(_components: Component[]) {
		if (worker) worker.postMessage(_components);
	}
	
    function updateContentWindow(code: string) {
		iframe.contentWindow.postMessage(code, "*");
	}

    function createComponent() {
		const id = Math.max(...components.map(({ id }) => id)) + 1;
		components = components.concat({
			id,
			name: `Component${id}`,
			type: "svelte",
			source: "",
		});
		current = id;
		textarea.focus();
	}
</script>

<div class="repl">
    <Tabs
        {tabs}
        {current}
        on:select={({ detail }) => (current = detail)}
        on:new={createComponent}
    />
    <div class="repl-splitter">
        <textarea
            class="repl-input"
            bind:value={components[current_component].source}
            bind:this={textarea}
        />
        <iframe class="repl-output" title="Rendered REPL" bind:this={iframe} srcdoc={srcdoc} />
    </div>
</div>

<style lang="scss">
    @use "src/lib/mixins" as *;

    .repl {
        @include flex($direction: column);
        border-radius: var(--overlay-corner-radius);
        background-color: var(--card-background-default);
        background-clip: padding-box;
        border: 1px solid var(--card-stroke-default);
        overflow: hidden;
        width: 680px;
        height: 420px;
        &-splitter {
            flex: 1 1 auto;
            display: flex;
            background-clip: padding-box;
            background-color: var(--layer-background-default);
        }
        &-input {
            resize: none;
            border: none;
            background-color: transparent;
            width: 240px;
            flex: 0 0 auto;
        }
        &-output {
            border-inline-start: 1px solid var(--card-stroke-default);
            color-scheme: light;
            flex: 1 1 auto;
            border: none;
        }
    }
</style>