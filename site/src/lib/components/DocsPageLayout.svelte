<script>
    import { HyperlinkButton } from "$fluent/HyperlinkButton";

    export let related;
    export let source;
</script>

<style lang="scss" src="" global></style>

<template>
    <article>
        <slot />
    </article>
    <aside class="sidebar-right">
        <h5>Page</h5>
        <HyperlinkButton href="#">Jump to Top</HyperlinkButton>
        {#if source}
            <HyperlinkButton href={source}>Source Code (GitHub)</HyperlinkButton>
        {/if}
        {#if related}
            <h5>Related Controls</h5>
            {#each related as control}
                <HyperlinkButton href="#">{control}</HyperlinkButton>
            {/each}
        {/if}
        <h5>Feedback</h5>
        <HyperlinkButton href="#">Report a Bug</HyperlinkButton>
        <HyperlinkButton href="#">Suggest a Feature</HyperlinkButton>
    </aside>
</template>