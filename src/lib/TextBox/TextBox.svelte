<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { externalMouseEvents, createEventForwarder } from "$lib/internal";

	import TextBoxButton from "../TextBox/TextBoxButton.svelte";

	type TextInputTypes =
		| "text"
		| "number"
		| "search"
		| "password"
		| "email"
		| "tel"
		| "url"
		| "date"
		| "datetime-local"
		| "month"
		| "time"
		| "week";

	/** The input's current value. */
	export let value: any = "";

	/** Determiness the input type of the textbox. */
	export let type: TextInputTypes = "text";

	/** The initial placeholder text displayed if no value is present. */
	export let placeholder: string = undefined;

	/** Determines whether a text clear button is present. */
	export let clearButton = true;

	/** Determines whether a search button is present when `type` is set to "search". */
	export let searchButton = true;

	/** Determines whether a password reveal button is present when `type` is set to "password". */
	export let revealButton = true;

	/** Determines whether the textbox can be typed in or not. */
	export let readonly = false;

	/** Controls whether the TextBox is intended for user interaction, and styles it accordingly. */
	export let disabled = false;

	/** Specifies a custom class name for the TextBox container. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the TextBox's input element. */
	export let inputElement: HTMLInputElement = null;

	/** Obtains a bound DOM reference to the TextBox's container element. */
	export let containerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the TextBox's buttons container element. */
	export let buttonsContainerElement: HTMLDivElement = null;

	/** Obtains a bound DOM reference to the TextBox's clear button element. Only available if `clearButton` is set to true, `readonly` is set to false, and a `value` is present. */
	export let clearButtonElement: HTMLButtonElement = null;

	/** Obtains a bound DOM reference to the TextBox's search button element. Only available if `type` is set to `search`. */
	export let searchButtonElement: HTMLButtonElement = null;

	/** Obtains a bound DOM reference to the TextBox's reveal button element. Only available if `type` is set to `password`. */
	export let revealButtonElement: HTMLButtonElement = null;

	const dispatch = createEventDispatcher();
	const forwardEvents = createEventForwarder(get_current_component(), [
		"clear",
		"search",
		"reveal",
		"outermousedown"
	]);

	function handleClear(event) {
		dispatch("clear", event);
		inputElement.focus();
		value = "";
	}

	function handleSearch(event) {
		dispatch("search", event);
		inputElement.focus();
	}

	function handleReveal(event) {
		inputElement.focus();
		inputElement.setAttribute("type", "text");
		dispatch("reveal", event);
		let revealButtonMouseDown = true;
		const hidePassword = () => {
			if (!revealButtonMouseDown) return;
			inputElement.focus();
			revealButtonMouseDown = false;
			inputElement.setAttribute("type", "password");
			window.removeEventListener("mouseup", hidePassword);
		};
		window.addEventListener("mouseup", hidePassword);
	}

	const inputProps = {
		class: "text-box",
		disabled: disabled || undefined,
		readonly: readonly || undefined,
		placeholder: placeholder || undefined,
		...$$restProps
	};
</script>

<!--
@component
The TextBox control lets a user type text into an app. The text displays on the screen in a simple, plaintext format on a single line. It additionally comes with a set of buttons which allow users to perform specialized actions on the text, such as showing a password or clearing the TextBox's contents. [Docs](https://fluent-svelte.vercel.app/docs/components/texbox)
- Usage:
    ```tsx
    <TextBox placeholder="Enter your name." />
    ```
-->
<div
	class="text-box-container {className}"
	class:disabled
	bind:this={containerElement}
	use:externalMouseEvents={{ type: "mousedown" }}
	on:outermousedown
>
	<!-- Dirty workaround for the fact that svelte can't handle two-way binding when the input type is dynamic. -->
	<!-- prettier-ignore -->
	{#if type === "text"}
		<input type="text" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "number"}
		<input type="number" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "search"}
		<input type="search" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "password"}
		<input type="password" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "email"}
		<input type="email" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "tel"}
		<input type="tel" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "url"}
		<input type="url" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "date"}
		<input type="date" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "datetime-local"}
		<input type="datetime-local" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "month"}
		<input type="month" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "time"}
		<input type="time" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
		{:else if type === "week"}
		<input type="week" bind:value bind:this={inputElement} use:forwardEvents {...inputProps} />
	{/if}
	<div class="text-box-underline" />
	<div class="text-box-buttons" bind:this={buttonsContainerElement}>
		{#if !disabled}
			{#if clearButton && value && !readonly}
				<TextBoxButton
					class="text-box-clear-button"
					aria-label="Clear value"
					on:click={handleClear}
					bind:element={clearButtonElement}
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
							d="M2.08859 2.21569L2.14645 2.14645C2.32001 1.97288 2.58944 1.9536 2.78431 2.08859L2.85355 2.14645L6 5.293L9.14645 2.14645C9.34171 1.95118 9.65829 1.95118 9.85355 2.14645C10.0488 2.34171 10.0488 2.65829 9.85355 2.85355L6.707 6L9.85355 9.14645C10.0271 9.32001 10.0464 9.58944 9.91141 9.78431L9.85355 9.85355C9.67999 10.0271 9.41056 10.0464 9.21569 9.91141L9.14645 9.85355L6 6.707L2.85355 9.85355C2.65829 10.0488 2.34171 10.0488 2.14645 9.85355C1.95118 9.65829 1.95118 9.34171 2.14645 9.14645L5.293 6L2.14645 2.85355C1.97288 2.67999 1.9536 2.41056 2.08859 2.21569L2.14645 2.14645L2.08859 2.21569Z"
						/>
					</svg>
				</TextBoxButton>
			{/if}
			{#if type === "search" && searchButton}
				<TextBoxButton
					aria-label="Search"
					on:click={handleSearch}
					bind:element={searchButtonElement}
				>
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 12 12"
					>
						<path
							d="M5.00038 1C2.79103 1 1 2.7909 1 5.00008C1 7.20927 2.79103 9.00017 5.00038 9.00017C5.92463 9.00017 6.77568 8.68675 7.45302 8.1604L10.1464 10.8536C10.3416 11.0488 10.6583 11.0488 10.8535 10.8536C11.0488 10.6583 11.0488 10.3417 10.8535 10.1464L8.16028 7.45337C8.68705 6.77595 9.00075 5.92465 9.00075 5.00008C9.00075 2.7909 7.20972 1 5.00038 1ZM2.00009 5.00008C2.00009 3.34319 3.34337 2.00002 5.00038 2.00002C6.65739 2.00002 8.00066 3.34319 8.00066 5.00008C8.00066 6.65697 6.65739 8.00015 5.00038 8.00015C3.34337 8.00015 2.00009 6.65697 2.00009 5.00008Z"
							fill="currentColor"
						/>
					</svg>
				</TextBoxButton>
			{/if}
			{#if type === "password" && value && revealButton}
				<TextBoxButton
					aria-label="Reveal password"
					on:mousedown={handleReveal}
					bind:element={revealButtonElement}
				>
					<svg
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="10"
						height="10"
						viewBox="0 171 1024 683"
					>
						<path
							d="M0,554.5C0,550.833 0.5,547.167 1.5,543.5C11.5,505.833 25.75,470.417 44.25,437.25C62.75,404.083 84.5833,373.667 109.75,346C134.917,318.333 162.75,293.667 193.25,272C223.75,250.333 256.25,231.917 290.75,216.75C325.25,201.583 361.167,190.083 398.5,182.25C435.833,174.417 473.667,170.5 512,170.5C550,170.5 587.583,174.417 624.75,182.25C661.917,190.083 697.75,201.5 732.25,216.5C766.75,231.5 799.417,249.917 830.25,271.75C861.083,293.583 889.083,318.25 914.25,345.75C939.417,373.25 961.25,403.5 979.75,436.5C998.25,469.5 1012.5,504.833 1022.5,542.5C1023.5,546.167 1024,550 1024,554C1024,566 1019.92,576.083 1011.75,584.25C1003.58,592.417 993.5,596.5 981.5,596.5C971.5,596.5 962.917,593.667 955.75,588C948.583,582.333 943.333,574.833 940,565.5C937,556.167 934.083,547.5 931.25,539.5C928.417,531.5 925.5,523.583 922.5,515.75C919.5,507.917 916.167,500.167 912.5,492.5C908.833,484.833 904.333,476.667 899,468C879.333,435 855.583,405.417 827.75,379.25C799.917,353.083 769.333,330.917 736,312.75C702.667,294.583 667.417,280.583 630.25,270.75C593.083,260.917 555.5,256 517.5,256L506.5,256C468.5,256 430.917,260.917 393.75,270.75C356.583,280.583 321.333,294.667 288,313C254.667,331.333 224,353.583 196,379.75C168,405.917 144.333,435.5 125,468.5C119.667,477.167 115.167,485.417 111.5,493.25C107.833,501.083 104.5,508.833 101.5,516.5C98.5,524.167 95.5833,532 92.75,540C89.9167,548 87,556.667 84,566C80.6667,575.333 75.5,582.917 68.5,588.75C61.5,594.583 52.8333,597.5 42.5,597.5C36.8333,597.5 31.4167,596.333 26.25,594C21.0833,591.667 16.5833,588.583 12.75,584.75C8.91667,580.917 5.83333,576.417 3.5,571.25C1.16667,566.083 0,560.5 0,554.5ZM256,597.5L256,592.5C256,557.833 262.917,525.25 276.75,494.75C290.583,464.25 309.25,437.667 332.75,415C356.25,392.333 383.417,374.417 414.25,361.25C445.083,348.083 477.667,341.5 512,341.5C547.333,341.5 580.583,348.167 611.75,361.5C642.917,374.833 670.083,393.083 693.25,416.25C716.417,439.417 734.667,466.583 748,497.75C761.333,528.917 768,562.167 768,597.5C768,632.833 761.333,666.083 748,697.25C734.667,728.417 716.417,755.583 693.25,778.75C670.083,801.917 642.917,820.167 611.75,833.5C580.583,846.833 547.333,853.5 512,853.5C476.667,853.5 443.417,846.833 412.25,833.5C381.083,820.167 353.917,801.917 330.75,778.75C307.583,755.583 289.333,728.417 276,697.25C262.667,666.083 256,632.833 256,597.5ZM682.5,597.5L682.5,594C682.5,571 677.917,549.333 668.75,529C659.583,508.667 647.167,490.917 631.5,475.75C615.833,460.583 597.667,448.583 577,439.75C556.333,430.917 534.667,426.5 512,426.5C488.333,426.5 466.167,431 445.5,440C424.833,449 406.833,461.25 391.5,476.75C376.167,492.25 364,510.417 355,531.25C346,552.083 341.5,574.167 341.5,597.5C341.5,621.167 346,643.333 355,664C364,684.667 376.167,702.667 391.5,718C406.833,733.333 424.833,745.5 445.5,754.5C466.167,763.5 488.333,768 512,768C535.333,768 557.417,763.5 578.25,754.5C599.083,745.5 617.167,733.333 632.5,718C647.833,702.667 660,684.667 669,664C678,643.333 682.5,621.167 682.5,597.5Z"
							fill="currentColor"
						/>
					</svg>
				</TextBoxButton>
			{/if}
		{/if}
		<slot name="buttons" {value} />
	</div>
	<slot />
</div>

<style lang="scss">
	@use "./TextBox";
</style>
