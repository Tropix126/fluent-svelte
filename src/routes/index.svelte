<script>
	// this doesn't use the Fluent namespace because WebStorm
	import {
		Button,
		Checkbox,
		ProgressRing,
		ToggleSwitch,
		RadioButton,
		ComboBox,
		InfoBadge,
		Flyout,
		InfoBar,
		TextBox
	} from "$lib";
	import "$lib/theme.css";

	let progressRingValue = Math.floor(Math.random() * 101);

	let normalRadioGroup = 0;
	let disabledRadioGroup = 0;

	let nonClosableFlyoutOpen = false;
	let flyoutTopOpen = false;
	let flyoutBottomOpen = false;
	let flyoutLeftOpen = false;
	let flyoutRightOpen = false;

	let value;
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
	editable
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
	<ProgressRing bind:value={progressRingValue} />
	<Button on:click={() => (value = Math.floor(Math.random() * 101))}>Randomize Value</Button>
</div>
<div>
	<ProgressRing size={60} />
</div>

<h2>InfoBadge</h2>
<div>
	<InfoBadge severity="attention" />
	<InfoBadge severity="success" />
	<InfoBadge severity="caution" />
	<InfoBadge severity="critical" />
	<InfoBadge severity="information" />
</div>
<div>
	<InfoBadge severity="attention">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="success">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="caution">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="critical">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="information">{Math.floor(Math.random() * 10)}</InfoBadge>
</div>

<h2>Flyout</h2>
<div style="display: flex; justify-content: center;">
	<Flyout closable={false} bind:open={nonClosableFlyoutOpen}>
		<Button variant="accent">Non-closasble Flyout</Button>
		<svelte:fragment slot="flyout">You can't close me >:)</svelte:fragment>
	</Flyout>
</div>
<div style="display: flex; justify-content: center; align-items: center;">
	<Flyout position="top" bind:open={flyoutTopOpen}>
		<Button variant="accent">Top Flyout</Button>
		<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
	</Flyout>
	<Flyout position="bottom" bind:open={flyoutBottomOpen}>
		<Button variant="accent">Bottom Flyout</Button>
		<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
	</Flyout>
	<Flyout position="left" bind:open={flyoutLeftOpen}>
		<Button variant="accent">Left Flyout</Button>
		<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
	</Flyout>
	<Flyout position="right" bind:open={flyoutRightOpen}>
		<Button variant="accent">Right Flyout</Button>
		<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
	</Flyout>
</div>

<h2>Info Bar</h2>
<div style="flex-direction: column">
	<InfoBar
		closable={false}
		severity="information"
		description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
	>
		Info
		<svelte:fragment slot="action">
			<Button variant="accent">Action</Button>
		</svelte:fragment>
	</InfoBar>
	<InfoBar severity="attention" description="Something is happening.">
		Attention
		<svelte:fragment slot="action">
			<Button>Action</Button>
		</svelte:fragment>
	</InfoBar>
	<InfoBar severity="success" description="Nothing bad happened!">Success</InfoBar>
	<InfoBar severity="caution" description="Don't do this or something bad will happen."
		>Warning</InfoBar
	>
	<InfoBar severity="critical" description="Something bad happened :(">Error</InfoBar>
</div>

<h2>Text Box</h2>
<div>
	<TextBox bind:value placeholder="TextBox" />
	<TextBox disabled placeholder="TextBox" />
	<TextBox type="password" placeholder="TextBox" />
	<TextBox type="search" placeholder="TextBox" />
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
