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

### Custom Icons

The `icon` slot can be used to override the default badge for the InfoBar and provide your own.

```html
<InfoBar>
    <!-- https://github.com/microsoft/fluentui-system-icons -->
    <svg slot="icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z" fill="currentColor" />
    </svg>
</InfoBar>
```

## Component API

<APIDocs {data} />
