<script lang="ts">
    import { Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Button/Button.svelte?sveld&raw";
</script>

A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus.

```ts
import { Button } from "fluent-svelte";
```

<Showcase columns={3} repl="0c6ca42e2c5c4868a7a8c1a1a45759eb">
    <Button variant="standard">Button</Button>
    <Button variant="accent">Button</Button>
    <Button variant="hyperlink">Button</Button>
    <Button variant="standard" disabled>Button</Button>
    <Button variant="accent" disabled>Button</Button>
    <Button variant="hyperlink" disabled>Button</Button>
</Showcase>

## Usage

A button can either be a clickable action or a link. By default, a button will be rendered as a standard HTML `<button>` element. If an `href` property is provided, the button will be converted into an `<a>` tag.

### Styles

Buttons come in three possible _variants_ - `standard`, `accent` and `hyperlink`. Variants can be specified using the `variant` property.

| Variant     | Preview                                               | Usage                                                                        |
| ----------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| `standard`  | <Button variant="standard">Standard Button</Button>   | Secondary or alternative actions that are not important to the user.         |
| `accent`    | <Button variant="accent">Accent Button</Button>       | Actions that are important to the user, or are the primary focus a decision. |
| `hyperlink` | <Button variant="hyperlink">Hyperlink Button</Button> | Low-emphasis, tertiary actions that link to an external resource.            |

### Disabled Buttons

If the button is not meant to be clicked, you can use the `disabled` property to visually indicate this. If a button is disabled, it will be unclickable and the `href` property will be ignored.

## Component API

<APIDocs {data} />
