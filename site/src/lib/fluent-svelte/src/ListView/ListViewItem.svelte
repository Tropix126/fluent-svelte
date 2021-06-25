<script>
    export let selected = false;
</script>

<style lang="scss" src="./ListViewItem.scss" global></style>

<template>
    <li class="list-view-item" class:selected>
        <div class="list-view-item-inner">
            {#if $$slots.icon}
                <div class="list-view-item-icon">
                    <slot name="icon"></slot>
                </div>
            {/if}
            <slot/>
        </div>
    </li>
</template>