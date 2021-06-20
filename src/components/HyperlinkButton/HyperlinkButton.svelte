<script>
    export let href = undefined;
    export let disabled = false;
</script>

<template>
    <a
        class={"hyperlink-button" + ($$props.class ?? "")}
        class:disabled
        on:click
        on:keypress
        on:keydown
        on:focus
        on:blur
        href={(href && !disabled) ? href : undefined}
        {...$$restProps}
    >
        <slot />
    </a>
</template>

<style lang="scss" src="./HyperlinkButton.scss"></style>