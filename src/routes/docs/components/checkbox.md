<script lang="ts">
    import { Checkbox, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Checkbox/Checkbox.svelte?raw&sveld";
</script>

Checkboxes represent a control that a user can select (check) or clear (uncheck). A Checkbox can also report its value as indeterminate.

```ts
import { Checkbox } from "fluent-svelte";
```

<Showcase columns={3} repl="0fde4983fdc841d8b7320143ee3d50d7">
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

```html
<Checkbox checked />
```

Additionally, you can use svelte's two-way binding syntax to bind the checked state to a variable.

```html
<script>
	import { Checkbox } from "fluent-svelte";

	let checked = false;
</script>

<Checkbox bind:checked />

Current state: {checked ? "checked" : "unchecked"}
```

### Indeterminate States

If the checkbox cannot be represented as either checked or unchecked, it can be marked as _indeterminate_ using the `indeterminate` property.

```html
<Checkbox indeterminate />
```

### Labels

Passing in content to the checkbox's slot will cause that content to be rendered into a label for the control.

```html
<Checkbox>I have a label!</Checkbox>
```

### Disabled Checkboxes

If the checkbox is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a checkbox is disabled, it will be unclickable.

## Component API

<APIDocs {data} />
