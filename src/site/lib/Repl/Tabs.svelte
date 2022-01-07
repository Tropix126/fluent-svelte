<script lang="ts">
	import type { Tab } from "./types";

	import { createEventDispatcher } from "svelte";

    import { TextBlock } from "$lib";

	import Add from "@fluentui/svg-icons/icons/add_12_regular.svg?raw";

	const dispatch = createEventDispatcher<{ select: number; new: undefined }>();

	export let tabs: Tab[] = [];
	export let current: number = 0;
</script>

<ul class="repl-tabs">
	{#each tabs as { name, type, id }}
		<li class="repl-tab" class:selected={id === current} on:click={() => dispatch("select", id)}>
			<TextBlock>{name}.{type}</TextBlock>
            {#if id !== 0}
                <button class="close-button">

                </button>
            {/if}
		</li>
	{/each}
	<button class="new-tab-button" on:click={() => dispatch("new")}>
        {@html Add}
    </button>
</ul>

<style lang="scss">
    @use "src/lib/mixins" as *;

    .repl-tab {
        @include flex($align: center);
        cursor: default;
        position: relative;
        box-sizing: border-box;
        list-style-type: none;
        block-size: 32px;
        padding-inline-start: 8px;
        padding-block: 6px;
        inline-size: auto;
        min-inline-size: 168px;
        color: var(--text-secondary);
        border: 1px solid transparent;
        border-top-left-radius: var(--overlay-corner-radius);
        border-top-right-radius: var(--overlay-corner-radius);
        background-clip: padding-box;
        &:hover {
            background-color: var(--subtle-fill-secondary);
        }
        &:active {
            background-color: var(--subtle-fill-tertiary);
            color: var(--text-tertiary);
        }
        > :global(.text-block) {
            margin-inline-end: 8px;
        }
        &.selected {
            color: var(--text-primary);
            background-color: var(--layer-background-default);
            border-color: var(--card-stroke-default);
            border-block-end: none;
            > :global(.text-block) {
                font-weight: 600;
            }
            &::before,
            &::after {
                content: "";
                border-bottom: 1px solid var(--card-stroke-default);
                pointer-events: none;
                position: absolute;
                width: 100vmax;
                height: 41px;
                top: -10px;
            }
            &::before {
                right: calc(100% + 1px);
            }
            &::after {
                left: calc(100% + 1px);
            }
        }
        &s {
            @include flex($align: center);
            margin: 0;
            padding: 9px;
            padding-block-end: 0;
        }
    }

    button {
        flex: 0 0 auto;
        outline: none;
        border: none;
        padding: 0;
        background-color: transparent;
        border-radius: var(--control-corner-radius);
        inline-size: 30px;
        block-size: 22px;
        margin-inline: 4px;
        &:hover {
            background-color: var(--subtle-fill-secondary);
        }
        &:active {
            background-color: var(--subtle-fill-tertiary);
        }
        &:focus-visible {
            box-shadow: var(--focus-stroke);
        }
    }
</style>
