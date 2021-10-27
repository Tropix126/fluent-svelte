<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import InfoBadge from "../InfoBadge/InfoBadge.svelte";

	const dispatch = createEventDispatcher();

	/** Determines whether the bar is open (rendered) */
	export let open = true;

	/** Determines whether the close button is used or not */
	export let closable = true;

	/** Indicates the severity color of the bar */
	export let severity: "information" | "success" | "caution" | "critical" | "attention" =
		"information";

	/** Specifies the description text shown in the bar */
	export let description = "";

	/** Specifies a custom class name for the bar */
	let className = "";
	export { className as class };

	let wrapped = false;
	let action: HTMLDivElement;
	let element: HTMLDivElement;
	let clientHeight = 0;

	export const getElement = () => element;

	$: if (action && description && clientHeight) wrapped = action.offsetTop > 0;

	function handleClose(event) {
		open = false;
		dispatch("close", event);
	}
</script>

{#if open}
	<div
		bind:clientHeight
		bind:this={element}
		class="info-bar severity-{severity} {className ?? ''}"
		role="alert"
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
		<div class="info-bar-icon">
			<slot name="icon">
				<InfoBadge {severity} />
			</slot>
		</div>
		<div class="info-bar-content" class:action-wrapped={wrapped}>
			<h5>
				<slot />
			</h5>
			<p>{description}</p>
			{#if $$slots.action}
				<div class="info-bar-action" bind:this={action}>
					<slot name="action" />
				</div>
			{/if}
		</div>
		{#if closable}
			<button
				class="info-bar-close-button"
				type="button"
				aria-label="Close"
				on:click={handleClose}
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 1024 1024"
				>
					<path
						fill="currentColor"
						d="M512,584.5L87.5,1009C77.5,1019 65.5,1024 51.5,1024C36.8333,1024 24.5833,1019.08 14.75,1009.25C4.91667,999.417 0,987.167 0,972.5C0,958.5 5,946.5 15,936.5L439.5,512L15,87.5C5,77.5 0,65.3334 0,51C0,44 1.33333,37.3334 4,31C6.66667,24.6667 10.3333,19.25 15,14.75C19.6667,10.25 25.1667,6.66669 31.5,4C37.8333,1.33337 44.5,0 51.5,0C65.5,0 77.5,5 87.5,15L512,439.5L936.5,15C946.5,5 958.667,0 973,0C980,0 986.583,1.33337 992.75,4C998.917,6.66669 1004.33,10.3334 1009,15C1013.67,19.6667 1017.33,25.0834 1020,31.25C1022.67,37.4167 1024,44 1024,51C1024,65.3334 1019,77.5 1009,87.5L584.5,512L1009,936.5C1019,946.5 1024,958.5 1024,972.5C1024,979.5 1022.67,986.167 1020,992.5C1017.33,998.833 1013.75,1004.33 1009.25,1009C1004.75,1013.67 999.333,1017.33 993,1020C986.667,1022.67 980,1024 973,1024C958.667,1024 946.5,1019 936.5,1009Z"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use "./InfoBar";
</style>
