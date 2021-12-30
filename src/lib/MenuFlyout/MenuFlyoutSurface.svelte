<script lang="ts">
	let className = "";
	export { className as class };

	export let element: HTMLUListElement = null;

	let animationComplete = false;
</script>

<div
	class="menu-flyout-surface-container"
	style={animationComplete ? "overflow: visible;" : undefined}
>
	<ul
		on:animationend={() => (animationComplete = true)}
		class="menu-flyout {className ?? ''}"
		bind:this={element}
		{...$$restProps}
	>
		<slot />
	</ul>
</div>

<style lang="scss">
	@use "./MenuFlyoutSurface";
</style>
