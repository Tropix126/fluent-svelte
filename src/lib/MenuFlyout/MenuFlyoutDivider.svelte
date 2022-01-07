<script lang="ts">
	/** Specifies a custom class name for the divider. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the divider's element. */
	export let element: HTMLElement = null;
</script>

<hr class="menu-flyout-divider {className}" bind:this={element} {...$$restProps} />

<style lang="scss">
	@use "./MenuFlyoutDivider";
</style>
