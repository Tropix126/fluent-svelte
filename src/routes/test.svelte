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
		Expander,
		TextBlock,
		IconButton
	} from "$lib";

	import { PageSection } from "$site/lib";

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

<div style="height: 56px;" />

<PageSection>
	<h2>fluent-svelte test page</h2>
	<p>Made with <a href="https://kit.svelte.dev">SvelteKit</a></p>

	<h3>Buttons</h3>
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

	<h3>Checkboxes</h3>
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

	<h3>Switches</h3>
	<div class="showcase-group">
		<ToggleSwitch>Switch</ToggleSwitch>
		<ToggleSwitch checked>Switch</ToggleSwitch>
	</div>
	<div class="showcase-group">
		<ToggleSwitch disabled>Switch</ToggleSwitch>
		<ToggleSwitch checked disabled>Switch</ToggleSwitch>
	</div>
	<h3>Radio Button</h3>
	<div class="showcase-group">
		<RadioButton bind:group={normalRadioGroup} value={0}>Option</RadioButton>
		<RadioButton bind:group={normalRadioGroup} value={1}>Option</RadioButton>
	</div>
	<div class="showcase-group">
		<RadioButton disabled bind:group={disabledRadioGroup} value={0}>Option</RadioButton>
		<RadioButton disabled bind:group={disabledRadioGroup} value={1}>Option</RadioButton>
	</div>

	<h3>ComboBox</h3>
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

	<h3>Progress Ring</h3>
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

	<h3>InfoBadge</h3>
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

	<h3>Progress Bar</h3>
	<div class="showcase-group">
		<ProgressBar value={50} />
		<ProgressBar />
	</div>

	<h3>Flyout</h3>
	<div class="showcase-group" style="display: flex; justify-content: center;">
		<Flyout closable={false} bind:open={nonClosableFlyoutOpen}>
			<Button variant="accent">Non-closasble Flyout</Button>
			<svelte:fragment slot="flyout">You can't close me >:)</svelte:fragment>
		</Flyout>
	</div>
	<div
		class="showcase-group"
		style="display: flex; justify-content: center; align-items: center;"
	>
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

	<h3>Info Bar</h3>
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

	<h3>Text Box</h3>
	<div class="showcase-group">
		<TextBox bind:value placeholder="TextBox" />
		<TextBox disabled placeholder="TextBox" />
		<TextBox type="password" placeholder="TextBox" />
		<TextBox type="search" placeholder="TextBox" />
	</div>

	<h3>Number Box</h3>
	<div class="showcase-group">
		<NumberBox value={1} min={0} max={10} placeholder="NumberBox" />
		<NumberBox size={50} placeholder="NumberBox" inline />
	</div>

	<h3>Tooltip</h3>
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

	<h3>Person Picture</h3>
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

	<h3>Dialog</h3>
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

	<h3>Slider</h3>

	<div class="showcase-group">
		<Slider />
		<Slider value={50} max={9000000} step={20} />
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

	<h3>Expander</h3>
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

	<h3>Text Block</h3>
	<div class="showcase-group">
		<TextBlock variant="caption">Caption</TextBlock>
		<TextBlock variant="body">Body</TextBlock>
		<TextBlock variant="bodyStrong">Body Strong</TextBlock>
		<TextBlock variant="bodyLarge">Body Large</TextBlock>
		<TextBlock variant="subtitle">Subtitle</TextBlock>
		<TextBlock variant="title">Title</TextBlock>
		<TextBlock variant="titleLarge">Title Large</TextBlock>
		<TextBlock variant="display">Display</TextBlock>
	</div>

	<h3>Icon Button</h3>
	<div class="showcase-group">
		<IconButton>
			<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 1024 1024" width="16">
				<path
					fill="currentColor"
					d="M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"
				/>
			</svg>
		</IconButton>
		<IconButton disabled>
			<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 1024 1024" width="16">
				<path
					fill="currentColor"
					d="M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"
				/>
			</svg>
		</IconButton>
	</div>
</PageSection>

<style lang="scss">
	@use "src/lib/mixins" as *;

	a {
		color: var(--accent-default);
	}

	h3 {
		margin-block-end: 12px !important;
		margin-block-start: 24px !important;
	}

	.showcase-group {
		@include flex($gap: 12px);
		margin-block-end: 12px;
	}
</style>
