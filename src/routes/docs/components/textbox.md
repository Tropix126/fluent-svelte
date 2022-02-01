<script lang="ts">
    import { TextBox } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/TextBox/TextBox.svelte?sveld&raw";
</script>

The toggle switch represents a physical switch that allows users to turn things on or off, like a light switch. Use toggle switch controls to present users with two mutually exclusive options (such as on/off), where choosing an option provides immediate results.

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

## Component API

<APIDocs {data} />
