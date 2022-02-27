<script lang="ts">
    import { TextBlock } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/TextBlock/TextBlock.svelte?sveld&raw";
</script>

The TextBlock control renders a block of text in a given style depending on it's indended purpose in the layout. As the visual representation of language, TextBlock’s main task is to communicate information. Its style should never get in the way of that goal.

```ts
import { TextBlock } from "fluent-svelte";
```

<Showcase repl="9354fe2253804088b23e4dc9a882fa24" columns={3}>
    <TextBlock variant="caption">Caption</TextBlock>
    <TextBlock variant="body">Body</TextBlock>
    <TextBlock variant="bodyStrong">Body Strong</TextBlock>
    <TextBlock variant="bodyLarge">Body Large</TextBlock>
    <TextBlock variant="subtitle">Subtitle</TextBlock>
    <TextBlock variant="title">Title</TextBlock>
    <TextBlock variant="titleLarge">Title Large</TextBlock>
    <TextBlock variant="display">Display</TextBlock>
</Showcase>

## Usage

TextBlocks only render a single given element, depending on which style is specified.

### Styles

TextBlocks can be customized to a given purpose by passing in a `variant` property. The default variant is `body`.

| Variant      | HTML Tag | Weight | Primary Font Family       | Size / Line Height | Preview                                          |
| ------------ | -------- | ------ | ------------------------- | ------------------ | ------------------------------------------------ |
| `caption`    | `<span>` | `400`  | Segoe UI Variable Small   | 12/16px            | <TextBlock variant="caption">Text</TextBlock>    |
| `body`       | `<span>` | `400`  | Segoe UI Variable Text    | 14/20px            | <TextBlock variant="body">Text</TextBlock>       |
| `bodyStrong` | `<h6>`   | `600`  | Segoe UI Variable Text    | 14/20px            | <TextBlock variant="bodyStrong">Text</TextBlock> |
| `bodyLarge`  | `<h5>`   | `600`  | Segoe UI Variable Text    | 18/24px            | <TextBlock variant="bodyLarge">Text</TextBlock>  |
| `subtitle`   | `<h4>`   | `600`  | Segoe UI Variable Display | 20/28px            | <TextBlock variant="subtitle">Text</TextBlock>   |
| `title`      | `<h3>`   | `600`  | Segoe UI Variable Display | 28/36px            | <TextBlock variant="title">Text</TextBlock>      |
| `titleLarge` | `<h2>`   | `600`  | Segoe UI Variable Display | 40/52px            | <TextBlock variant="titleLarge">Text</TextBlock> |
| `display`    | `<h1>`   | `600`  | Segoe UI Variable Display | 68/92px            | <TextBlock variant="display">Text</TextBlock>    |

## Component API

<APIDocs {data} />
