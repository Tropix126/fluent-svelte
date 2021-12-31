<script lang="ts">
    import { Slider, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Slider/Slider.svelte?sveld&raw";
</script>

A slider is a control that lets the user select from a range of values by moving a thumb control along a track.

```ts
import { ComboBox } from "fluent-svelte";
```

<Showcase columns={2} repl="todo">
    <Slider/>
</Showcase>

## Usage

todo

## Component API

<APIDocs {data} />