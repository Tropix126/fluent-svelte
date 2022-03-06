<script lang="ts">
    import { CalendarView, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/CalendarView/CalendarView.svelte?sveld&raw";
</script>

A calendar view lets a user view and interact with a calendar that they can navigate by month, year, or decade. A user can select a single date or multiple dates.

```ts
import { CalendarView } from "fluent-svelte";
```

<Showcase style="block-size: 480px">
    <CalendarView on:keydown={e => e.stopPropagation()} on:dblclick={e => e.stopPropagation()} on:mousedown={e => e.stopPropagation()} />
</Showcase>

## Usage

## Component API

<APIDocs {data} />
