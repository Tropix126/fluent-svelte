<script>
    export let type = "text";
</script>

<template>
    <div class="textbox-container">
        <input
            class="textbox"
            {type}
            {...$$restProps}
        />
        <div class="textbox-underline"></div>
    </div>
</template>

<style lang="scss">
    .textbox {
        border: none;
        outline: none;
        margin: 1px;
        min-height: 24px;
        padding: 6px 6px 5px 10px;
        color: var(--text-color-primary);
        box-shadow: 0 0 0 1px var(--ControlStrokeColorDefault);
        background-color: var(--ControlFillColorDefault);
        border-radius: var(--control-corner-radius);
        font: {
            family: var(--control-font-family);
            size: 14px;
            weight: 400;
        }
        &::placeholder {
            color: var(--text-color-secondary);
        }
        &:hover {
            background-color: var(--ControlFillColorSecondary);
        }
        &:focus {
            border: none;
            box-shadow: 0 0 0 1px var(--ControlStrokeColorDefault);
            background-color: var(--ControlFillColorInputActive);
            + .textbox-underline {
                border-radius: 0;
                border-bottom: 2px solid var(--accent-color-default);
            }
            &::placeholder {
                color: var(--text-color-tertiary);
            }
        }
    }
    .textbox-container {
        position: relative;
        overflow: hidden;
        border-radius: var(--control-corner-radius);
    }
    .textbox-underline {
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: calc(var(--control-corner-radius) / 1.2);
        border-bottom: 1px solid var(--ControlStrongStrokeColorDefault);
    }
</style>