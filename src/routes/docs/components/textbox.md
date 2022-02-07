<script lang="ts">
    import { TextBox, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/TextBox/TextBox.svelte?sveld&raw";
</script>

The TextBox control lets a user type text into an app. The text displays on the screen in a simple, plaintext format on a single line. It additionally comes with a set of buttons which allow users to perform specialized actions on the text, such as showing a password or clearing the TextBox's contents.   

```ts
import { TextBox } from "fluent-svelte";
```

<Showcase columns={2} repl="">
    <TextBox placeholder="TextBox" />
    <TextBox placeholder="TextBox" disabled />
    <TextBox type="search" placeholder="TextBox" />
    <TextBox type="search" placeholder="TextBox" disabled />
    <TextBox type="password" placeholder="TextBox" />
    <TextBox type="password" placeholder="TextBox" disabled />
</Showcase>

## Usage

TextBox is an extension of [HTML's native `<input />` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

### Controlling Value

A TextBox's current text content can be set with the `value` property.

```html
<TextBox value="Default value" />
```

Additionally, you can use svelte's two-way binding syntax to bind the value to a variable.

```html
<script>
	import { TextBox } from "fluent-svelte";

	let value = "Default value";
</script>

<TextBox bind:value />

Current value: {value}
```

### TextBox Types

You can customize the intended input type of the TextBox by setting the `type` property. Most HTML [`<input>` type attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) that accept text input are supported.

Supported types: `text`, `number`, `search`, `password`, `email`, `tel`, `url`, `date`, `datetime-local`, `month`, `time`, `week`.

<InfoBar
    severity="caution"
    type="caution"
    title="A note about number types."
>
    While you <i>can</i> use the <code>number</code> type with TextBox, it's probably a better idea to use the specialized <a href="numberbox">NumberBox</a> component instead, which is an extension of TextBox designed for handling numeric inputs.
</InfoBar>

Most of these types will simply set the `type` attribute of the TextBox's input element. Some of these types, however, have additional functionality added specific to their input method.

- `password` - A search button will be added to the end of the TextBox to allow users to submit a search query. You can use the `on:search` event to handle the search query. If you wish to hide the search button when using this type, you can set the `searchButton` property to `false`.
- `search` - A password reveal button will be added to the end of the TextBox to allow users to reveal the input's value. You can use the `on:reveal` event to run code when the password is revealed. If you wish to hide the reveal button when using this type, you can set the `passwordButton` property to false.

## Component API

<APIDocs {data} />
