<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import Navbar from "$components/Navbar.svelte";

    onMount(() => {
        if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
        document.documentElement.classList.add(`theme-${localStorage.getItem("theme")}`);
    });
</script>

<template>
    {#if !$page.path.startsWith("/examples")}
        <Navbar />
    {/if}
    <main class="main-page-content">
        <slot/>
    </main>
</template>

<style lang="scss" global>
    @use "../lib/fluent-svelte/src/global";

    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: var(--background-base);
    }

    body {
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: var(--control-font-family);
    }

    .main-page-content {
        flex: 1 1 auto;
        overflow: auto;
    }
</style>