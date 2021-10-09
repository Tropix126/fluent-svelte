<script>
	import * as Fluent from "$lib";
	import "$lib/theme.css";

	let value = Math.floor(Math.random() * 101);

	let normalRadioGroup = 0;
	let disabledRadioGroup = 0;
</script>

<h1>fluent-svelte test page</h1>
<p>Made with <a href="https://kit.svelte.dev">SvelteKit</a></p>

<h2>Buttons</h2>
<div>
	<Fluent.Button>Button</Fluent.Button>
	<Fluent.Button variant="accent">Button</Fluent.Button>
	<Fluent.Button variant="hyperlink">Button</Fluent.Button>
</div>
<div>
	<Fluent.Button disabled>Button</Fluent.Button>
	<Fluent.Button disabled variant="accent">Button</Fluent.Button>
	<Fluent.Button disabled variant="hyperlink">Button</Fluent.Button>
</div>

<h2>Checkboxes</h2>
<div>
	<Fluent.Checkbox>Checkbox</Fluent.Checkbox>
	<Fluent.Checkbox checked>Checkbox</Fluent.Checkbox>
	<Fluent.Checkbox indeterminate checked>Checkbox</Fluent.Checkbox>
</div>
<div>
	<Fluent.Checkbox disabled>Checkbox</Fluent.Checkbox>
	<Fluent.Checkbox disabled checked>Checkbox</Fluent.Checkbox>
	<Fluent.Checkbox disabled indeterminate checked>Checkbox</Fluent.Checkbox>
</div>

<h2>Switches</h2>
<div>
	<Fluent.ToggleSwitch>Switch</Fluent.ToggleSwitch>
	<Fluent.ToggleSwitch checked>Switch</Fluent.ToggleSwitch>
</div>
<div>
	<Fluent.ToggleSwitch disabled>Switch</Fluent.ToggleSwitch>
	<Fluent.ToggleSwitch disabled checked>Switch</Fluent.ToggleSwitch>
</div>

<h2>Radio Button</h2>
<div>
	<Fluent.RadioButton bind:group={normalRadioGroup} value={0}>Switch</Fluent.RadioButton>
	<Fluent.RadioButton bind:group={normalRadioGroup} value={1}>Switch</Fluent.RadioButton>
</div>
<div>
	<Fluent.RadioButton disabled bind:group={disabledRadioGroup} value={0}
		>Switch</Fluent.RadioButton
	>
	<Fluent.RadioButton disabled bind:group={disabledRadioGroup} value={1}
		>Switch</Fluent.RadioButton
	>
</div>

<h2>ComboBox</h2>
<Fluent.ComboBox
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

<Fluent.ComboBox
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
	<Fluent.ProgressRing />
	<Fluent.ProgressRing bind:value />
	<Fluent.Button on:click={() => (value = Math.floor(Math.random() * 101))}
		>Randomize Value</Fluent.Button
	>
</div>
<div>
	<Fluent.ProgressRing size={60} />
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
		margin-bottom: 12px;
	}
</style>
