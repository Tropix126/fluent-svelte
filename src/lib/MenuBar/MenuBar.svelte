<script lang="ts">
	let className = "";
	export { className as class };

	let element: HTMLElement;

	export const getElement = () => element;
</script>

<ul class="menu-bar {className ?? ''}" role="menubar" bind:this={element} {...$$restProps}>
	<div class="menu-bar-left">
		<slot />
	</div>
	{#if $$slots.right}
		<div class="menu-bar-right">
			<slot name="right" />
		</div>
	{/if}
</ul>

<style lang="scss">
	@use "./MenuBar";
</style>
