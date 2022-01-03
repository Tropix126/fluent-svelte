<script lang="ts">
	let className = "";
	export { className as class };

	let element: HTMLDivElement;

	export const getElement = () => element;
</script>

<div
	class="hero-card {className}"
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
	bind:this={element}
>
	<header>
		<slot name="header" />
	</header>
	<slot />
</div>

<style lang="scss">
	@use "./HeroCard";
</style>
