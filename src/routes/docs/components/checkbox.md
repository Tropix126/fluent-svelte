<script lang="ts">
    import { Checkbox, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Checkbox/Checkbox.svelte?sveld&raw";
</script>

Checkboxes represent a control that a user can select (check) or clear (uncheck). A Checkbox can also report its value as indeterminate.

```ts
import { Checkbox } from "fluent-svelte";
```

<Showcase columns={3} repl="f749a248f8924ea3a90db238cc2c2415">
    <Checkbox>Checkbox</Checkbox>
    <Checkbox checked>Checkbox</Checkbox>
    <Checkbox checked indeterminate>Checkbox</Checkbox>
    <Checkbox disabled>Checkbox</Checkbox>
    <Checkbox checked disabled>Checkbox</Checkbox>
    <Checkbox checked disabled indeterminate>Checkbox</Checkbox>
</Showcase>

## Usage

`<Checkbox />` is a wrapper around HTML's `<input />` checkbox type. As such, the APIs share some similarities.

### Checking and Unchecking

You can programmatically control if the checkbox is in it's checked state by setting the `checked` property.

```svelte example hideScript
<script>
	import { Checkbox } from "fluent-svelte";
</script>

<Checkbox checked />
```

Additionally, you can use svelte's two-way binding syntax to bind the checked state to a variable.

```svelte example
<script>
	import { Checkbox } from "fluent-svelte";

	let checked = false;
</script>

<Checkbox bind:checked />

Current state: {checked ? "checked" : "unchecked"}
```

### Indeterminate States

If the checkbox cannot be represented as either checked or unchecked, it can be marked as _indeterminate_ using the `indeterminate` property.

```svelte example hideScript
<script>
	import { Checkbox } from "fluent-svelte";
</script>

<Checkbox indeterminate />
```

### Labels

Passing in content to the checkbox's slot will cause that content to be rendered into a label for the control.

```svelte example hideScript
<script>
	import { Checkbox } from "fluent-svelte";
</script>

<Checkbox>I have a label!</Checkbox>
```

### Value

For usage in forms, you can set a `value` property which will set the [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value) of the Checkbox's `<input>` element.

### Disabled Checkboxes

If the checkbox is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a checkbox is disabled, it will be unclickable.

## Component API

<APIDocs {data} />
