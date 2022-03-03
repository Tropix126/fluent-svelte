<script lang="ts">
	export let selected = false;
	export let disabled = false;
	export let blackout = false;
	export let current = false;
	export let outOfRange = false;
	export let variant: "day" | "monthYear" = "day";
	export let header = "";
</script>

<button
	on:click
	on:keydown
	type="button"
	class="calendar-view-item type-{variant === 'day' ? 'day' : 'month-year'}"
	class:selected
	class:current
	class:blackout
	class:disabled
	class:out-of-range={outOfRange}
	disabled={disabled || blackout}
	aria-selected={selected}
	{...$$restProps}
>
	{#if header}
		<small>{header}</small>
	{/if}
	<slot />
</button>

<style lang="scss">
	@use "./CalendarViewItem";
</style>
