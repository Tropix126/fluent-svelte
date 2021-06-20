<script>
    import { onMount } from "svelte";

    export let indeterminate = false;
    export let checked = false;
    export let disabled = false;

    let input;

    onMount(() => {
        if (indeterminate) input.indeterminate = true;
    });
</script>

<style lang="scss" src="./CheckBox.scss"></style>

<template>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- https://github.com/sveltejs/svelte/issues/5528 -->
    <label class="checkbox-container" class:disabled class:indeterminate>
        <div class="checkbox-inner">
            <input
                class={"checkbox" + ($$props.class ?? "")}
                type="checkbox"
                bind:checked
                bind:this={input}
                {disabled}
                {...$$restProps}
            />
            <svg class="checkbox-glyph" viewBox={indeterminate ? "0 0 20 20" : "0 0 24 24"}>
                {#if indeterminate && checked}
                    <path class="path-indeterminate" d="M2 9.5C2 9.22386 2.22386 9 2.5 9H17.5C17.7761 9 18 9.22386 18 9.5C18 9.77614 17.7761 10 17.5 10H2.5C2.22386 10 2 9.77614 2 9.5Z"/>
                    {:else}
                    <path class="path-checkmark" d="M0.73, 11.91 8.1,19.28 22.79,4.59" fill="none"/>
                {/if}
            </svg>
        </div>
        {#if $$slots.default}
            <span>
                <slot/>
            </span>
        {/if}
    </label>
</template>