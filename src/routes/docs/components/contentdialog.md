<script lang="ts">
    import { Button, ContentDialog, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/ContentDialog/ContentDialog.svelte?raw&sveld";

    let open = true;

    const sizes = {
        min: 320,
        standard: 448,
        max: 540
    }
</script>

Dialog controls are modal UI overlays that provide contextual app information. They block interactions with the app window until being explicitly dismissed. They often request some kind of action from the user.

```ts
import { ContentDialog } from "fluent-svelte";
```

<Showcase style="block-size: 360px;" repl="0fde4983fdc841d8b7320143ee3d50d7">
    <Button on:click={() => open = true}>
        Open
    </Button>
    <ContentDialog bind:open trapFocus={false} darken={false} title="Dialog Title">
        Some text
        <svelte:fragment slot="footer">
            <Button variant="accent" on:click={() => open = false}>
                Button 1
            </Button>
            <Button on:click={() => open = false}>
                Button 2
            </Button>
        </svelte:fragment>
    </ContentDialog>
</Showcase>

## Usage

### Opening and Closing

Dialogs are not rendered into the DOM initially. They need to be _opened_ first, by setting the `open` property.

```svelte
<ContentDialog open>This dialog is open by default.</ContentDialog>
```

If you wish to control a dialog opening from a trigger button, you can two-way bind the `open` property to a variable.

```svelte example
<script>
	import { ContentDialog, Button } from "fluent-svelte";

	let open = false;
</script>

<Button on:click={() => (open = true)}>Open Dialog</Button>

<ContentDialog bind:open>
	I have been opened by a button click.
	<Button on:click={() => (open = false)}>Close</Button>
</ContentDialog>
```

Additionally, dialogs can be closed by pressing the escape key. If you wish to disable this behavior, you can set the `closable` property to `false`.

### Titles

While not strictly required, it is recommended that you give the dialog a title to describe it's purpose using the `title` property. This both visually adds a title at the top of the content area, and adds an accessible label through ARIA attributes for usage with assistive technologies.

```svelte
<ContentDialog title="I have a title." />
```

<InfoBar title="A11Y Note" severity="caution">
    The ARIA 1.2 specification requires a dialog title in order to comply with the <a href="https://www.w3.org/TR/wai-aria-practices/#dialog_modal" target="_blank" rel="noreferrer noopener">modal dialog pattern</a>.
</InfoBar>

### Footers

You can use the `footer` slot to insert various actions at the bottom of the dialog.

```svelte
<script>
	import { ContentDialog, Button } from "fluent-svelte";

	let open = true;
</script>

<ContentDialog bind:open title="Dialog with action">
	<Button slot="footer" on:click={() => (open = false)}>Close Dialog</Button>
</ContentDialog>
```

### Size

Dialogs come in three sizes - `min`, `standard`, and `max`. You can set the dialog's size using the `size` property. With this in mind, dialogs will always responsively scale down if their width exceeds the viewport size.

<div class="dialog-sizes">
    {#each ["min", "standard", "max"] as size}
        <ContentDialog title="This is a {size}-sized dialog." trapFocus={false} {size} open>
            It has a width of {sizes[size]}px.
            <Button slot="footer">Action</Button>
        </ContentDialog>
    {/each}
</div>

### Dialog Backdrops

The default behavior of a dialog is to open with a backdrop ("smoke") layer which prevents user interaction and darkens the contents of the page behind the dialog.

-   You can disable backdrop darkening by setting the `darken` property to `false`.
-   You can configure the backdrop to close the dialog when it is clicked using the `on:backdropclick` and `on:backdropmousedown` events dispatched from the component.

### Focus Behavior

In accordance to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-7), dialogs utilize a focus trap, which restricts keyboard navigation focus to only the dialog's content. If you wish to disable this behavior, you can set the `trapFocus` property to `false`.

### Appending

There are some situations where you might want the dialog's elements to open appended to a specific element, separate from your markup structure. This can be useful if you want to trigger the dialog from inside a container element that has `overflow: hidden;` styles set, or if you want a single source of where dialogs should be opened from.

To do this, you can set the `append` property to any valid [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). This will append the dialog to the specified element when opened, rather than the position specified in your markup.

```svelte
<ContentDialog title="Appended Dialog" append={document.body}>
	When opened, I will be appended to this page's <body> tag. </body></ContentDialog
>
```

<InfoBar severity="information" title="Information">
    If you are familliar with React, this is essentially a <a href="https://reactjs.org/docs/portals.html" target="_blank" rel="noreferrer noopener">portal</a>.
</InfoBar>

## Component API

<APIDocs {data} />

<style lang="scss">
    .dialog-sizes {
        display: grid;
        justify-content: start;
        grid-gap: 24px;
        margin-block-end: 64px;
        :global {
            .content-dialog {
                position: relative;
                &-smoke {
                    display: contents;
                }
            }
        }
    }
</style>
