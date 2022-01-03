<script lang="ts">
	import { setContext } from "svelte";

	import { isTabbable } from "tabbable";

	/** Specifies a custom class name for the bar. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the bar's outer container element. */
	export let element: HTMLUListElement = null;

	setContext("sideNavigation", (event, activeItem: HTMLElement) => {
		const { key } = event;

		let tabOrder: HTMLElement[] = [];

		for (const child of Array.from(element.children)) {
			if (isTabbable(child)) tabOrder.push(<HTMLElement>child);
		}

		const activeIndex = tabOrder.indexOf(activeItem);

		if (tabOrder.length < 0) return;
		if (key === "ArrowLeft" || key === "ArrowRight") event.preventDefault();

		if (key === "ArrowLeft") {
			if (tabOrder[0] === activeItem) {
				tabOrder[tabOrder.length - 1].focus();
			} else if (tabOrder.includes(<HTMLElement>activeItem)) {
				tabOrder[activeIndex - 1].focus();
			}
		} else if (key === "ArrowRight") {
			if (tabOrder[tabOrder.length - 1] === activeItem) {
				tabOrder[0].focus();
			} else if (tabOrder.includes(<HTMLElement>activeItem)) {
				tabOrder[activeIndex + 1].focus();
			}
		}
	});
</script>

<ul class="menu-bar {className}" role="menubar" bind:this={element} {...$$restProps}>
	<slot />
</ul>

<style lang="scss">
	@use "./MenuBar";
</style>
