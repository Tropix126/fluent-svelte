<script>
    import { onMount } from "svelte";

    import { page } from "$app/stores";
    import { Button } from "$fluent/Button";

    function toggleTheme() {
        const theme = localStorage.getItem("theme") || "dark";
        if (theme === "light") {
            document.documentElement.classList.add("theme-dark");
            document.documentElement.classList.remove("theme-light");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.add("theme-light");
            document.documentElement.classList.remove("theme-dark");
            localStorage.setItem("theme", "light");
        }
    }
</script>

<template>
    <header class="navbar">
        <nav>
            <a class:selected={$page.path === "/"} href="/">Home</a>
            <a class:selected={$page.path.startsWith("/docs")} href="/docs">Controls</a>
            <a href="https://github.com/tropix126/fluent-svelte">GitHub</a>
        </nav>
        <div class="navbar-right">
            <Button on:click={toggleTheme}>Toggle Theme</Button>
        </div>
    </header>
</template>

<style lang="scss">
    @keyframes navbar-selection-indicator {
        0% {
            transform: scaleX(0);
        }
        100% {
            transform: none;
        }
    }

    .navbar {
        flex: 0 0 auto;
        display: flex;  
        justify-content: space-between;
        align-items: center;
        background-color: var(--background-quarternary);
        padding: 0 16px;
        height: 48px;
        user-select: none;
        a {
            display: flex;
            align-items: center;
            height: 100%;
            position: relative;
            justify-content: center;
            cursor: default;
            margin-right: 24px;
            text-decoration: none;
            color: var(--text-color-secondary);
            font: {
                size: var(--control-font-size);
                weight: normal;
            }

            &:active,
            &:hover,
            &.selected {
                color: var(--text-color-primary);
            }

            &.selected {
                &::after {
                    content: "";
                    transform-origin: left;
                    animation: navbar-selection-indicator 250ms cubic-bezier(0, 0, 0, 1);
                    width: 50%;
                    height: 3px;
                    border-radius: 6px;
                    background-color: var(--accent-color-secondary);
                    position: absolute;
                    bottom: 4px;
                }
            }
        }
        nav,
        .navbar-right {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }

    .navbar-right {
        button {
            flex: 0 0 auto;
            margin-left: 8px;
        }
    }
</style>