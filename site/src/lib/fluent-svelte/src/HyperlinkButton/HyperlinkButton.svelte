<script>
    export let href = undefined;
    export let disabled = false;
    let className = undefined;
    export {className as class};
</script>

<style lang="scss" src="./HyperlinkButton.scss" global></style>

<template>
    <a
        class={"hyperlink-button" + ` ${className}` || ""}
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