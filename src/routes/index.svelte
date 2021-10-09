<script>
	// this doesn't use the Fluent namespace because WebStorm
	import { Button, Checkbox, ProgressRing, ToggleSwitch, RadioButton, ComboBox } from "$lib";
	import "$lib/theme.css";

	let value = Math.floor(Math.random() * 101);

	let normalRadioGroup = 0;
	let disabledRadioGroup = 0;
</script>

<h1>fluent-svelte test page</h1>
<p>Made with <a href="https://kit.svelte.dev">SvelteKit</a></p>

<h2>Buttons</h2>
<div>
	<Button>Button</Button>
	<Button variant="accent">Button</Button>
	<Button variant="hyperlink">Button</Button>
</div>
<div>
	<Button disabled>Button</Button>
	<Button disabled variant="accent">Button</Button>
	<Button disabled variant="hyperlink">Button</Button>
</div>

<h2>Checkboxes</h2>
<div>
	<Checkbox>Checkbox</Checkbox>
	<Checkbox checked>Checkbox</Checkbox>
	<Checkbox checked indeterminate>Checkbox</Checkbox>
</div>
<div>
	<Checkbox disabled>Checkbox</Checkbox>
	<Checkbox checked disabled>Checkbox</Checkbox>
	<Checkbox checked disabled indeterminate>Checkbox</Checkbox>
</div>

<h2>Switches</h2>
<div>
	<ToggleSwitch>Switch</ToggleSwitch>
	<ToggleSwitch checked>Switch</ToggleSwitch>
</div>
<div>
	<ToggleSwitch disabled>Switch</ToggleSwitch>
	<ToggleSwitch checked disabled>Switch</ToggleSwitch>
</div>

<h2>Radio Button</h2>
<div>
	<RadioButton bind:group={normalRadioGroup} value={0}>Switch</RadioButton>
	<RadioButton bind:group={normalRadioGroup} value={1}>Switch</RadioButton>
</div>
<div>
	<RadioButton disabled bind:group={disabledRadioGroup} value={0}>Switch</RadioButton>
	<RadioButton disabled bind:group={disabledRadioGroup} value={1}>Switch</RadioButton>
</div>

<h2>ComboBox</h2>
<ComboBox
	placeholder="ComboBox"
	items={[
		{
			name: "Item 1",
			value: 0
		},
		{
			name: "Item 2",
			value: 1
		},
		{
			name: "Item 3",
			value: 2
		},
		{
			name: "Item 4",
			value: 3
		}
	]}
/>

<ComboBox
	placeholder="ComboBox"
	disabled
	items={[
		{
			name: "Item 1",
			value: 0
		},
		{
			name: "Item 2",
			value: 1
		},
		{
			name: "Item 3",
			value: 2
		},
		{
			name: "Item 4",
			value: 3
		}
	]}
/>

<h2>Progress Ring</h2>
<div>
	<ProgressRing />
	<ProgressRing bind:value />
	<Button on:click={() => (value = Math.floor(Math.random() * 101))}>Randomize Value</Button>
</div>
<div>
	<ProgressRing size={60} />
</div>

<style lang="scss">
	@use "src/lib/mixins" as *;

	:global(body) {
		font-family: var(--font-family-text);
		background-color: var(--solid-background-base);
		color: var(--text-primary);
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: var(--font-family-display);
		font-weight: 600;
	}

	div {
		@include flex($gap: 12px);
		margin-block-end: 12px;
	}
</style>
