<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { fade, scale } from "svelte/transition";
	import { circOut } from "svelte/easing";
	import { uid, focusTrap, getCSSDuration, createEventForwarder } from "$lib/internal";

	import TextBlock from "../TextBlock/TextBlock.svelte";

	/** Determines whether the dialog is open or not. */
	export let open: boolean = false;

	/** Title text displayed as the dialog header. */
	export let title: string = "";

	/** Specifies the visual size of the dialog. */
	export let size: "standard" | "max" | "min" = "standard";

	/** Determines whether the dialog can be conventially closed using the escape key. */
	export let closable = true;

	/** Determines the node the dialog should be appended to. */
	export let append: HTMLElement = undefined;

	/** Determines if the dialog should darken the contents behind it. */
	export let darken = true;

	/** Determines if keyboard focus should be locked to the dialog's contents. */
	export let trapFocus = true;

	/** Specifies a custom class name for the dialog. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the inner dialog element. */
	export let element: HTMLElement = null;

	/** Obtains a bound DOM reference to the dialog's backdrop container element. */
	export let backdropElement: HTMLElement = null;

	/** Obtains a bound DOM reference to the dialog's inner body element. */
	export let bodyElement: HTMLElement = null;

	/** Obtains a bound DOM reference to the dialog's footer element. */
	export let footerElement: HTMLElement = null;

	const forwardEvents = createEventForwarder(get_current_component(), [
		"open",
		"close",
		"backdropclick",
		"backdropmousedown"
	]);
	const dispatch = createEventDispatcher();
	const titleId = uid("fds-dialog-title-");
	const bodyId = uid("fds-dialog-body-");

	$: if (!open) dispatch("close");
	$: _focusTrap = trapFocus ? focusTrap : () => {};

	function mountDialog(node: HTMLDivElement) {
		dispatch("open");
		if (append) append.appendChild(node);
		node.focus();
	}

	function close() {
		open = false;
	}

	function handleEscapeKey({ key }: KeyboardEvent) {
		if (key === "Escape" && open && closable) close();
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

{#if open}
	<div
		class="content-dialog-smoke"
		class:darken
		on:click|self={e => dispatch("backdropclick", e)}
		on:mousedown|self={e => dispatch("backdropmousedown", e)}
		transition:fade|local={{ duration: getCSSDuration("--fds-control-faster-duration") }}
		use:mountDialog
		use:_focusTrap
		bind:this={backdropElement}
	>
		<div
			use:forwardEvents
			class="content-dialog size-{size} {className}"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title && titleId}
			aria-describedby={bodyId}
			bind:this={element}
			transition:scale|local={{
				duration: getCSSDuration("--fds-control-fast-duration"),
				start: 1.05,
				easing: circOut
			}}
			{...$$restProps}
		>
			<div class="content-dialog-body" id={bodyId} bind:this={bodyElement}>
				{#if title}
					<TextBlock variant="subtitle" class="content-dialog-title" id={titleId}>
						{title}
					</TextBlock>
				{/if}
				<slot />
			</div>
			{#if $$slots.footer}
				<footer class="content-dialog-footer" bind:this={footerElement}>
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
