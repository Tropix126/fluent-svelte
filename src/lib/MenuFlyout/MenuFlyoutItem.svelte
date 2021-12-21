<script lang="ts">
	import { getContext } from "svelte";

	import TextBlock from "../TextBlock/TextBlock.svelte";

	/**  */
	export let variant: "standard" | "radio" | "toggle" = "standard";

	export let cascading = false;

	/**  */
	export let hint: string = undefined;

	export let selected = false;

	export let checked = false;

	export let indented = false;

	export let group: any = [];

	export let value: any = undefined;

	/** Controls whether the button is disabled */
	export let disabled = false;

	/** Sets an href value and converts the list element into an anchor */
	export let href = "";

	/** Specifies a custom class name for the list item */
	let className = "";
	export { className as class };

	const closeFlyout = getContext("closeFlyout");

	function handleKeyDown({ target, key }) {
		if (key === "Enter") target.click();
	}
</script>

{#if variant === "standard"}
	{#if href && !disabled}
		<a
			on:click={closeFlyout}
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
			on:keydown={handleKeyDown}
			on:keydown
			on:keyup
			tabindex={disabled ? -1 : 0}
			role="menuitem"
			class="menu-flyout-item {className ?? ''}"
			class:selected
			class:disabled
			class:indented
			{href}
			{...$$restProps}
		>
			<slot name="icon" />
			<TextBlock>
				<slot />
			</TextBlock>
		</a>
	{:else}
		<li
			on:click={closeFlyout}
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
			on:keydown={handleKeyDown}
			on:keydown
			on:keyup
			tabindex={disabled ? -1 : 0}
			role="menuitem"
			class="menu-flyout-item {className ?? ''}"
			class:selected
			class:disabled
			class:indented
			{...$$restProps}
		>
			<slot name="icon" />
			<slot />
			{#if hint}
				<TextBlock class="menu-flyout-item-hint" variant="caption">{hint}</TextBlock>
			{/if}
			{#if cascading}
				<svg
					class="menu-flyout-item-arrow"
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
				>
					<path
						d="M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z"
						fill="currentColor"
					/>
				</svg>
			{/if}
		</li>
	{/if}
{:else if variant === "radio" || variant === "toggle"}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label style="display: contents;">
		<svelte:self
			aria-selected={checked || group === value || selected}
			{selected}
			{indented}
			{group}
			{disabled}
			{href}
		>
			<slot name="icon" slot="icon" />
			<div
				class="menu-flyout-item-{variant === 'radio' ? 'bullet' : 'checkmark'}"
				class:active={checked || group === value}
			>
				{#if variant === "toggle"}
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.85355 3.14645C10.0488 3.34171 10.0488 3.65829 9.85355 3.85355L5.35355 8.35355C5.15829 8.54882 4.84171 8.54882 4.64645 8.35355L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L5 7.29289L9.14645 3.14645C9.34171 2.95118 9.65829 2.95118 9.85355 3.14645Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
			</div>
			<slot />
		</svelte:self>

		{#if variant === "radio"}
			<input
				on:change
				on:input
				on:beforeinput
				type="radio"
				bind:group
				{value}
				{checked}
				{disabled}
				hidden
			/>
		{:else}
			<input
				on:change
				on:input
				on:beforeinput
				type="checkbox"
				bind:value
				bind:checked
				{disabled}
				hidden
			/>
		{/if}
	</label>
{/if}

<style lang="scss">
	@use "./MenuFlyoutItem";
</style>