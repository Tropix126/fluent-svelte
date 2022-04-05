<script lang="ts">
    import { InfoBadge, Button } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/InfoBadge/InfoBadge.svelte?raw&sveld";

    const severities = ["information", "attention", "success", "caution", "critical"];
</script>

InfoBadges are a non-intrusive and intuitive way to display notifications or bring focus to an area within an app - whether that be for notifications, indicating new content, or showing an alert.

```ts
import { InfoBadge } from "fluent-svelte";
```

<Showcase repl="ce7c58c352e24e84ad6838663e6dcd4e" columns={5}>
    {#each severities as severity}
        <InfoBadge {severity} />
    {/each}
    {#each severities as severity}
        <InfoBadge {severity}>{Math.floor(Math.random() * 10)}</InfoBadge>
    {/each}
</Showcase>

## Usage

### Severity

InfoBadges can take in a `severity` prop, which represent the type of information you wish to convey to the user. The default severity is `attention`.

| Severity      | Preview                              |
| ------------- | ------------------------------------ |
| `attention`   | <InfoBadge severity="attention" />   |
| `information` | <InfoBadge severity="information" /> |
| `success`     | <InfoBadge severity="success" />     |
| `caution`     | <InfoBadge severity="caution" />     |
| `critical`    | <InfoBadge severity="critical" />    |

### Custom Content

The default badge glyph can be overrided with your own content. This can be useful if you wish display text, or an alert count. Passing HTML content into the default slot will override the glyph with said content.

```svelte example hideScript
<script>
	import { InfoBadge } from "fluent-svelte";
</script>

<InfoBadge>99</InfoBadge>
<InfoBadge severity="critical">bazinga</InfoBadge>
```

## Component API

<APIDocs {data} />
