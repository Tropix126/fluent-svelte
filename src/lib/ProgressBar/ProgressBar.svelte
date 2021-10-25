<script lang="ts">
    let className = "";
    export { className as class };

    let element: HTMLElement;

    export const getElement = () => element;
</script>

<div class="{className ?? ''}" bind:this={element} {...$$restProps}></div>

<style lang="scss">
    @use "./ProgressBar";
</style>