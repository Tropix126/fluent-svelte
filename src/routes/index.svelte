<script>
	// this doesn't use the Fluent namespace because WebStorm
	import {
		Button,
		Checkbox,
		ProgressRing,
		ProgressBar,
		ToggleSwitch,
		RadioButton,
		ComboBox,
		InfoBadge,
		Slider,
		Flyout,
		InfoBar,
		TextBox,
		NumberBox,
		PersonPicture,
		Tooltip,
		ContentDialog
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
<div class="showcase-group">
	<Button>Button</Button>
	<Button variant="accent">Button</Button>
	<Button variant="hyperlink">Button</Button>
</div>
<div class="showcase-group">
	<Button disabled>Button</Button>
	<Button disabled variant="accent">Button</Button>
	<Button disabled variant="hyperlink">Button</Button>
</div>

<h2>Checkboxes</h2>
<div class="showcase-group">
	<Checkbox>Checkbox</Checkbox>
	<Checkbox checked>Checkbox</Checkbox>
	<Checkbox checked indeterminate>Checkbox</Checkbox>
</div>
<div class="showcase-group">
	<Checkbox disabled>Checkbox</Checkbox>
	<Checkbox checked disabled>Checkbox</Checkbox>
	<Checkbox checked disabled indeterminate>Checkbox</Checkbox>
</div>

<h2>Switches</h2>
<div class="showcase-group">
	<ToggleSwitch>Switch</ToggleSwitch>
	<ToggleSwitch checked>Switch</ToggleSwitch>
</div>
<div class="showcase-group">
	<ToggleSwitch disabled>Switch</ToggleSwitch>
	<ToggleSwitch checked disabled>Switch</ToggleSwitch>
</div>
<h2>Radio Button</h2>
<div class="showcase-group">
	<RadioButton bind:group={normalRadioGroup} value={0}>Option</RadioButton>
	<RadioButton bind:group={normalRadioGroup} value={1}>Option</RadioButton>
</div>
<div class="showcase-group">
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
<div class="showcase-group">
	<ProgressRing />
	<ProgressRing bind:value={progressRingValue} />
	<Button on:click={() => (progressRingValue = Math.floor(Math.random() * 101))}
		>Randomize Value</Button
	>
</div>
<div class="showcase-group">
	<ProgressRing size={60} />
</div>

<h2>InfoBadge</h2>
<div class="showcase-group">
	<InfoBadge severity="attention" />
	<InfoBadge severity="success" />
	<InfoBadge severity="caution" />
	<InfoBadge severity="critical" />
	<InfoBadge severity="information" />
</div>
<div class="showcase-group">
	<InfoBadge severity="attention">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="success">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="caution">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="critical">{Math.floor(Math.random() * 10)}</InfoBadge>
	<InfoBadge severity="information">{Math.floor(Math.random() * 10)}</InfoBadge>
</div>

<h2>Progress Bar</h2>
<div class="showcase-group">
	<ProgressBar value={50} />
	<ProgressBar />
</div>

<h2>Flyout</h2>
<div class="showcase-group" style="display: flex; justify-content: center;">
	<Flyout closable={false} bind:open={nonClosableFlyoutOpen}>
		<Button variant="accent">Non-closasble Flyout</Button>
		<svelte:fragment slot="flyout">You can't close me >:)</svelte:fragment>
	</Flyout>
</div>
<div class="showcase-group" style="display: flex; justify-content: center; align-items: center;">
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
<div class="showcase-group" style="flex-direction: column">
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
<div class="showcase-group">
	<TextBox bind:value placeholder="TextBox" />
	<TextBox disabled placeholder="TextBox" />
	<TextBox type="password" placeholder="TextBox" />
	<TextBox type="search" placeholder="TextBox" />
</div>

<h2>Number Box</h2>
<div class="showcase-group">
	<NumberBox value={1} min={0} max={10} placeholder="NumberBox" />
	<NumberBox size={50} placeholder="NumberBox" inline />
</div>

<h2>Tooltip</h2>
<div class="showcase-group">
	<Tooltip text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
	<Tooltip followCursor text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
	<Tooltip alignment="top" text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
	<Tooltip alignment="bottom" text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
	<Tooltip alignment="left" text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
	<Tooltip alignment="right" text="hiii">
		<div
			style="width: 80px; height: 80px; border: 2px dotted var(--fds-divider-stroke-default); margin: 0;"
		/>
	</Tooltip>
</div>

<h2>Person Picture</h2>
<div class="showcase-group">
	<PersonPicture size={24}>
		{Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.toUpperCase()
			.substr(0, 2)}
	</PersonPicture>
	<PersonPicture src="https://thispersondoesnotexist.com/image" size={32}>
		{Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.toUpperCase()
			.substr(0, 2)}
	</PersonPicture>
	<PersonPicture size={48}>
		{Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.toUpperCase()
			.substr(0, 2)}

		<svelte:fragment slot="badge">
			<InfoBadge>1</InfoBadge>
		</svelte:fragment>
	</PersonPicture>
	<PersonPicture alt="a a a a" size={96} />
</div>

<h2>Dialog</h2>
<div class="showcase-group">
	<Button on:click={() => (dialogOpen = true)}>Open</Button>
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
				}}>Save</Button
			>
			<Button
				on:click={() => {
					dialogOpen = false;
					dialogResult = "Cancel";
				}}>Cancel</Button
			>
		</svelte:fragment>
	</ContentDialog>
</div>

<p>Result: {dialogResult}</p>

<h2>Slider</h2>

<div class="showcase-group">
	<Slider />
	<Slider value={50} step={20} />
	<Slider value={2500} min={1000} max={5000} />
</div>

<div class="showcase-group">
	<Slider value={50} ticks={[20, 40, 60, 80]} />
	<Slider value={50} ticks={[20, 40, 60, 80]} tickPlacement="before" />
	<Slider value={50} ticks={[20, 40, 60, 80]} tickPlacement="after" />
</div>

<div class="showcase-group">
	<Slider value={50} tooltip={false} />
	<Slider value={50} prefix="$" />
	<Slider value={50} suffix="%" />
</div>

<div class="showcase-group">
	<Slider value={50} reverse />
	<Slider value={50} disabled />
	<Slider value={50} track={false} />
</div>

<div class="showcase-group" style="height: 250px">
	<Slider orientation="vertical" />
	<Slider orientation="vertical" value={50} step={20} />
	<Slider orientation="vertical" value={2500} min={1000} max={5000} />
	<Slider orientation="vertical" value={50} ticks={[20, 40, 60, 80]} />
	<Slider orientation="vertical" value={50} ticks={[20, 40, 60, 80]} tickPlacement="before" />
	<Slider orientation="vertical" value={50} ticks={[20, 40, 60, 80]} tickPlacement="after" />
	<Slider orientation="vertical" value={50} reverse />
	<Slider orientation="vertical" value={50} disabled />
	<Slider orientation="vertical" value={50} track={false} />
</div>

<style lang="scss">
	@use "src/lib/mixins" as *;

	:global(body) {
		font-family: var(--font-family-text);
		background-color: var(--solid-background-base);
		color: var(--text-primary);
		margin: 24px;
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

	a {
		color: var(--accent-default);
	}

	.showcase-group {
		@include flex($gap: 12px);
		margin-block-end: 12px;
	}
</style>
