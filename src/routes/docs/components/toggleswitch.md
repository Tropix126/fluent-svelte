<script lang="ts">
    import { ToggleSwitch, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/ToggleSwitch/ToggleSwitch.svelte?sveld&raw";
</script>

The toggle switch represents a physical switch that allows users to turn things on or off, like a light switch. Use toggle switch controls to present users with two mutually exclusive options (such as on/off), where choosing an option provides immediate results.

```ts
import { ToggleSwitch } from "fluent-svelte";
```

<Showcase columns={2} repl="4b7217ee24294302937ec6c69db1bbc0">
    <ToggleSwitch>ToggleSwitch</ToggleSwitch>
    <ToggleSwitch checked>ToggleSwitch</ToggleSwitch>
    <ToggleSwitch disabled>ToggleSwitch</ToggleSwitch>
    <ToggleSwitch checked disabled>ToggleSwitch</ToggleSwitch>
</Showcase>

## Usage

`<ToggleSwitch />` is a wrapper around HTML's `<input />` checkbox type. As such, the APIs share some similarities.

### Checking and Unchecking

You can programmatically control if the ToggleSwitch is in it's checked state by setting the `checked` property.

```svelte example hideScript
<script>
	import { ToggleSwitch } from "fluent-svelte";
</script>

<ToggleSwitch checked />
```

Additionally, you can use svelte's two-way binding syntax to bind the checked state to a variable.

```svelte example
<script>
	import { ToggleSwitch } from "fluent-svelte";

	let checked = false;
</script>

<ToggleSwitch bind:checked />

Current state: {checked ? "checked" : "unchecked"}
```

### Labels

Passing in content to the ToggleSwitch's slot will cause that content to be rendered into a label for the control.

```svelte example hideScript
<script>
	import { ToggleSwitch } from "fluent-svelte";
</script>

<ToggleSwitch>I have a label!</ToggleSwitch>
```

### Value

For usage in forms, you can set a `value` property which will set the [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value) of the ToggleSwitch's `<input>` element.

### Disabled ToggleSwitches

If the ToggleSwitch is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a ToggleSwitch is disabled, it will be unclickable.

## Component API

<APIDocs {data} />
