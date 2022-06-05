<script lang="ts">
	import TextBox from "../TextBox/TextBox.svelte";
	import TextBoxButton from "../TextBox/TextBoxButton.svelte";

	/** @extends {"../TextBox/TextBox.svelte"} */
	/** Determines whether the spinner buttons will be placed in an inline layout. */
	export let inline = false;

	/** The input's current value. */
	export let value: any = "";

	/** Minimum value for the input. */
	export let min: number = undefined;

	/** Maximum value for the input. */
	export let max: number = undefined;

	/** Controls the interval between two value changes when triggering a spin button. */
	export let step: number = undefined;

	/** Controls whether the NumberBox is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Specifies a custom class name for the NumberBox. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the input element. */
	export let inputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the NumberBox's container element. */
	export let containerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the NumberBox's buttons container element. */
	export let buttonsContainerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the spin button element that increases the input's value. */
	export let spinUpButtonElement: HTMLButtonElement = null;

	/** Obtains a bound DOM reference to the NumberBox's clear button element. Only available if `clearButton` is set to true, `readonly` is set to false, and a `value` is present. */
	export let clearButtonElement: HTMLButtonElement = null;

	/** Obtains a bound DOM reference to the spin button element that decreases the input's value. */
	export let spinDownButtonElement: HTMLButtonElement = null;

	/** Obtains a bound DOM reference to the spin button flyout. Only available when `inline` is set to `false`. */
	export let spinnerFlyoutElement: HTMLDivElement = null;

	let spinUpTimeout;
	let spinDownTimeout;
	let spinUpInterval;
	let spinDownInterval;
	let spinnerFlyoutOpen = false;

	function spinUp() {
		stepUp();

		spinUpTimeout = setTimeout(() => {
			spinUpInterval = setInterval(() => {
				stepUp();
			}, 50);
		}, 500);
	}

	function spinDown() {
		stepDown();

		spinDownTimeout = setTimeout(() => {
			spinDownInterval = setInterval(() => {
				stepDown();
			}, 50);
		}, 500);
	}

	function stopSpinIntervals() {
		clearTimeout(spinUpTimeout);
		clearInterval(spinUpInterval);
		clearTimeout(spinDownTimeout);
		clearInterval(spinDownInterval);
	}

	function handleTabKey({ key }) {
		if (key === "Tab") spinnerFlyoutOpen = false;
	}

	export function stepUp() {
		inputElement.stepUp();
		value = inputElement.value;
	}

	export function stepDown() {
		inputElement.stepDown();
		value = inputElement.value;
	}

	$: if (value?.toString() === max?.toString() || value?.toString() === min?.toString())
		stopSpinIntervals();
	$: spinUpButtonDisabled = disabled || value?.toString() === max?.toString();
	$: spinDownButtonDisabled = disabled || value?.toString() === min?.toString();
</script>

<svelte:window on:keydown={handleTabKey} />

<TextBox
	class="number-box {className ?? ''}"
	type="number"
	bind:inputElement
	bind:containerElement
	bind:buttonsContainerElement
	bind:clearButtonElement
	bind:value
	on:outermousedown={() => (spinnerFlyoutOpen = false)}
	on:change
	on:input
	on:beforeinput
	on:click
	on:blur
	on:focus={() => (spinnerFlyoutOpen = true)}
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
	on:clear
	{min}
	{max}
	{step}
	{disabled}
	{...$$restProps}
>
	<slot />
	<svelte:fragment slot="buttons">
		{#if inline}
			{#if !disabled}
				<TextBoxButton
					on:mousedown={spinUp}
					on:mouseup={stopSpinIntervals}
					on:mouseleave={stopSpinIntervals}
					bind:element={spinUpButtonElement}
					tabindex="-1"
					aria-label="Increase number"
					disabled={spinUpButtonDisabled}
					class="number-box-spinner"
				>
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 12 12"
					>
						<path
							fill="currentColor"
							d="M2.14645 7.35355C2.34171 7.54882 2.65829 7.54882 2.85355 7.35355L6 4.20711L9.14645 7.35355C9.34171 7.54882 9.65829 7.54882 9.85355 7.35355C10.0488 7.15829 10.0488 6.84171 9.85355 6.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645L2.14645 6.64645C1.95118 6.84171 1.95118 7.15829 2.14645 7.35355Z"
						/>
					</svg>
				</TextBoxButton>
				<TextBoxButton
					on:mousedown={spinDown}
					on:mouseup={stopSpinIntervals}
					on:mouseleave={stopSpinIntervals}
					bind:element={spinDownButtonElement}
					tabindex="-1"
					aria-label="Decrease number"
					class="number-box-spinner"
					disabled={spinDownButtonDisabled}
				>
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 12 12"
					>
						<path
							fill="currentColor"
							d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z"
						/>
					</svg>
				</TextBoxButton>
			{/if}
		{:else}
			<TextBoxButton
				{disabled}
				class="number-box-spinner-compact"
				tabindex="-1"
				on:mousedown={() => inputElement.focus()}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					height="12"
					width="100%"
					viewBox="128 0 768 1024"
				>
					<path
						fill="currentColor"
						d="M128,384C128,375.333 131.167,367.833 137.5,361.5L487,10.5C494,3.5 502.333,0 512,0C521.667,0 530,3.5 537,10.5L886.5,361.5C892.833,367.833 896,375.333 896,384C896,392.667 892.833,400.167 886.5,406.5C880.167,412.833 872.667,416 864,416C855.333,416 847.833,412.833 841.5,406.5L512,76L182.5,406.5C176.167,412.833 168.667,416 160,416C151.333,416 143.833,412.833 137.5,406.5C131.167,400.167 128,392.667 128,384ZM128,640C128,631.333 131.167,623.833 137.5,617.5C143.833,611.167 151.333,608 160,608C168.667,608 176.167,611.167 182.5,617.5L512,948L841.5,617.5C847.833,611.167 855.333,608 864,608C872.667,608 880.167,611.167 886.5,617.5C892.833,623.833 896,631.333 896,640C896,648.667 892.833,656.167 886.5,662.5L537,1013.5C530,1020.5 521.667,1024 512,1024C502.333,1024 494,1020.5 487,1013.5L137.5,662.5C131.167,656.167 128,648.667 128,640Z"
					/>
				</svg>
			</TextBoxButton>
			{#if spinnerFlyoutOpen}
				<div class="number-box-spinner-flyout" bind:this={spinnerFlyoutElement}>
					<TextBoxButton
						on:mousedown={spinUp}
						on:mouseup={stopSpinIntervals}
						on:mouseleave={stopSpinIntervals}
						bind:element={spinUpButtonElement}
						class="number-box-spinner"
						disabled={spinUpButtonDisabled}
						aria-label="Increase number"
						tabindex="-1"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
						>
							<path
								fill="currentColor"
								d="M3.14645 10.3536C3.34171 10.5488 3.65829 10.5488 3.85355 10.3536L8 6.20711L12.1464 10.3536C12.3417 10.5488 12.6583 10.5488 12.8536 10.3536C13.0488 10.1583 13.0488 9.84171 12.8536 9.64645L8.35355 5.14645C8.15829 4.95118 7.84171 4.95118 7.64645 5.14645L3.14645 9.64645C2.95118 9.84171 2.95118 10.1583 3.14645 10.3536Z"
							/>
						</svg>
					</TextBoxButton>
					<TextBoxButton
						on:mousedown={spinDown}
						on:mouseup={stopSpinIntervals}
						on:mouseleave={stopSpinIntervals}
						bind:element={spinDownButtonElement}
						tabindex="-1"
						aria-label="Decrease number"
						class="number-box-spinner"
						disabled={spinDownButtonDisabled}
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
						>
							<path
								fill="currentColor"
								d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
							/>
						</svg>
					</TextBoxButton>
				</div>
			{/if}
		{/if}

		<slot name="buttons" />
	</svelte:fragment>
</TextBox>

<style lang="scss">
	@use "./NumberBox";
</style>
