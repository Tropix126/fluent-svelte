<script lang="ts">
	export let type = "button";

	let className = "";
	export { className as class };

	let element: HTMLButtonElement;

	export const getElement = () => element;
</script>

<button
	bind:this={element}
	class="text-box-button {className ?? ''}"
	{type}
	{...$$restProps}
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
>
	<slot /></button
>

<style lang="scss">
	@use "./TextBoxButton";
</style>