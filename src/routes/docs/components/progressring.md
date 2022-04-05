<script lang="ts">
    import { ProgressRing, NumberBox } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/ProgressRing/ProgressRing.svelte?sveld&raw";

    let value = Math.floor(Math.random() * 100);
</script>

ProgressRing provides visual feedback to to the user that a long-running operation is underway. It can mean that the user cannot interact with the app when the progress indicator is visible, and can also indicate how long the wait time might be.

```ts
import { ProgressRing } from "fluent-svelte";
```

<Showcase repl="">
    <div class="ring-spacer">
        <ProgressRing />
        <ProgressRing bind:value />
    </div>
    <NumberBox
        on:mousedown={e => e.stopPropagation()}
        class="example-ring-input"
        placeholder="%"
        clearButton={false}
        min={0}
        max={100}
        inline
        bind:value
    />
</Showcase>

## Usage

### Completion Value

The `value` property takes in a number between `0` to `100` that represents the percentage of a task that is completed.

```svelte example hideScript
<script>
	import { ProgressRing } from "fluent-svelte";
</script>

<ProgressRing value={50} />
```

ProgressRings have two primary states - _determinate_ and _indeterminate_.

A ProgressRing is indeterminate under the following conditions:

-   No `value` is provided.
-   A `value` is passed in, but it is `undefined`, `null`, or `NaN`.

A determinate ProgressRing displays a completion percentage by filling the ring gradually, while an indeterminate ProgressRing plays a looping spinner animation.

### Size

You can control the diameter of the ring in pixels by setting the `size` property. The default size is `32`.

```svelte example hideScript
<script>
	import { ProgressRing } from "fluent-svelte";
</script>

<ProgressRing size={64} />
```

## Component API

<APIDocs {data} />

<style>
    .ring-spacer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 12px;
    }

    :global(.component-showcase .component-showcase-grid > .example-ring-input) {
        margin-block-start: 12px;
        inline-size: 108px;
    }
</style>
