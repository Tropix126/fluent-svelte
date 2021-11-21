<script lang="ts">
	/** Controls whether the list item is selected or not */
	export let selected = false;

	/** Controls whether the button is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the list item */
	let className = "";
	export { className as class };
</script>

<li
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
	tabindex={disabled ? -1 : 0}
	class="list-item {className ?? ''}"
	class:selected
	class:disabled
	{...$$restProps}
>
	<slot name="icon" />
	<span>
		<slot />
	</span>
</li>

<style lang="scss">
	@use "./ListItem";
</style>