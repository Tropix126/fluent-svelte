<script>
    export let style = "default";
    export let type = "button";
    export let id = undefined;
    export let disabled = false;

    const STYLES = ["default", "accent"];
</script>

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

<style lang="scss">
    /*
     * Button Element
     */

    .button {
        user-select: none;
        display: inline-flex;
        align-items: center;
        text-align: left;
        word-break: break-word;
        border: 1px solid;
        border-radius: var(--control-corner-radius);
        padding: 5px 11px 6px 11px;
        transition: 83ms ease background-color,
                    83ms ease box-shadow;
        font: {
            size: var(--control-font-size);
            family: var(--control-font-family);
            weight: normal;
        }

        // Button styles
        &.style- {

            // "Default" style
            &default {
                background-clip: padding-box;
                color: var(--text-color-primary);
                background-color: var(--ControlFillColorDefault);
                border-color: var(--ControlStrokeColorDefault);
                border-top-color: var(--ControlStrokeColorSecondary);

                // Interaction states
                // Hover state
                &:hover {
                    background-color: var(--ControlFillColorSecondary);
                }

                // Active (pressed) state
                &:active {
                    background-color: var(--ControlFillColorTertiary);
                    border-color: var(--ControlStrokeColorDefault);
                    color: var(--text-color-secondary);
                }

                // Disabled state
                &:disabled {
                    background-color: var(--ControlFillColorDisabled);
                    border-color: var(--ControlStrokeColorDefault);
                    color: var(--text-color-disabled);
                }
            }

            // "Accent" style
            &accent {
                color: var(--accent-text-contrast-primary);
                background-color: var(--accent-color-default);
                border-color: var(--ControlStrokeColorOnAccentDefault);
                border-bottom-color: var(--ControlStrokeColorOnAccentSecondary);
                
                // Interaction states
                // Hover state
                &:hover {
                    background-color: var(--accent-color-secondary);
                }

                // Active (pressed) state
                &:active {
                    color: var(--accent-text-contrast-secondary);
                    background-color: var(--accent-color-tertiary);
                    border-color: transparent;
                }

                // Disabled state
                &:disabled {
                    color: var(--accent-text-contrast-disabled);
                    background-color: var(--AccentFillColorDisabled);
                    border-color: transparent;
                }
            }
        }
    }

    /*
     * Light-theme specific styles
     * ==========================================
     * The borders on default buttons are
     * slightly different on light theme and
     * therefore must be styled accordingly.
     */
    :global(.theme-light .button.style-default) {
        border-color: var(--ControlStrokeColorDefault);
        border-bottom-color: var(--ControlStrokeColorSecondary);
    }
</style>