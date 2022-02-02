<script lang="ts">
    import { TextBox } from "$lib";
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

TextBox is an extension of HTML's native `<input />` element.

## Component API

<APIDocs {data} />
