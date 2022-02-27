<script lang="ts">
    import { IconButton } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import Circle from "@fluentui/svg-icons/icons/circle_16_regular.svg?raw";

    import data from "$lib/IconButton/IconButton.svelte?raw&sveld";
</script>

An Icon Button is a clickable control that triggers an immediate action. Unlike the [Button](button) control, it serves the purpose of encapsulating an icon glyph as it's content.

```ts
import { IconButton } from "fluent-svelte";
```

<Showcase columns={2} repl="89b152e7c33047768b6c242eb2a6afcb">
    <IconButton>
        {@html Circle}
    </IconButton>
    <IconButton disabled>
        {@html Circle}
    </IconButton>
</Showcase>

## Usage

While IconButton is not a direct extension of [Button](button), it shares many similarities with it's API.

### Links

An IconButton can either be a clickable action or a link. By default, an IconButton will be rendered as a standard HTML `<button>` element. If an `href` property is provided, the IconButton will be converted into an `<a>` tag.

### Disabled Buttons

If the button is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a button is disabled, it will be unclickable and the `href` property will be ignored.

## Component API

<APIDocs {data} />
