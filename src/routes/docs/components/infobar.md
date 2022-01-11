<script lang="ts">
    import { InfoBar, InfoBadge, Button } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/InfoBar/InfoBar.svelte?raw&sveld";
</script>

The InfoBar control is for displaying app-wide status messages to users that are highly visible yet non-intrusive. There are built-in security levels to easily indicate the type of message shown as well as the option to include your own call to action or hyperlink button.

```ts
import { InfoBar } from "fluent-svelte";
```

<Showcase repl="789be6a7b377455aab6f44e123885423" columns={2}>
    <InfoBar title="Title" message="Message">
        <Button slot="action">Action</Button>
    </InfoBar>
    <InfoBar title="Title" message="Message" severity="attention">
        <Button slot="action" variant="accent">Action</Button>
    </InfoBar>
    <InfoBar title="Title" message="Message" closable={false} />
    <InfoBar title="Title" message="Message" severity="success" />
    <InfoBar title="Title" message="Message" severity="caution" />
    <InfoBar title="Title" message="Message" severity="critical" />
</Showcase>

## Usage

### Text Contents - `title` and `message`

There are two areas of text that can be customized - the title and the message. Both are optional, but at least one is recommended.
- You can specify a title for the InfoBar using `title` property.
- You can set the InfoBar's message using the `message` property.

```html
<InfoBar
    title="Title"
    message="Message"
/>
```

If you need to include HTML content into the message, you can also just use the default slot.

```html
<InfoBar>
    Visit <a href="https://fluent-svelte.vercel.app">Fluent Svelte</a> for some neat fluent design components!
</InfoBar>
```

### Severity

InfoBars can take in a `severity` prop, which represent the type of information you wish to convey to the user. The default severity is `information`.

| Severity      | Badge                                | Usage                                                                   | Preview                                                |
| ------------- | ------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `information` | <InfoBadge severity="information" /> | Non-critical messages containing general information.                   | <InfoBar severity="information" title="Information" /> |
| `attention`   | <InfoBadge severity="attention" />   | Messages that are non-critical, but still important to the user.        | <InfoBar severity="attention" title="Attention" />     |
| `success`     | <InfoBadge severity="success" />     | Messages that convey an action that has postively been completed.       | <InfoBar severity="success" title="Success" />         |
| `caution`     | <InfoBadge severity="caution" />     | Messages that serve to warn the user of a potentially dangerous action. | <InfoBar severity="caution" title="Caution" />         |
| `critical`    | <InfoBadge severity="critical" />    | Higher-severity messages that convey a dangerous or failed action.      | <InfoBar severity="critical" title="Critical" />       |

### Action Buttons

An action button can be passed in using the `action` slot. It's recommended that you use the [Button](/docs/components/button) component for this, but any HTML element is valid.

```html
<Infobar title="Title" message="Message">
    <Button slot="action">Action</Button>
</InfoBar>
```

### Controlling Visibility

Flyouts by default are `open`. This means that they are rendered into the DOM. When the close button is pressed, they will be removed from the DOM and the `open` property will be set to false.

You can configure a flyout's default visibility state when it is rendered by setting the `open` property.

```html
<InfoBar open={false} />
```

You can also use two-way binding to programatically control a bar's visibility.

```html
<script>
    import { InfoBar, Button } from "fluent-svelte";

    let open = false;
</script>

<Button on:click={() => open = !open}>Toggle InfoBar</Button>

<InfoBar bind:open />
```

If you don't want an InfoBar to be closable by the user, you can set the `closable` property to `false` which will hide the close button.

## Component API

<APIDocs {data} />
