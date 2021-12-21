import { tabbable } from "tabbable";
import { createFocusTrap } from "focus-trap";
import type { Options as FocusTrapOptions } from "focus-trap";

export { default as ComboBoxItem } from "./ComboBox/ComboBoxItem.svelte";
export { default as FlyoutSurface } from "./Flyout/FlyoutSurface.svelte";
export { default as TextBoxButton } from "./TextBox/TextBoxButton.svelte";
export { default as TooltipSurface } from "./Tooltip/TooltipSurface.svelte";
export { default as MenuFlyoutSurface } from "./MenuFlyout/MenuFlyoutSurface.svelte";

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
export function focusTrap(node: HTMLElement, options?: FocusTrapOptions) {
	const trap = createFocusTrap(node, (options = { fallbackFocus: node }));
	trap.activate();

	return {
		destroy() {
			trap.deactivate();
		}
	};
}

// ID generator for handling WAI-ARIA related attributes
export function uid(prefix: string) {
	return (
		prefix +
		String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
		Math.random().toString(16).slice(2) +
		performance.now().toString(16).slice(4)
	);
}

// Controls the focus of a list of elements by using the arrow keys
export function arrowNavigation(node: HTMLElement, options = { preventTab: false }) {
	const handleKeyDown = (event: KeyboardEvent) => {
		const { key } = event;
		const { activeElement } = document;
		const tabOrder = <HTMLElement[]>tabbable(node);
		const activeIndex = tabOrder.indexOf(document.activeElement as HTMLElement);

		if (tabOrder.length < 0) return;
		if (key === "ArrowUp" || key === "ArrowDown" || (key === "Tab" && options.preventTab))
			event.preventDefault();

		if (key === "ArrowUp") {
			if (tabOrder[0] === activeElement) {
				tabOrder[tabOrder.length - 1].focus();
			} else if (tabOrder.includes(<HTMLElement>activeElement)) {
				tabOrder[activeIndex - 1].focus();
			}
		} else if (key === "ArrowDown") {
			if (tabOrder[tabOrder.length - 1] === activeElement) {
				tabOrder[0].focus();
			} else if (tabOrder.includes(<HTMLElement>activeElement)) {
				tabOrder[activeIndex + 1].focus();
			}
		}
	};

	window.addEventListener("keydown", handleKeyDown);

	return {
		destroy: () => window.removeEventListener("keydown", handleKeyDown)
	};
}

// Returns a number representing the duration of a specified CSS custom property in ms
export function getCSSDuration(property) {
	const duration = window.getComputedStyle(document.documentElement).getPropertyValue(property);

	return parseFloat(duration) * (/\ds$/.test(duration) ? 1000 : 1) || 0;
}
