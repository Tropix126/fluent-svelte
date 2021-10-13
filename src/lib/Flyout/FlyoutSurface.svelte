<script lang="ts"></script>

<div
	class="flyout"
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
>
	<slot />
</div>

<style lang="scss">
	@use "./FlyoutSurface";
</style>
