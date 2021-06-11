<script>
    import { onMount } from "svelte";

    export let indeterminate = false;
    export let checked = false;
    export let disabled = false;

    let input;

    onMount(() => {
        if (indeterminate) input.indeterminate = true;
    });
</script>

<template>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- https://github.com/sveltejs/svelte/issues/5528 -->
    <label class="checkbox-container" class:disabled class:indeterminate>
        <div class="checkbox-inner">
            <input
                class={"checkbox" + ($$props.class ?? "")}
                type="checkbox"
                bind:checked
                bind:this={input}
                {disabled}
                {...$$restProps}
            />
            <svg class="checkbox-glyph" viewBox={indeterminate ? "0 0 20 20" : "0 0 24 24"}>
                {#if indeterminate && checked}
                    <path class="path-indeterminate" d="M2 9.5C2 9.22386 2.22386 9 2.5 9H17.5C17.7761 9 18 9.22386 18 9.5C18 9.77614 17.7761 10 17.5 10H2.5C2.22386 10 2 9.77614 2 9.5Z"/>
                    {:else}
                    <path class="path-checkmark" d="M0.73, 11.91 8.1,19.28 22.79,4.59" fill="none"/>
                {/if}
            </svg>
        </div>
        {#if $$slots.default}
            <span>
                <slot/>
            </span>
        {/if}
    </label>
</template>

<style lang="scss">
    /*
     * Checkbox element
     * ==========================================
     * Primary <input> element which recieves all
     * events.
     */
    
    .checkbox {
        appearance: none;
        margin: 0;
        width: 20px;
        height: 20px;
        border-radius: var(--control-corner-radius);
        background-color: var(--ControlAltFillColorSecondary);
        box-shadow: inset 0 0 0 1px var(--ControlStrongStrokeColorDefault);

        // Checked state
        &:checked {
            box-shadow: none;
            background-color: var(--accent-color-default);

            // Unhide and transition the checkmark glyph
            + .checkbox-glyph .path-checkmark {
                transition: 142ms linear stroke-dashoffset;
                stroke-dashoffset: 0;
            }
        }

        // Disabled state
        &:disabled {
            box-shadow: inset 0 0 0 1px var(--ControlStrongStrokeColorDisabled);
            background-color: var(--ControlAltFillColorDisabled);

            // Checked + disabled state
            &:checked {
                box-shadow: inset 0 0 0 1px var(--ControlStrongStrokeColorDisabled);
                background-color: var(--AccentFillColorDisabled);

                // Update glyph color
                + .checkbox-glyph {
                    color: var(--accent-text-contrast-disabled);
                }
            }
        }
    }

    /*
     * Interaction states
     * ==========================================
     * To be consistent with WinUI, we need to
     * style our states through both the checkbox
     * element AND label container
     */
    
    // Hover state
    .checkbox-container:hover .checkbox:not(:checked),
    .checkbox:not(:checked):hover {
        background-color: var(--ControlAltFillColorTertiary);
    }

    // Active (pressed) state
    .checkbox-container:active .checkbox:not(:checked),
    .checkbox:not(:checked):active {
        box-shadow: inset 0 0 0 1px var(--ControlStrongStrokeColorDisabled);
        background-color: var(--ControlAltFillColorQuarternary);
    }

    // Checked + hover state
    .checkbox-container:hover .checkbox:checked,
    .checkbox:checked:hover {
        background-color: var(--accent-color-secondary);
    }

    // Checked + active (pressed) state
    .checkbox-container:active .checkbox:checked,
    .checkbox:checked:active {
        background-color: var(--accent-color-tertiary);

        // Update glyph color
        + .checkbox-glyph {
            color: var(--accent-text-contrast-secondary);
        }
    }

    /*
     * Checkbox glyph
     * ==========================================
     * Symbol displayed when the checkbox is in
     * its checked state.
     */
    
    .checkbox-glyph {
        color: var(--accent-text-contrast-primary);
        position: absolute;
        width: 12px;
        height: 12px;

        // Inner glyph <path> element
        path {
            transform: scale(0.675);
            transform-origin: center;
            stroke: currentColor;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        // Inner checkmark <path> element
        // Only displays on non-indeterminate checkboxes
        .path-checkmark {
            stroke-width: 2.45;
            stroke-dasharray: 32;
            stroke-dashoffset: 32;
        }

        // Inner indeterminate <path> element
        // Only displays on indeterminate checkboxes
        .path-indeterminate {
            stroke-width: 1;
        }
    }

    /*
     * Checkbox outer container
     * ==========================================
     * Contains the label and checkbox inner
     * container.
     */
    
    .checkbox-container {
        user-select: none;
        display: flex;
        align-items: center;
        min-height: 32px;
        min-width: 120px;
        color: var(--text-color-primary);
        font: {
            weight: normal;
            family: var(--control-font-family);
            size: var(--control-font-size);
        }
        &.disabled {
            pointer-events: none;
            span {
                color: var(--text-color-disabled);
            }
        }
        span {
            margin-left: 8px;
        }
    }

    /*
     * Checkbox inner container
     * ==========================================
     * Ensures that the checkbox glyph and
     * checkbox element are properly aligned.
     */
    
     .checkbox-inner {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>