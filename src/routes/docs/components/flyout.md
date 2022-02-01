<script lang="ts">
    import { Flyout, Button, ComboBox, Slider } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Flyout/FlyoutWrapper.svelte?raw&sveld";

    const placements = ["top", "bottom", "left", "right"];
    const alignments = ["start", "center", "end"];

    const positions = placements.flatMap(placement => alignments.map(alignment => ({ placement, alignment })));

    let offset = 0;
    let placement = "top";
    let alignment = "center";
</script>

Flyouts represent a control that displays lightweight UI that is either information, or requires user interaction. Unlike a [dialog](dialog), a Flyout can be dismissed by clicking or tapping outside of it, or pressing the <kbd>Esc</kbd> key.

```ts
import { Flyout } from "fluent-svelte";
```

<Showcase repl="f884a63a8b3349e38c783e86aa4f4d17">
    <Flyout open trapFocus={false}>
        <Button>Open</Button>
        <svelte:fragment slot="flyout">
            Flyout
        </svelte:fragment>
    </Flyout>
</Showcase>

## Usage

`Flyout` is a wrapper component. Items placed into the default slot will open the flyout when clicked. To insert contents into the flyout itself, you use the `flyout` slot.

```html
<Flyout>
    <Button>Trigger Button</Button>
    <svelte:fragment slot="flyout">
        Flyout Contents
    </svelte:fragment>
</Flyout>
```

### Opening and Closing

Flyouts will not be rendered into the DOM until they are opened. A flyout can be opened by the user either with keyboard navigation or by clicking items in the flyout's wrapper element.

You can control if the flyout is open using the `open` property.

```html
<Flyout open>
    <svelte:fragment slot="flyout">
        This flyout is open by default.
    </svelte:fragment>
</Flyout>
```

You can also use Svelte's two-way binding syntax to programatically open/close a flyout.

```html
<script>
    import { Flyout, Button } from "fluent-svelte";

    let open = false;
</script>

<Flyout bind:open>
    <Button>Open</Button>
    <Button on:click={() => open = false} slot="flyout">Close</Button>
</Flyout>
```

Additionally, flyouts can be closed by pressing the escape key or clicking on contents behind the flyout. If you wish to disable this behavior, you can set the `closable` property to `false`.

### Positioning

There are three aspects to the positioning system of flyouts - `placement`, `alignment`, and `offset`.

- The `offset` property controls the distance between the flyout and the flyout wrapper in pixels. The default offset is `8`.
- The `placement` property is the direction that the flyout will be opened from. This can be either `top`, `bottom`, `left`, or `right`.
- The `alignment` property controls either the vertical or horizontal alignment of the flyout along a given placement axis. This can be either `start`, `center`, or `end`.

<div class="positioning-chart placement-{placement} alignment-{alignment}" style:--fds-example-offset={offset}>
    <div class="example-flyout-wrapper">
        <div class="example-flyout"></div>
    </div>
    <ComboBox placeholder="Placements" bind:value={placement} items={[
        { name: "top" },
        { name: "bottom" },
        { name: "left" },
        { name: "right" }
    ]} />
    <ComboBox placeholder="Alignments" bind:value={alignment} items={[
        { name: "start" },
        { name: "center" },
        { name: "end" }
    ]} />
    <Slider bind:value={offset} />
</div>

### Focus Behavior

Flyouts utilize a focus trap, which restricts keyboard navigation focus to only the flyout's content. If you wish to disable this behavior, you can set the `trapFocus` property to `false`.

### Overriding Flyouts

For more niche use cases, you can completely override the flyout element with your own container using the `override` slot.

```html
<Flyout>
    <Button>Open</Button>
    <div slot="override" style="background-color: red; padding: 24px;">
        <h1>Custom flyout containers!</h1>
    </div>
</Flyout>
```

## Component API

<APIDocs {data} />