<script lang="ts">
    import { RadioButton, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/RadioButton/RadioButton.svelte?sveld&raw";
    
    let group = 1;
</script>

Radio buttons, also called option buttons, let users select one option from a collection of two or more mutually exclusive, but related, options. The singular behavior of a RadioButtons group distinguishes it from check boxes, which support multi-selection and deselection, or clearing.

```ts
import { RadioButton } from "fluent-svelte";
```

<Showcase columns={3} repl="b3c4c774b4b84f948a8a6747e5cf7226">
    <RadioButton value={1} bind:group>Option 1</RadioButton>
    <RadioButton value={2} bind:group>Option 2</RadioButton>
    <RadioButton value={3} bind:group disabled>Option 3</RadioButton>
    <RadioButton checked>RadioButton</RadioButton>
    <RadioButton disabled>RadioButton</RadioButton>
    <RadioButton disabled checked>RadioButton</RadioButton>
</Showcase>

## Usage

`<RadioButton />` is a wrapper around HTML's `<input />` radio type. As such, the APIs share some similarities.

### Labels

Passing in content to the RadioButton's slot will cause that content to be rendered into a label for the control.

```svelte example hideScript
<script>
	import { RadioButton } from "fluent-svelte";
</script>

<RadioButton>I have a label!</RadioButton>
```

### Value

The `value` property is used to determine the piece of data that is associated with the radio. This serves two primary purposes:

-   For usage in forms, this [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value) is submitted with the form as [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).
-   If a [group binding](#radio-groups) is used, the radio's `value` will be used to determine which radio in the group is currently selected.

```svelte example hideScript
<script>
	import { RadioButton } from "fluent-svelte";
</script>

<RadioButton value={1}>Option 1</RadioButton>
```

### Radio Groups

Radio Buttons can be grouped together as a mutually-exclusive list of options using a _group binding_. Group bindings bind to a variable who's value corresponds to the value property of the currently selected item.

```svelte example
<script>
	import { RadioButton } from "fluent-svelte";

	let flavor = "chocolate";
</script>

<RadioButton bind:group={flavor} value="chocolate">Chocolate</RadioButton>
<RadioButton bind:group={flavor} value="vanilla">Vanilla</RadioButton>
<RadioButton bind:group={flavor} value="strawberry">Strawberry</RadioButton>
```

When a RadioButton is selected, it will deselect all other RadioButtons in the same group, then set the bound variable to the selected item's `value` property. If you do not wish to set a default option, the bound variable can simply be initialized without a value.

### Manually Controlling State

If `group` is not set, you also have access to a `checked` property that allows you to manually set the initial state of the Radio.

```svelte example hideScript
<script>
	import { RadioButton } from "fluent-svelte";
</script>

<RadioButton checked>I am checked by default.</RadioButton>
```

## Component API

<APIDocs {data} />
