<script>
    export let style = "default";
    export let type = "button";
    export let id = undefined;
    export let disabled = false;

    const STYLES = ["default", "accent"];
</script>

<style lang="scss" src="./Button.scss"></style>

<template>
    <button
        class="button {$$props.class ?? '' + STYLES.includes(style) ? `style-${style}` : "style-default"}"
        on:click
        on:keypress
        on:keydown
        on:focus
        on:blur
        {type}
        {id}
        {disabled}
        {...$$restProps}
    >
        <slot />
    </button>
</template>