<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade, scale } from "svelte/transition";
	import { uid } from "../internal";

	import BezierEasing from "bezier-easing";
	import TextBlock from "../TextBlock/TextBlock.svelte";

	/** Determines whether the dialog is open or not */
	export let open: boolean = false;

	/** Title text displayed as the dialog header */
	export let title: string = undefined;

	/** Specifies the visual size of the dialog */
	export let size: "standard" | "max" | "min" = "standard";

	/** Determines whether the dialog can be conventially closed using the escape key. */
	export let closable = true;

	/** Determines the node the dialog should be appended to */
	export let append: HTMLElement = undefined;

	/** Determines if the dialog should darken the contents behind it */
	export let darken = true;

	const dispatch = createEventDispatcher();

	let className = "";
	export { className as class };

	let element: HTMLElement;

	export const getElement = () => element;

	const titleId = uid("fds-dialog-title-");
	const bodyId = uid("fds-dialog-body-");

	function mountDialog(node: HTMLDivElement) {
		if (append) append.appendChild(node);
		node.focus();
		dispatch("open");
	}

	function close() {
		open = false;
		dispatch("close");
	}

	function handleEscapeKey(e: KeyboardEvent) {
		if (e.key === "Escape" && open && closable) close();
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

{#if open}
	<div
		class="content-dialog-smoke"
		class:darken
		on:click={e => dispatch("backdropclick", e)}
		on:mousedown={e => dispatch("backdropmousedown", e)}
		transition:fade={{ duration: 83 }}
		use:mountDialog
	>
		<div
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
			class="content-dialog size-{size} {className ?? ''}"
			bind:this={element}
			transition:scale={{ duration: 167, start: 1.05, easing: BezierEasing(0, 0, 0, 1) }}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={bodyId}
			{...$$restProps}
		>
			<div class="content-dialog-body" id={bodyId}>
				{#if title}
					<TextBlock variant="subtitle" class="content-dialog-title" id={titleId}>
						{title}
					</TextBlock>
				{/if}
				<slot />
			</div>
			{#if $$slots.footer}
				<footer class="content-dialog-footer">
					<slot name="footer" />
				</footer>
			{/if}
		</div>
		<slot name="outer" />
	</div>
{/if}

<style lang="scss">
	@use "./ContentDialog";
</style>
