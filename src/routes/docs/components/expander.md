<script lang="ts">
    import { Expander } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import Circle from "@fluentui/svg-icons/icons/circle_16_regular.svg?raw";

    import data from "$lib/Expander/Expander.svelte?raw&sveld";
</script>

Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header.

```ts
import { Expander } from "fluent-svelte";
```

<Showcase style="block-size: 360px;" repl="78aa3269aba34022a958311963520428">
    <Expander>
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
    <Expander>
        <svelte:fragment slot="icon">
            {@html Circle}
        </svelte:fragment>
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
    <Expander direction="up">
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
</Showcase>

## Usage

A basic expander expects a header and contents. The expander's default slot will be rendered into the header, while content can be rendered into the `content` slot.

```svelte example
<script>
	import { Expander } from "fluent-svelte";
</script>

<Expander>
	Header
	<svelte:fragment slot="content">Content</svelte:fragment>
</Expander>
```

### Controlling Expansion

Expanders can be either expanded or collapsed. This can be controlled by setting the `expanded` property.

```svelte example
<script>
	import { Expander } from "fluent-svelte";
</script>

<Expander expanded>
	I am expanded by default.
	<svelte:fragment slot="content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</svelte:fragment>
</Expander>
```

### Directions

An expander doesn't have to expand downwards. You can control an expander's expansion direction using the `direction` property. To create an upwards-expanding expander, set `direction` to `up`.

```svelte example
<script>
	import { Expander } from "fluent-svelte";
</script>

<Expander direction="up">
	This expander will expand upwards.
	<svelte:fragment slot="content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</svelte:fragment>
</Expander>
```

### Adding an Icon

You can easily add an icon to an expander's header using the `icon` slot. Passing in an SVG element will render it into the header with 16x16 dimensions.

```svelte example hideScript
<script>
	import { Expander } from "fluent-svelte";
</script>

<Expander>
	<!-- https://github.com/microsoft/fluentui-system-icons -->
	<svg slot="icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z"
			fill="currentColor"
		/>
	</svg>
	Expander
	<svelte:fragment slot="content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</svelte:fragment>
</Expander>
```

## Component API

<APIDocs {data} />
