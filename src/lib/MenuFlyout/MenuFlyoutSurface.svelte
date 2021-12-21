<script lang="ts">
	let className = "";
	export { className as class };

	let element: HTMLUListElement;

	export const getElement = () => element;
</script>

<ul
	class="menu-flyout {className ?? ''}"
	on:click
	on:blur
	on:focus
	on:dblclick
	on:contextmenu
	on:mousedown
	on:mouseup
	on:mouseover
	on:mouseout
	on:mouseenter
	on:mouseleave
	on:keypress
	on:keydown
	on:keyup
	on:animationend
	bind:this={element}
	{...$$restProps}
>
	<slot />
</ul>

<style lang="scss">
	@use "./MenuFlyoutSurface";
</style>
