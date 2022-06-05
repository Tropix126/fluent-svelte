<script>
	import {
		AutoSuggestBox,
		Button,
		Checkbox,
		ComboBox,
		ContentDialog,
		ContextMenu,
		Expander,
		Flyout,
		IconButton,
		InfoBadge,
		InfoBar,
		ListItem,
		MenuBar,
		MenuBarItem,
		MenuFlyout,
		MenuFlyoutDivider,
		MenuFlyoutItem,
		NumberBox,
		PersonPicture,
		ProgressBar,
		ProgressRing,
		RadioButton,
		Slider,
		TextBlock,
		TextBox,
		ToggleSwitch,
		Tooltip
	} from "$lib";

	import { PageSection } from "$site/lib";

	import "$lib/theme.css";

	import ArrowLeft from "@fluentui/svg-icons/icons/arrow_left_16_regular.svg?raw";
	import ArrowRight from "@fluentui/svg-icons/icons/arrow_right_16_regular.svg?raw";
	import ArrowClockwise from "@fluentui/svg-icons/icons/arrow_clockwise_16_regular.svg?raw";
	import SaveEdit from "@fluentui/svg-icons/icons/save_edit_20_regular.svg?raw";
	import Print from "@fluentui/svg-icons/icons/print_16_regular.svg?raw";
	import Cast from "@fluentui/svg-icons/icons/cast_20_regular.svg?raw";
	import Send from "@fluentui/svg-icons/icons/send_16_regular.svg?raw";
	import ScanTable from "@fluentui/svg-icons/icons/scan_table_24_regular.svg?raw";
	import ReadAloud from "@fluentui/svg-icons/icons/read_aloud_16_regular.svg?raw";
	import Collections from "@fluentui/svg-icons/icons/collections_20_regular.svg?raw";
	import Share from "@fluentui/svg-icons/icons/share_16_regular.svg?raw";
	import CopySelect from "@fluentui/svg-icons/icons/copy_select_20_regular.svg?raw";
	import CameraEdit from "@fluentui/svg-icons/icons/camera_edit_20_regular.svg?raw";

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

	let menuGroup = 0;

	let test1 = false;
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
			{ name: "Item 0", value: 0 },
			{ name: "Item 1", value: 1 },
			{
				name: "Item 2",
				value: 2,
				disabled: true
			},
			{ name: "Item 3", value: 3 }
		]}
	/>

	<ComboBox
		value={1}
		editable
		searchValue="asdasd"
		placeholder="ComboBox"
		items={[
			{ name: "Item 0", value: 0 },
			{ name: "Item 1", value: 1 },
			{
				name: "Item 2",
				value: 2,
				disabled: true
			},
			{ name: "Item 3", value: 3 }
		]}
	/>

	<ComboBox
		placeholder="ComboBox"
		disabled
		items={[
			{
				name: "Item 1"
			},
			{
				name: "Item 2"
			},
			{
				name: "Item 3"
			},
			{
				name: "Item 4"
			}
		]}
	/>

	<h3>Progress Ring</h3>
	<div class="showcase-group">
		<ProgressRing />
		<ProgressRing bind:value={progressRingValue} />
		<Button on:click={() => (progressRingValue = Math.floor(Math.random() * 101))}
			>Randomize Value
		</Button>
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
		<Flyout placement="top" bind:open={flyoutTopOpen}>
			<Button variant="accent">Top Flyout</Button>
			<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
		</Flyout>
		<Flyout placement="bottom" bind:open={flyoutBottomOpen}>
			<Button variant="accent">Bottom Flyout</Button>
			<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
		</Flyout>
		<Flyout placement="left" bind:open={flyoutLeftOpen}>
			<Button variant="accent">Left Flyout</Button>
			<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
		</Flyout>
		<Flyout placement="right" bind:open={flyoutRightOpen}>
			<Button variant="accent">Right Flyout</Button>
			<svelte:fragment slot="flyout">Flyout Content</svelte:fragment>
		</Flyout>
	</div>

	<h3>Info Bar</h3>
	<div class="showcase-group" style="flex-direction: column">
		<InfoBar
			closable={false}
			severity="information"
			title="Info"
			message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna."
		>
			<svelte:fragment slot="action">
				<Button variant="accent">Action</Button>
			</svelte:fragment>
		</InfoBar>
		<InfoBar severity="attention" title="Attention" message="Something is happening.">
			<svelte:fragment slot="action">
				<Button>Action</Button>
			</svelte:fragment>
		</InfoBar>
		<InfoBar severity="success" title="Success" message="Nothing bad happened!" />
		<InfoBar
			severity="caution"
			title="Caution"
			message="Don't do this or something bad will happen."
		/>
		<InfoBar severity="critical" title="Error" message="Something bad happened :(" />
	</div>

	<h3>Text Box</h3>
	<div class="showcase-group">
		<TextBox bind:value placeholder="TextBox" />
		<TextBox disabled placeholder="TextBox" />
		<TextBox type="password" placeholder="TextBox" />
		<TextBox type="search" placeholder="TextBox" />
		<TextBox disabled value="hi" type="password" placeholder="TextBox" />
		<TextBox disabled value="hi" type="search" placeholder="TextBox" />
	</div>

	<h3>Number Box</h3>
	<div class="showcase-group">
		<NumberBox value={1} min={0} max={10} placeholder="NumberBox" />
		<NumberBox size={50} placeholder="NumberBox" inline />
		<NumberBox disabled value={1} min={0} max={10} placeholder="NumberBox" />
		<NumberBox disabled size={50} placeholder="NumberBox" inline />
	</div>

	<h3>Tooltip</h3>
	<div class="showcase-group">
		<Tooltip text="test">
			<div
				tabindex={-1}
				style="width:80px;height:80px;border:2px dotted var(--fds-divider-stroke-default);margin:0;"
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
							name: "Disabled"
						},
						{
							name: "10 minutes"
						},
						{
							name: "20 minutes"
						},
						{
							name: "30 minutes"
						},
						{
							name: "1 hour"
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
					}}
					>Save
				</Button>
				<Button
					on:click={() => {
						dialogOpen = false;
						dialogResult = "Cancel";
					}}
					>Cancel
				</Button>
			</svelte:fragment>
		</ContentDialog>
	</div>

	<p>Result: {dialogResult}</p>

	<h3>Slider</h3>

	<div class="showcase-group">
		<Slider on:change={() => console.log("x")} />
		<Slider value={50} max={9000000} step={20} />
		<Slider value={2500} min={1000} max={5000} />
	</div>

	<h4>Ticks</h4>
	<div class="showcase-group">
		<Slider value={50} ticks={[20, 40, 60, 80]} />
		<Slider value={50} ticks={[20, 40, 60, 80]} tickPlacement="before" />
		<Slider value={50} ticks={[20, 40, 60, 80]} tickPlacement="after" />
	</div>

	<h4>Tooltips</h4>
	<div class="showcase-group">
		<Slider value={50} tooltip={false} />
		<Slider value={50} prefix="$" />
		<Slider value={50} suffix="%" />
	</div>

	<h4>Variants</h4>
	<div class="showcase-group">
		<Slider value={50} reverse />
		<Slider value={50} disabled />
		<Slider value={50} track={false} />
	</div>

	<div class="showcase-group" style="block-size: 250px">
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
	<h3>List Item</h3>
	<div style="display: flex; flex-direction: column;">
		<ListItem>
			<svg
				slot="icon"
				xmlns="http://www.w3.org/2000/svg"
				height="16"
				viewBox="0 0 1024 1024"
				width="16"
			>
				<path
					fill="currentColor"
					d="M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"
				/>
			</svg>
			Hello World
		</ListItem>
		<ListItem disabled>Hello World</ListItem>
		<ListItem selected>Hello World</ListItem>
	</div>

	<h3>Menu Bar</h3>
	<MenuBar>
		<MenuBarItem>
			File
			<svelte:fragment slot="flyout">
				<MenuFlyoutItem hint="Ctrl+N">New</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+Shift+N">New window</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+O">Open</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+S">Save</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+Shift+S">Save as</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem>Page setup</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+P">Print</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem>Exit</MenuFlyoutItem>
			</svelte:fragment>
		</MenuBarItem>
		<MenuBarItem>
			Edit
			<svelte:fragment slot="flyout">
				<MenuFlyoutItem hint="Ctrl+Z">Undo</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem hint="Ctrl+X">Cut</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+C">Copy</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+V">Paste</MenuFlyoutItem>
				<MenuFlyoutItem hint="Del">Delete</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem hint="Ctrl+F">Find</MenuFlyoutItem>
				<MenuFlyoutItem hint="F3">Find next</MenuFlyoutItem>
				<MenuFlyoutItem hint="Shift+F3">Find previous</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+H">Replace</MenuFlyoutItem>
				<MenuFlyoutItem hint="Ctrl+G">Go to</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem hint="Ctrl+A">Select all</MenuFlyoutItem>
				<MenuFlyoutItem hint="F5">Time/Date</MenuFlyoutItem>
				<MenuFlyoutDivider />
				<MenuFlyoutItem>Font</MenuFlyoutItem>
			</svelte:fragment>
		</MenuBarItem>
		<MenuBarItem disabled>Format</MenuBarItem>
		<MenuBarItem>
			View
			<svelte:fragment slot="flyout">
				<MenuFlyoutItem indented cascading>
					Zoom
					<svelte:fragment slot="flyout">
						<MenuFlyoutItem hint="Ctrl+Plus">Zoom in</MenuFlyoutItem>
						<MenuFlyoutItem hint="Ctrl+Minus">Zoom out</MenuFlyoutItem>
						<MenuFlyoutItem hint="Ctrl+0">Restore default zoom</MenuFlyoutItem>
					</svelte:fragment>
				</MenuFlyoutItem>
				<MenuFlyoutItem variant="toggle" checked>Status bar</MenuFlyoutItem>
				<MenuFlyoutItem variant="toggle" checked>Word wrap</MenuFlyoutItem>
			</svelte:fragment>
		</MenuBarItem>
		<MenuBarItem>Help</MenuBarItem>
	</MenuBar>

	<h3>MenuFlyout</h3>
	<MenuFlyout alignment="start">
		<Button>Open</Button>
		<svelte:fragment slot="flyout">
			<MenuFlyoutItem>
				<svg
					slot="icon"
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					viewBox="0 0 1024 1024"
					width="16"
				>
					<path
						fill="currentColor"
						d="M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"
					/>
				</svg>
				Standard Option
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem indented hint="Ctrl + Z">
				<svg
					slot="icon"
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					viewBox="0 0 1024 1024"
					width="16"
				>
					<path
						fill="currentColor"
						d="M0,512C0,465 6.08333,419.667 18.25,376C30.4167,332.333 47.6667,291.583 70,253.75C92.3333,215.917 119.083,181.417 150.25,150.25C181.417,119.083 215.917,92.3334 253.75,70C291.583,47.6667 332.333,30.4167 376,18.25C419.667,6.08337 465,0 512,0C559,0 604.333,6.08337 648,18.25C691.667,30.4167 732.417,47.6667 770.25,70C808.083,92.3334 842.583,119.083 873.75,150.25C904.917,181.417 931.667,215.917 954,253.75C976.333,291.583 993.583,332.333 1005.75,376C1017.92,419.667 1024,465 1024,512C1024,559 1017.92,604.333 1005.75,648C993.583,691.667 976.333,732.417 954,770.25C931.667,808.083 904.917,842.583 873.75,873.75C842.583,904.917 808.083,931.667 770.25,954C732.417,976.333 691.667,993.583 648,1005.75C604.333,1017.92 559,1024 512,1024C465,1024 419.667,1017.92 376,1005.75C332.333,993.583 291.583,976.333 253.75,954C215.917,931.667 181.417,904.917 150.25,873.75C119.083,842.583 92.3333,808.083 70,770.25C47.6667,732.417 30.4167,691.667 18.25,648C6.08333,604.333 0,559 0,512ZM960,512C960,471 954.667,431.417 944,393.25C933.333,355.083 918.25,319.417 898.75,286.25C879.25,253.083 855.833,222.833 828.5,195.5C801.167,168.167 770.917,144.75 737.75,125.25C704.583,105.75 668.917,90.6667 630.75,80C592.583,69.3334 553,64.0001 512,64C470.667,64.0001 430.917,69.3334 392.75,80C354.583,90.6667 318.917,105.75 285.75,125.25C252.583,144.75 222.417,168.083 195.25,195.25C168.083,222.417 144.75,252.583 125.25,285.75C105.75,318.917 90.6667,354.583 80,392.75C69.3333,430.917 64,470.667 64,512C64,553.333 69.3333,593.083 80,631.25C90.6667,669.417 105.75,705.083 125.25,738.25C144.75,771.417 168.083,801.583 195.25,828.75C222.417,855.917 252.583,879.25 285.75,898.75C318.917,918.25 354.583,933.333 392.75,944C430.917,954.667 470.667,960 512,960C553.333,960 593.083,954.667 631.25,944C669.417,933.333 705.083,918.25 738.25,898.75C771.417,879.25 801.583,855.917 828.75,828.75C855.917,801.583 879.25,771.417 898.75,738.25C918.25,705.083 933.333,669.417 944,631.25C954.667,593.083 960,553.333 960,512Z"
					/>
				</svg>
				Standard Option (Indented)
			</MenuFlyoutItem>
			<MenuFlyoutItem indented selected>Standard Option (Selected)</MenuFlyoutItem>
			<MenuFlyoutItem indented disabled selected
				>Standard Option (Disabled Selected)
			</MenuFlyoutItem>
			<MenuFlyoutItem indented disabled>Standard Option Disabled</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem variant="radio" bind:group={menuGroup} value={0}>
				Radio Option 0
			</MenuFlyoutItem>
			<MenuFlyoutItem variant="radio" bind:group={menuGroup} value={1}>
				Radio Option 1
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem checked variant="toggle">Toggle Option 0</MenuFlyoutItem>
			<MenuFlyoutItem variant="toggle">Toggle Option 1</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem indented cascading hint="hint">
				cascading
				<svelte:fragment slot="flyout">
					<MenuFlyoutItem>subitem 1</MenuFlyoutItem>
					<MenuFlyoutItem>subitem 2</MenuFlyoutItem>
					<MenuFlyoutItem>subitem 3</MenuFlyoutItem>
				</svelte:fragment>
			</MenuFlyoutItem>
		</svelte:fragment>
	</MenuFlyout>

	<h3>Context Menu</h3>
	<ContextMenu>
		<div
			style="background-color: var(--fds-solid-background-secondary); width: 200px; height: 200px;"
		/>
		<svelte:fragment slot="flyout">
			<MenuFlyoutItem hint="Alt+Left arrow">
				{@html ArrowLeft}
				Back
			</MenuFlyoutItem>
			<MenuFlyoutItem hint="Alt+Left arrow">
				{@html ArrowRight}
				Forward
			</MenuFlyoutItem>
			<MenuFlyoutItem hint="Ctrl+R">
				{@html ArrowClockwise}
				Reload
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem hint="Ctrl+S">
				{@html SaveEdit}
				Save image as
			</MenuFlyoutItem>
			<MenuFlyoutItem hint="Ctrl+P">
				{@html Print}
				Print
			</MenuFlyoutItem>
			<MenuFlyoutItem>
				{@html Cast}
				Cast as media to device
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem cascading>
				{@html Send}
				Send page to your devices
			</MenuFlyoutItem>
			<MenuFlyoutItem>
				{@html ScanTable}
				Create QR Code for this page
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem hint="Ctrl+Shift+U">
				{@html ReadAloud}
				Read aloud
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem>
				{@html Collections}
				Add page to Collections
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem>
				{@html Share}
				Share
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem hint="Ctrl+Shift+X">
				{@html CopySelect}
				Web select
			</MenuFlyoutItem>
			<MenuFlyoutItem hint="Ctrl+S">
				{@html CameraEdit}
				Web capture
			</MenuFlyoutItem>
			<MenuFlyoutDivider />
			<MenuFlyoutItem indented hint="Ctrl+U">View page source</MenuFlyoutItem>
			<MenuFlyoutItem>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 5c0-1.1.9-2 2-2h10a2 2 0 012 2v5a2 2 0 01-1.16 1.82 1.5 1.5 0 00-.28-.38l-.45-.45A1 1 0 0014 10V5a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h4v1H3a2 2 0 01-2-2V5z"
					/>
					<path
						d="M8.85 8.15A.5.5 0 008 8.5v6a.5.5 0 00.9.3l1.35-1.8h2.25a.5.5 0 00.35-.85l-4-4zM9 13V9.7l2.3 2.3H10a.5.5 0 00-.4.2L9 13z"
					/>
				</svg>
				Inspect
			</MenuFlyoutItem>
		</svelte:fragment>
	</ContextMenu>

	<h3>Auto Suggest Box</h3>
	<div class="showcase-group">
		<AutoSuggestBox
			on:select={() => console.log("hi")}
			placeholder="Search fruits"
			items={[
				"Apple",
				"Orange",
				"Grape",
				"Mango",
				"Pear",
				"Banana",
				"Strawberry",
				"Watermelon",
				"Cherry"
			]}
		/>

		<AutoSuggestBox
			placeholder="Custom item template"
			items={[
				"Apple",
				"Orange",
				"Grape",
				"Mango",
				"Pear",
				"Banana",
				"Strawberry",
				"Watermelon",
				"Cherry"
			]}
		>
			<li
				slot="item-template"
				let:id
				let:item
				let:selection
				let:index
				{id}
				style={selection === index ? "background-color: red" : ""}
			>
				{item}
			</li>
		</AutoSuggestBox>
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
