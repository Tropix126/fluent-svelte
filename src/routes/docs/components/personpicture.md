<script lang="ts">
    import { TextBlock } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/PersonPicture/PersonPicture.svelte?sveld&raw";
</script>

The TextBlock control renders a block of text in a given style depending on it's indended purpose in the layout. As the visual representation of language, TextBlock’s main task is to communicate information. Its style should never get in the way of that goal.

```ts
import { TextBlock } from "fluent-svelte";
``` 

<Showcase repl="" columns={3}>
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

## Component API

<APIDocs {data} />