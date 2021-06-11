<script>
    import { afterUpdate, onMount } from "svelte";

    export let value = undefined;

    let circle;

    function updateValue() {
        const circumference = Math.PI * (circle.getAttribute("r") * 2);
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        circle.style.strokeDashoffset = ((100 - value) / 100) * circumference;
    }

    onMount(updateValue);
    afterUpdate(updateValue);
</script>

<template>
    <svg
        class={"progress-ring" + ($$props.class ?? "")}
        class:indeterminate={!value}
        width="32"
        height="32" 
        viewBox="0 0 16 16"
        aria-role="progressbar"
        aria-valuemin={value ? 0 : undefined}
        aria-valuemax={value ? 100 : undefined}
        aria-valuenow={value}
        {...$$restProps}
    >
        <circle bind:this={circle} cx="50%" cy="50%" r="7" stroke-dasharray="3"></circle>
    </svg>
</template>

<style lang="scss">
    @keyframes progress-ring-indeterminate {
        0% {
            stroke-dasharray: 0.01px 43.97px;
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(450deg);
            stroke-dasharray: 21.99px 21.99px;
        }
        100% {
            stroke-dasharray: 0.01px 43.97px;
            transform: rotate(1080deg);
        }
    }
    .progress-ring {
        min-width: 16px;
        min-height: 16px;
        circle {
            fill: none;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            stroke: var(--accent-color-default);
            stroke-width: 1.5;
            stroke-linecap: round;
            stroke-dasharray: 43.75;
            transform-origin: 50% 50%;
        }
        &.indeterminate circle {
            animation: progress-ring-indeterminate 2s linear infinite;
        }
    }
</style>