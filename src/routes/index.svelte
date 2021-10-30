<script>
	// this doesn't use the Fluent namespace because WebStorm
	import {
		Button,
		Checkbox,
		ComboBox,
		ContentDialog,
		Flyout,
		InfoBadge,
		InfoBar,
		NumberBox,
		PersonPicture,
		ProgressRing,
		RadioButton,
		Rating,
		TextBox,
		ToggleSwitch,
		Tooltip
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

	let dialogOpen = false;
	let dialogResult = "";

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
	<RadioButton bind:group={normalRadioGroup} value={0}>Option</RadioButton>
	<RadioButton bind:group={normalRadioGroup} value={1}>Option</RadioButton>
</div>
<div>
	<RadioButton disabled bind:group={disabledRadioGroup} value={0}>Option</RadioButton>
	<RadioButton disabled bind:group={disabledRadioGroup} value={1}>Option</RadioButton>
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
	<ProgressRing bind:value={progressRingValue} />
	<Button on:click={() => progressRingValue = Math.floor(Math.random() * 101)}>
		Randomize Value
	</Button>
</div>
<div>
	<ProgressRing size={60} />
</div>

<h2>Rating</h2>
<div>
	<Rating id="big-rating" value={4}>Rating</Rating>
	<Rating id="small-rating" max={3} value={1} variant="user">Rating</Rating>
</div>
<div>
	<Rating disabled id="big-rating-disabled" value={4}>Rating</Rating>
	<Rating disabled id="small-rating-disabled" max={3} value={1} variant="user">Rating</Rating>
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

		<Button slot="action" variant="accent">Action</Button>
	</InfoBar>
	<InfoBar severity="attention" description="Something is happening.">
		Attention

		<Button slot="action">Action</Button>
	</InfoBar>
	<InfoBar severity="success" description="Nothing bad happened!">Success</InfoBar>
	<InfoBar description="Don't do this or something bad will happen." severity="caution">
		Warning
	</InfoBar>
	<InfoBar severity="critical" description="Something bad happened :(">Error</InfoBar>
</div>

<h2>Text Box</h2>
<div>
	<TextBox bind:value placeholder="TextBox" />
	<TextBox disabled placeholder="TextBox" />
	<TextBox type="password" placeholder="TextBox" />
	<TextBox type="search" placeholder="TextBox" />
</div>

<h2>Number Box</h2>
<div>
	<NumberBox value={1} min={0} max={10} placeholder="NumberBox" />
	<NumberBox size={50} placeholder="NumberBox" inline />
</div>

<h2>Tooltip</h2>
<div>
	<Tooltip text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
	<Tooltip followCursor text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
	<Tooltip alignment="top" text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
	<Tooltip alignment="bottom" text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
	<Tooltip alignment="left" text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
	<Tooltip alignment="right" text="hiii">
		<div class="tooltip-div">Hover for tooltip</div>
	</Tooltip>
</div>

<h2>Person Picture</h2>
<div>
	<PersonPicture size={24}>
		{Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2)}
	</PersonPicture>
	<PersonPicture src="https://thispersondoesnotexist.com/image" size={32}>
		{Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2)}
	</PersonPicture>
	<PersonPicture size={48}>
		{Math.random().toString(36).replace(/[^a-z]+/g, "").toUpperCase().substr(0, 2)}

		<InfoBadge slot="badge">1</InfoBadge>
	</PersonPicture>
	<PersonPicture alt="a a a a" size={96} />
</div>

<h2>Dialog</h2>
<div>
	<Button on:click={() => dialogOpen = true}>Open</Button>
	<ContentDialog bind:open={dialogOpen} title="Add new alarm">
		<div style="display: flex; flex-direction: column; gap: 12px; margin: 0;">
			<TextBox placeholder="Alarm name" />
			<ComboBox
				value={1}
				items={[
					{
						name: "Disabled",
						value: 0
					},
					{
						name: "10 minutes",
						value: 1
					},
					{
						name: "20 minutes",
						value: 2
					},
					{
						name: "30 minutes",
						value: 3
					},
					{
						name: "1 hour",
						value: 4
					}
				]}
			/>
			<Checkbox>Repeat alarm</Checkbox>
		</div>
		<svelte:fragment slot="footer">
			<Button
				variant="accent"
				on:click={() => {
					dialogOpen = false;
					dialogResult = "Save";
				}}>
				Save
			</Button>
			<Button
				on:click={() => {
					dialogOpen = false;
					dialogResult = "Cancel";
				}}>
				Cancel
			</Button>
		</svelte:fragment>
	</ContentDialog>
</div>

<p>Result: {dialogResult}</p>

<style lang="scss">
	@use "src/lib/mixins" as *;

	:global {
		body {
			font-family: var(--font-family-text);
			background-color: var(--solid-background-base);
			color: var(--text-primary);
			margin: 24px;
		}

		h1, h2, h3, h4, h5, h6 {
			font-family: var(--font-family-display);
			font-weight: 600;
		}
	}

	a {
		color: var(--accent-default);
	}

	div {
		@include flex($gap: 12px);
		margin-block-end: 12px;
	}

	.tooltip-div {
		@include control-typography;
		display: grid;
		align-content: center;
		width: 80px;
		height: 80px;
		margin: 0;
		border: 2px dotted var(--fds-divider-stroke-default);
		text-align: center;
	}
</style>
