<script lang="ts">
	let className = "";
	export { className as class };

	let element: HTMLElement;

	export const getElement = () => element;
</script>

<hr role="separator" class="menu-flyout-divider {className ?? ''}" bind:this={element} {...$$restProps} />

<style lang="scss">
	@use "./MenuFlyoutDivider";
</style>