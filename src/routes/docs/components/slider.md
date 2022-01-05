<script lang="ts">
    import { Slider, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Slider/Slider.svelte?sveld&raw";
</script>

A slider is a control that lets the user select from a range of values by moving a thumb control along a track.

```ts
import { Slider } from "fluent-svelte";
```

<Showcase columns={2} repl="todo">
    <Slider/>
</Showcase>

## Usage

### Controlling Value

By default, sliders are created with a value of `0`. This starts the slider thumb at 0% of the track. You can set the initial value of the slider by setting the `value` property.

```html
<Slider value={20} />
```

Additionally, you can use svelte's two-way binding syntax to bind the value to a variable.

```html
<script>
	import { Slider } from "fluent-svelte";

	let value = 0;
</script>

<Slider bind:value />

Current value: {value}
```

## Component API

<APIDocs {data} />
