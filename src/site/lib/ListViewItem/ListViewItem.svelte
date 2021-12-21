<script lang="ts">
	import ChevronDown from "@fluentui/svg-icons/icons/chevron_down_24_regular.svg?raw";

	export let href: string = undefined;
	export let group = undefined;
	export let value = undefined;
	export let selected = false;
	export let expanded= false;
	export let type: "default" | "navigation" | "expander" = "default";
	let className = "";
	export { className as class };
</script>

{#if typeof group === "undefined"}
	{#if !href}
		<li
			on:click
			class="list-view-item type-{type} {className || ''}"
			class:type-icon={$$slots.icon}
			class:selected
			{...$$restProps}
		>
			<slot name="icon" />
			<span>
				<slot />
			</span>
			{#if type === "expander"}
				<div class="expander-icon" class:expanded>
					{@html ChevronDown}
				</div>
			{/if}
		</li>
	{:else}
		<a
			on:click
			class="list-view-item type-{type} {className || ''}"
			class:type-icon={$$slots.icon}
			class:selected
			{href}
			{...$$restProps}
		>
			<slot name="icon" />
			<span>
				<slot />
			</span>
			{#if type === "expander"}
				<div class="expander-icon" class:expanded>
					{@html ChevronDown}
				</div>
			{/if}
		</a>
	{/if}
{:else}
	<label>
		<input
			bind:group
			on:change
			type="radio"
			{value}
			checked={selected}
			hidden
		/>
		<svelte:self
			on:click
			{type}
			class={className}
			{href}
			selected={group === value || selected}
			{...$$restProps}
		>
			<slot />
		</svelte:self>
	</label>
{/if}

<style lang="scss">
	@use "ListViewItem";
</style>