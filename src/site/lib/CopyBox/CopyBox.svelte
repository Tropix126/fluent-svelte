<script>
	import { TextBox } from "$lib";
	import { TextBoxButton } from "$lib";

	import Clipboard from "@fluentui/svg-icons/icons/clipboard_16_regular.svg?raw";

	export let value = "";
</script>

<TextBox class="copy-box" readonly {value} {...$$restProps}>
	<svelte:fragment slot="buttons">
		<TextBoxButton on:click={() => navigator.clipboard.writeText(value)}>
			{@html Clipboard}
		</TextBoxButton>
		<slot name="buttons" />
	</svelte:fragment>
</TextBox>

<style lang="scss">
	:global(.copy-box input) {
		padding: 8px 12px;
	}
</style>
