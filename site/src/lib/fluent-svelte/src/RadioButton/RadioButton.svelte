<script>
    export let group = [];
    export let value = undefined;
</script>

<style lang="scss" src="./RadioButton.scss" global></style>

<template>
    <label class="radio-button-container">
        <input
            type="radio"
            class="radio-button"
            bind:group
            {value}
            {...$$restProps}
        />
        <span>
            <slot />
        </span>
    </label>
</template>