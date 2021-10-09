<script lang="ts">
	export let selected = false;
	export let disabled = false;
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
	on:mouseleave
	on:keypress
	on:keydown
	on:keyup
	tabindex="0"
	class="combo-box-item"
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
	@use "./ComboBoxItem";
</style>
