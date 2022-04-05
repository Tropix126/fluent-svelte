<script lang="ts">
    import { Slider, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Slider/Slider.svelte?sveld&raw";
</script>

A slider is a control that lets the user select from a range of values by moving a thumb control along a track.

```ts
import { Slider } from "fluent-svelte";
```

<Showcase columns={4} columnWidth="120px" repl="461bd056ac7b4c7a920354256560b0a4">
    <div style="display: contents" on:mousedown|stopPropagation>
        <Slider />
        <Slider value={10000} step={10000} max={30000} ticks={[10000, 20000]} suffix="cm" />
        <Slider value={80} max={200} reverse />
        <Slider value={50} disabled />
        <div style="block-size: 72px;">
            <Slider orientation="vertical" value={24} />
        </div>
        <Slider orientation="vertical" value={50} reverse />
        <Slider orientation="vertical" value={76} track={false} ticks={[24, 50, 76]} tickPlacement="after" />
        <Slider orientation="vertical" value={24} disabled />
    </div>
</Showcase>

## Usage

### Controlling Value

By default, sliders are created with a value of `0`. This starts the slider thumb at 0% of the track. You can set the initial value of the slider by setting the `value` property.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider value={20} />
```

Additionally, you can use svelte's two-way binding syntax to bind the value to a variable.

```svelte example
<script>
	import { Slider } from "fluent-svelte";

	let value = 0;
</script>

<Slider bind:value />

Current value: {value}
```

### Minimum and Maximum Values

Sliders can normally only take in `value`s ranging from `0` to `100`. This can be changed by setting the `min` and `max` properties.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider min={100} max={500} value={250} />
```

### Step

A `step` property can be set to control the granularity of the slider. For example, if you set the `step` to `10`, the slider will only allow values that are multiples of `10`. The default step of `1` means that the slider can take any whole-number value.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider step={10} />
```

### Using Ticks

Slider ticks are small markers along the slider rail that mark a significant value. Ticks are purely visual, and do not alter user interaction. You can add slider ticks by passing an array of numbers within the slider's value range into the `ticks` property:

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider ticks={[0, 50, 100]} />
```

You can also customize the appearance of the slider's ticks. The `tickPlacement` property will control how the ticks are displayed on the slider rail. The default value is `around`, which shows the ticks at both sides of the rail vertically. Tick placement can be either `around`, `before`, or `after`.

### Tooltips

All sliders are accompanied by a tooltip that displays the current value of the slider. If you do not wish to display a tooltip, you can set the `tooltip` property to `false`.

```svelte hideScript
<Slider tooltip={false} />
```

Tooltip text can also be customized through the `prefix` and `suffix` properties, which will add a string respectively before or after the tooltip's text. This is useful if you want to convey units of measurement or other information about the slider's value.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider prefix="$" />
<Slider suffix=" meters" />
```

If you require further tooltip configuration, the tooltip's content can also be entirely overrided with your own using the `tooltip` slot.

The `tooltip` slot has three slot props: `value`, `prefix` and `suffix` which grant you access to the current value and the prefix/suffix strings respectively.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider>
	<svelte:fragment slot="tooltip" let:value let:prefix let:suffix>
		{prefix}{value}{suffix}
		<marquee>Custom HTML content!</marquee>
	</svelte:fragment>
</Slider>
```

### Direction and Orientation

Sliders can be displayed in either a horizontal (left and right) or vertical orientation (up and down). By default, sliders are displayed in a horizontal orientation. You can change this by setting the `orientation` property to `vertical`.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<div style="block-size: 120px;">
	<Slider orientation="vertical" />
</div>
```

Slider tracks can also be reversed using the `reverse` property. This will change the direction of the slider's track. For example, if the slider is horizontal and the `reverse` property is set to `true`, the track will be displayed from right to left.

```svelte example hideScript
<script>
	import { Slider } from "fluent-svelte";
</script>

<Slider reverse />
```

### Trackless Sliders

A slider's fill indication can be removed by setting the `track` property to `false`. This will only hide the _track_, not the rail or thumb.

### Disabled Sliders

If the slider is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a slider is disabled, it will be unclickable.

## Component API

<APIDocs {data} />
