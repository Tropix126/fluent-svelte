<script>
    export let checked = false;
    export let disabled = false;
    let className = undefined;
    export { className as class };

    let input;
</script>

<style lang="scss" src="./ToggleSwitch.scss" global></style>

<template>
    <label class="toggle-switch-container" class:disabled>
        <input
            class={"toggle-switch" + ` ${className}` || ""}
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
</template>