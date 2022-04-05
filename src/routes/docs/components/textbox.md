<script lang="ts">
    import { TextBox, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/TextBox/TextBox.svelte?sveld&raw";
</script>

The TextBox control lets a user type text into an app. The text displays on the screen in a simple, plaintext format on a single line. It additionally comes with a set of buttons which allow users to perform specialized actions on the text, such as showing a password or clearing the TextBox's contents.

```ts
import { TextBox } from "fluent-svelte";
```

<Showcase columns={2} repl="65b817e67ff3450da0c5755b5fdac9f7">
    <TextBox placeholder="TextBox" />
    <TextBox placeholder="TextBox" disabled />
    <TextBox type="search" placeholder="TextBox" />
    <TextBox type="search" placeholder="TextBox" disabled />
    <TextBox type="password" placeholder="TextBox" />
    <TextBox type="password" placeholder="TextBox" disabled />
</Showcase>

## Usage

TextBox is an extension of [HTML's native `<input />` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). Most props/attributes that aren't explicitly documented here should still work the same.

### Controlling Value

A TextBox's current text content can be set with the `value` property.

```svelte hideScript
<TextBox value="Default value" />
```

Additionally, you can use svelte's two-way binding syntax to bind the value to a variable.

```svelte example
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

<InfoBar severity="caution" title="NumberBox vs. the {`"number"`} type">
While you <i>can</i> use the <code>number</code> type with TextBox, it's probably a better idea to use the specialized <a href="numberbox">NumberBox</a> component instead, which is an extension of TextBox designed for handling numeric inputs.
</InfoBar>

Most of these types will simply set the `type` attribute of the TextBox's input element. Some of these types, however, have additional functionality added specific to their input method.

-   On `search` types - A search button will be added to the end of the TextBox to allow users to submit a search query. You can use the `on:search` event to handle the search query. If you wish to hide the search button when using this type, you can set the `searchButton` property to `false`.
-   On `password` types - A password reveal button will be added to the end of the TextBox to allow users to reveal the input's value. You can use the `on:reveal` event to run code when the password is revealed. If you wish to hide the reveal button when using this type, you can set the `revealButton` property to `false`.

### Placeholders

TextBox supports a `placeholder` property that will be displayed as text in lower emphasis when it's value is empty. These can be used to describe the purpose or type of value the TextBox is meant to accept.

```svelte example hideScript
<script>
	import { TextBox } from "fluent-svelte";
</script>

<TextBox placeholder="Send a message" />
```

### Buttons

TextBox supports a set of buttons that are added to the end of it's container. These buttons can be used to perform actions on the TextBox's value. [Depending on the `type` of the TextBox, these buttons may vary with different functionality and behavior](#textbox-types).

Most TextBox types will feature a clear button. This button will clear the TextBox's value, then focus the input when clicked. If you wish to hide this button, you can set the `clearButton` property to `false`. If you wish to run any code after the clear button is used, you can also handle the `on:clear` event.

Along with the builtin action buttons, you can also add your own buttons to the end of the TextBox using the `TextBoxButton` component and the TextBox's `buttons` slot:

```svelte example hideScript
<script>
	import { TextBox, TextBoxButton } from "fluent-svelte";
</script>

<TextBox placeholder="Custom buttons!">
	<TextBoxButton slot="buttons" on:click={() => alert("Clicked!")}>
		<!-- https://github.com/microsoft/fluentui-system-icons -->
		<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z"
				fill="currentColor"
			/>
		</svg>
	</TextBoxButton>
</TextBox>
```

### Disabled and Readonly States

There are two methods to (completely) restrict manual input on a TextBox: the `disabled` and `readonly` properties.

-   The `disabled` property will prevent the user from entering text into the TextBox as well as style the TextBox to indicate this. The TextBox will not be focusable and will not respond to keyboard events.
-   The `readonly` property will only prevent the user from entering text into the TextBox. The TextBox will still be focusable, however, and no changes to the styling will be made.

<InfoBar severity="attention" title="Buttons and these properties">
    It should be noted that while using either of these modes that the clear button will not be displayed, in order to prevent users from modifying the TextBox's content. The <code>clearButton</code> property will have no effect on this behavior. Additionally, when the TextBox is <code>disabled</code>, the search and password reveal buttons will not be rendered into their respective types either.
</InfoBar>

```svelte example hideScript
<script>
	import { TextBox } from "fluent-svelte";
</script>

<TextBox placeholder="disabled TextBox" disabled />
<TextBox placeholder="readonly TextBox" readonly />
```

## Component API

<APIDocs {data} />
