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

<style lang="scss" src="./ProgressRing.scss"></style>

<template>
    <svg
        class={"progress-ring" + ($$props.class ?? "")}
        class:indeterminate={!value}
        width="32"
        height="32" 
        viewBox="0 0 16 16"
        role="progressbar"
        aria-valuemin={value ? 0 : undefined}
        aria-valuemax={value ? 100 : undefined}
        aria-valuenow={value}
        {...$$restProps}
    >
        <circle bind:this={circle} cx="50%" cy="50%" r="7" stroke-dasharray="3"></circle>
    </svg>
</template>