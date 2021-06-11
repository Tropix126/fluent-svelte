<script>
    export let header = undefined;
    export let checked = false;
    export let disabled = false;

    let input;
</script>

<template>
    <div class="toggle-switch-wrap" class:disabled>
        {#if header}
            <h5 class="toggle-switch-header">{header}</h5>
        {/if}
        <label class="toggle-switch-container">
            <input
                class={"toggle-switch" + ($$props.class ?? "")}
                type="checkbox"
                bind:checked
                bind:this={input}
                {disabled}
                {...$$restProps}
            />
            {#if $$slots.default}
                <span>
                    <slot/>
                </span>
            {/if}
        </label>
    </div>
</template>

<style lang="scss">
    .toggle-switch {
        appearance: none;
        position: relative;
        display: inline-flex;
        align-items: center;
        margin: 0;
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: var(--ControlAltFillColorSecondary);
        border: 1px solid var(--ControlStrongStrokeColorDefault);
        transition: 83ms linear border-color,
                    83ms linear background-color;

        &:checked {
            border-color: transparent;
            background-color: var(--accent-color-default);
            &::before {
                background-color: var(--accent-text-contrast-primary);
                transform: translateX(20px);
            }
        }

        &:disabled {
            border-color: var(--ControlStrongStrokeColorDisabled);
            background-color: var(--ControlAltFillColorDisabled);
            &::before {
                background-color: var(--text-color-disabled);
            }

            &:checked {
                border-color: var(--AccentFillColorDisabled);
                background-color: var(--AccentFillColorDisabled);
                &::before {
                    background-color: var(--accent-text-contrast-disabled);
                }
            }
        }

        &::before {
            content: '';
            left: 3px;
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 7px;
            background-color: var(--text-color-secondary);
            transition: 166ms ease-in-out transform,
                        168ms cubic-bezier(0, 0, 0, 1) height,
                        168ms cubic-bezier(0, 0, 0, 1) width,
                        168ms cubic-bezier(0, 0, 0, 1) margin,
                        83ms linear background-color;
        }
    }

    .toggle-switch-container:hover .toggle-switch,
    .toggle-switch:hover {
        background-color: var(--ControlAltFillColorTertiary);
        &::before {
            width: 14px;
            height: 14px;
        }
        &:checked {
            background-color: var(--accent-color-secondary);
            &:before {
                margin-left: -1px;
            }
        }
    }

    .toggle-switch-container:active .toggle-switch,
    .toggle-switch:active {
        background-color: var(--ControlAltFillColorQuarternary);
        &::before {
            width: 17px;
            height: 14px;
        }
        &:checked {
            background-color: var(--accent-color-tertiary);
            &:before {
                margin-left: -4px;
            }
        }
    }

    .toggle-switch-container {
        padding: 5px 0;
        display: flex;
        align-items: center;
        color: var(--text-color-primary);
        font: {
            weight: normal;
            family: var(--control-font-family);
            size: var(--control-font-size);
        }
        span {
            margin: 0 10px;
        }
    }

    .toggle-switch-wrap {
        user-select: none;
        min-width: 154px;
        &.disabled {
            pointer-events: none;
            .toggle-switch-header,
            .toggle-switch-container {
                color: var(--text-color-disabled);
            }
        }
    }

    .toggle-switch-header {
        display: inline-block;
        margin: 0;
        margin-bottom: 4px;
        color: var(--text-color-primary);
        font: {
            weight: normal;
            family: var(--control-font-family);
            size: var(--control-font-size);
        }
    }
</style>