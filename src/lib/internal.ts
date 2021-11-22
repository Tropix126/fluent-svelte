import { createFocusTrap } from "focus-trap";

export { default as ComboBoxItem } from "./ComboBox/ComboBoxItem.svelte";
export { default as FlyoutSurface } from "./Flyout/FlyoutSurface.svelte";
export { default as TextBoxButton } from "./TextBox/TextBoxButton.svelte";
export { default as TooltipSurface } from "./Tooltip/TooltipSurface.svelte";

// Svelte action for handling outer mouse events
export function externalMouseEvents(node: HTMLElement, options = { type: "click" }) {
	const { type } = options;
	const handleEvent = (event: MouseEvent) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent(`outer${type}`, {
					detail: event
				})
			);
		}
	};

	document.addEventListener(type, handleEvent, true);

	return {
		destroy() {
			document.removeEventListener(type, handleEvent, true);
		}
	};
}

// Basic wrapper action around focus-trap
export function focusTrap(node: HTMLElement, options) {
	const trap = createFocusTrap(node, options);
	trap.activate();

	return {
		destroy() {
			trap.deactivate();
		}
	}
}

// ID generator for handling WAI-ARIA attributes
export function uid(prefix: string) {
	return (
		prefix +
		String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
		Math.random().toString(16).slice(2) +
		Date.now().toString(16).slice(4)
	);
}
