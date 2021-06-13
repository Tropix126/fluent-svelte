<script>    
    import { createEventDispatcher, onMount } from "svelte";

    export let type = "text";
    export let value = "";
    export let autoSuggest = [];
    export let clearButton = true;
    export let searchButton = true;
    export let revealButton = true;
    export let disabled = false;

    let input;

    const dispatch = createEventDispatcher();
    const TEXT_TYPES = ["text", "search", "tel", "email", "url", "password"];
    const CLEAR_BUTTON_TYPES = ["text", "search", "tel", "email", "url"];

    function updateValue() {
        value = input.value;
        dispatch("input");
    }

    function revealPassword() {
        input.focus();
        input.setAttribute("type", "text");
        let revealButtonMouseDown = true;
        const hidePassword = () => {
            if (!revealButtonMouseDown) return;
            input.focus();  
            revealButtonMouseDown = false;
            input.setAttribute("type", "password");
            dispatch("reveal")
            document.removeEventListener("mouseUp", hidePassword);
        }
        document.addEventListener("mouseup", hidePassword);
    }

    function clear() {
        value = null;
        input.focus();
        dispatch("clear");
    }

    function search() {
        input.focus();
        dispatch("search");
    }
</script>

<template>
    <div class="textbox-underline-frame">
        <div class="textbox-container" class:disabled>
            <input
                class="textbox"
                autocomplete="off"
                bind:this={input}
                on:input={updateValue}
                type={TEXT_TYPES.includes(type) ? type : "text"}
                {disabled}
                {value}
                {...$$restProps}
            />
            <div class="textbox-buttons">
                <slot name="buttons" />
                {#if CLEAR_BUTTON_TYPES.includes(type) && clearButton && value}
                    <button class="textbox-button textbox-clear-button" tabindex="-1" on:click={clear}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M7.2001 7.22848C7.68826 6.74033 8.47971 6.74033 8.96787 7.22848L23.9996 22.2602L39.0313 7.22848C39.5194 6.74033 40.3109 6.74033 40.799 7.22848C41.2872 7.71664 41.2872 8.50809 40.799 8.99625L25.7673 24.0279L40.7431 39.0038C41.2313 39.4919 41.2313 40.2834 40.7431 40.7715C40.255 41.2597 39.4635 41.2597 38.9754 40.7715L23.9996 25.7957L9.02376 40.7715C8.5356 41.2597 7.74415 41.2597 7.25599 40.7715C6.76784 40.2834 6.76784 39.4919 7.25599 39.0038L22.2318 24.0279L7.2001 8.99625C6.71195 8.50809 6.71195 7.71664 7.2001 7.22848Z" fill="currentColor"/>
                        </svg>
                    </button>
                {/if}
                {#if type === "search" && searchButton}
                    <button
                        class="textbox-button textbox-search-button"
                        tabindex="-1"
                        on:click={search}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34C23.4159 34 26.5461 32.7766 28.9763 30.7441L39.8662 41.6339C40.3543 42.122 41.1458 42.122 41.6339 41.6339C42.1221 41.1457 42.1221 40.3543 41.6339 39.8661L30.7441 28.9763C32.7766 26.5461 34 23.4159 34 20C34 12.268 27.732 6 20 6ZM8.5 20C8.5 13.6487 13.6487 8.5 20 8.5C26.3513 8.5 31.5 13.6487 31.5 20C31.5 26.3513 26.3513 31.5 20 31.5C13.6487 31.5 8.5 26.3513 8.5 20Z" fill="currentColor"/>
                        </svg>
                    </button>
                {/if}
                {#if type === "password" && revealButton && value}
                    <button
                        class="textbox-button textbox-reveal-button"
                        tabindex="-1"
                        on:mousedown={revealPassword}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 9.00462C14.2091 9.00462 16 10.7955 16 13.0046C16 15.2138 14.2091 17.0046 12 17.0046C9.79086 17.0046 8 15.2138 8 13.0046C8 10.7955 9.79086 9.00462 12 9.00462ZM12 10.5046C10.6193 10.5046 9.5 11.6239 9.5 13.0046C9.5 14.3853 10.6193 15.5046 12 15.5046C13.3807 15.5046 14.5 14.3853 14.5 13.0046C14.5 11.6239 13.3807 10.5046 12 10.5046ZM12 5.5C16.6135 5.5 20.5961 8.65001 21.7011 13.0644C21.8017 13.4662 21.5575 13.8735 21.1557 13.9741C20.7539 14.0746 20.3466 13.8305 20.246 13.4286C19.3071 9.67796 15.9214 7 12 7C8.07693 7 4.69009 9.68026 3.75285 13.4332C3.65249 13.835 3.24535 14.0794 2.84348 13.9791C2.44161 13.8787 2.19719 13.4716 2.29755 13.0697C3.40064 8.65272 7.38448 5.5 12 5.5Z" fill="currentColor"/>
                        </svg>
                    </button>
                {/if}
            </div>
            <div class="textbox-underline"></div>
        </div>
    </div>
</template>

<style lang="scss">
    .textbox-underline-frame {
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: var(--control-corner-radius);
        &:focus-within .textbox-underline {
            border-radius: 0;
            border-bottom: 2px solid var(--accent-color-default);
        }
    }

    .textbox-container {
        display: flex;
        align-items: center;
        border-radius: var(--control-corner-radius);
        border: 1px solid var(--ControlStrokeColorDefault);
        background-color: var(--ControlFillColorDefault);
        background-clip: padding-box;
        &:hover {
            background-color: var(--ControlFillColorSecondary);
        }
        &:focus-within {
            border-color: var(--ControlStrokeColorDefault);
            background-color: var(--ControlFillColorInputActive);
        }
        &.disabled {
            pointer-events: none;
            background-color: var(--ControlFillColorDisabled);
            + .textbox-underline {
                display: none;
            }
        }
    }

    .textbox {
        border: none;
        outline: none;
        padding: 6px 6px 5px 10px;
        width: 100%;
        min-height: 30px;
        color: var(--text-color-primary);
        background-color: transparent;
        font: {
            family: var(--control-font-family);
            size: 14px;
            weight: 400;
        }
        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
            -webkit-appearance:none;
        }
        &::placeholder {
            user-select: none;
            color: var(--text-color-secondary);
        }
        &:focus {
            &::placeholder {
                color: var(--text-color-tertiary);
            }
            ~ .textbox-buttons {
                .textbox-clear-button,
                .textbox-reveal-button {
                    display: flex;
                }
            }
        }
        &:disabled {
            pointer-events: none;
            color: var(--TextFillColorDisabled);
            &::placeholder {
                color: var(--TextFillColorDisabled);
            }
        }
    }

    .textbox-underline {
        pointer-events: none;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid var(--ControlStrongStrokeColorDefault);
        border-radius: calc(var(--control-corner-radius) - 0.75px);
    }

    .textbox-buttons {
        display: flex;
        align-items: center;
    }

    .textbox-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        width: 30px;
        padding: 4px 0;
        margin-right: 4px;
        border-radius: var(--control-corner-radius);
        background-color: transparent;
        &:hover {
            background-color: var(--SubtleFillColorSecondary);
        }
        &:active {
            background-color: var(--SubtleFillColorTertiary);
            svg {
                color: var(--text-color-tertiary);
            }
        }
        &.textbox-clear-button,
        &.textbox-reveal-button {
            display: none;
            &:active {
                display: flex;
            }
        }
        &.textbox-clear-button svg {
            width: 12px;
            height: auto;
        }
        svg {
            color: var(--text-color-secondary);
            width: 14px;
            height: auto;
        }
    }

    .textbox-autosuggest {
        z-index: 10;
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        top: 100%;
        width: 100%;
        background-color: var(--background-quarternary);
        border-radius: 0 0 var(--overlay-corner-radius) var(--overlay-corner-radius);
    }
</style>