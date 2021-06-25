<script>
    export let style = "default";
    export let type = "button";
    export let id = undefined;
    export let disabled = false;
    let className = undefined;
    export {className as class};

    const STYLES = ["default", "accent"];
</script>

<style lang="scss" src="./Button.scss" global></style>

<template>
    <button
        class={`button ${STYLES.includes(style) ? `style-${style}` : "style-default"}` + ` ${className || ""}`}
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