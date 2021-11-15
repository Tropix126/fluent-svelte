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
		ContentDialog,
		Expander
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

<h2>Expander</h2>
<div class="showcase-group">
	<Expander>
		Expander Down (Icon)
		<svelte:fragment slot="icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
				<path
					d="M11.8105 2.44911C11.2248 1.86332 10.275 1.86332 9.68922 2.44911L7.96197 4.17636C7.81383 3.50372 7.21422 3.00044 6.49707 3.00044H3.49707C2.66864 3.00044 1.99707 3.67202 1.99707 4.50044V12.4985C1.99707 13.0088 2.25188 13.4595 2.64121 13.7305C2.88446 13.9006 3.18051 14.0004 3.49988 14.0004H11.4999C12.3283 14.0004 12.9999 13.3289 12.9999 12.5004V9.50044C12.9999 8.80142 12.5217 8.21408 11.8746 8.04764L13.5812 6.34109C14.167 5.7553 14.167 4.80555 13.5812 4.21977L11.8105 2.44911ZM9.57791 8.00044H7.99707V6.4196L9.57791 8.00044ZM10.3963 3.15621C10.5916 2.96095 10.9082 2.96095 11.1034 3.15621L12.8741 4.92687C13.0694 5.12214 13.0694 5.43872 12.8741 5.63398L11.1034 7.40464C10.9082 7.59991 10.5916 7.59991 10.3963 7.40464L8.62566 5.63398C8.4304 5.43872 8.4304 5.12214 8.62566 4.92687L10.3963 3.15621ZM6.99707 4.50044V8.00044L2.99707 8.00044V4.50044C2.99707 4.2243 3.22093 4.00044 3.49707 4.00044H6.49707C6.77321 4.00044 6.99707 4.2243 6.99707 4.50044ZM2.99988 12.5004L2.99988 9.00044H6.99707V12.9985H3.49707C3.3909 12.9985 3.29245 12.9654 3.21149 12.9089C3.08346 12.8184 2.99988 12.6692 2.99988 12.5004ZM7.99707 9.00044H11.4999C11.776 9.00044 11.9999 9.2243 11.9999 9.50044V12.5004C11.9999 12.7766 11.776 13.0004 11.4999 13.0004H7.99707V9.00044Z"
					fill="currentColor"
				/>
			</svg>
		</svelte:fragment>
		<svelte:fragment slot="content">hihihihi</svelte:fragment>
	</Expander>
	<Expander direction="up">
		Expander Up
		<svelte:fragment slot="content">hihihihi</svelte:fragment>
	</Expander>
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
