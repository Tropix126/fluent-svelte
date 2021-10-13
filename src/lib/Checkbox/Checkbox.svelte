<script lang="ts">
	/** Controls whether the checkbox is checked or not */
	export let checked = false;

	/** Controls whether the checkbox is in the indeterminate state */
	export let indeterminate = false;

	/** Specifies the input's native value attribute */
	export let value = undefined;

	/** Controls whether the checkbox is disabled */
	export let disabled = false;

	/** Specifies a custom class name for the checkbox */
	let className = "";
	export { className as class };
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- https://github.com/sveltejs/svelte/pull/5323 -->
<label class="checkbox-container" class:disabled class:indeterminate>
	<div class="checkbox-inner">
		<input
			on:change
			on:input
			on:beforeinput
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
			class="checkbox{` ${className}` || ''}"
			type="checkbox"
			bind:checked
			bind:indeterminate
			{value}
			{disabled}
			{...$$restProps}
		/>
		<svg class="checkbox-glyph" viewBox={indeterminate ? "171 470 683 85" : "0 0 24 24"}>
			{#if indeterminate && checked}
				<path
					class="path-indeterminate"
					d="M213.5,554.5C207.5,554.5 201.917,553.417 196.75,551.25C191.583,549.083 187.083,546.083 183.25,542.25C179.417,538.417 176.333,533.917 174,528.75C171.667,523.583 170.5,518 170.5,512C170.5,506 171.667,500.417 174,495.25C176.333,490.083 179.417,485.583 183.25,481.75C187.083,477.917 191.583,474.917 196.75,472.75C201.917,470.583 207.5,469.5 213.5,469.5L810.5,469.5C816.5,469.5 822.083,470.583 827.25,472.75C832.417,474.917 836.917,477.917 840.75,481.75C844.583,485.583 847.667,490.083 850,495.25C852.333,500.417 853.5,506 853.5,512C853.5,518 852.333,523.583 850,528.75C847.667,533.917 844.583,538.417 840.75,542.25C836.917,546.083 832.417,549.083 827.25,551.25C822.083,553.417 816.5,554.5 810.5,554.5Z"
				/>
			{:else}
				<path
					class="path-checkmark"
					d="M 4.5303 12.9697 L 8.5 16.9393 L 18.9697 6.4697"
					fill="none"
				/>
			{/if}
		</svg>
	</div>
	{#if $$slots.default}
		<span>
			<slot />
		</span>
	{/if}
</label>

<style lang="scss">
	@use "./Checkbox";
</style>
