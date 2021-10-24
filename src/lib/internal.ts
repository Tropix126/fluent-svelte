export { default as ComboBoxItem } from "./ComboBox/ComboBoxItem.svelte";
export { default as FlyoutSurface } from "./Flyout/FlyoutSurface.svelte";
export { default as TextBoxButton } from "./TextBox/TextBoxButton.svelte";
export { default as TooltipSurface } from "./Tooltip/TooltipSurface.svelte";

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
