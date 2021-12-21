<script lang="ts">
	let className = "";
	export { className as class };

	let element: HTMLElement;

	export const getElement = () => element;
</script>

<li role="menuitem" class="menu-bar-item {className ?? ''}" bind:this={element} {...$$restProps}>
	<slot />
</li>

<style lang="scss">
	@use "./MenuBarItem";
</style>
