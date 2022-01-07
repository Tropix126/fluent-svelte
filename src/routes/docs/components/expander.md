<script lang="ts">
    import { Expander } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/Expander/Expander.svelte?raw&sveld";
</script>

Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header.

```ts
import { Expander } from "fluent-svelte";
```

<Showcase style="block-size: 360px;" repl="0fde4983fdc841d8b7320143ee3d50d7">
    <Expander>
        Expander
        <svelte:fragment slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </svelte:fragment>
    </Expander>
    <Expander>
        <svg slot="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99976 5C6.99976 2.79086 8.79063 1 10.9998 1C11.5085 1 11.9963 1.09524 12.4453 1.26931C12.6029 1.3304 12.7189 1.46698 12.7538 1.63235C12.7886 1.79773 12.7376 1.96953 12.6181 2.08904L10.7071 4.00012L12 5.29302L13.9109 3.38207C14.0304 3.26254 14.2022 3.2115 14.3676 3.24637C14.533 3.28125 14.6695 3.39732 14.7306 3.55493C14.9046 4.0038 14.9998 4.49138 14.9998 5C14.9998 7.20914 13.2089 9 10.9998 9C10.6197 9 10.2513 8.94684 9.90202 8.84736L4.89554 13.9192C4.18159 14.6425 3.0368 14.7101 2.24276 14.0757C1.32864 13.3455 1.24076 11.9872 2.05315 11.1453L7.10399 5.91061C7.03576 5.61771 6.99976 5.31279 6.99976 5ZM10.9998 2C9.34291 2 7.99976 3.34315 7.99976 5C7.99976 5.31548 8.04829 5.61868 8.13793 5.90305C8.19301 6.07781 8.14809 6.26869 8.02087 6.40054L2.77278 11.8396C2.36947 12.2576 2.4131 12.9319 2.86691 13.2944C3.2611 13.6093 3.82943 13.5758 4.18386 13.2167L9.40805 7.9243C9.5469 7.78364 9.75557 7.73797 9.94048 7.80777C10.2692 7.93186 10.6259 8 10.9998 8C12.6566 8 13.9998 6.65685 13.9998 5C13.9998 4.9056 13.9954 4.81228 13.9869 4.72023L12.3535 6.35368C12.2598 6.44745 12.1326 6.50013 12 6.50013C11.8674 6.50013 11.7402 6.44745 11.6464 6.35368L9.64643 4.35368C9.45117 4.15842 9.45117 3.84185 9.64642 3.64658L11.2801 2.01289C11.1878 2.00436 11.0943 2 10.9998 2Z" fill="currentColor" /></svg>
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

```html
<Expander>
    Header
    <svelte:fragment slot="content">
        Content
    </svelte:fragment>
</Expander>
```

### Controlling Expansion

Expanders can be either expanded or collapsed. This can be controlled by setting the `expanded` property.

```html
<Expander expanded>
    I am expanded by default.
</Expander>
```

### Directions

An expander doesn't have to expand downwards. You can control an expander's expansion direction using the `direction` property. To create an upwards-expanding expander, set `direction` to `up`.

```html
<Expander direction="up">
    I am expanded by default.
</Expander>
```

### Adding an Icon

You can easily add an icon to an expander's header using the `icon` slot. Passing in an SVG element will render it into the header with 16x16 dimensions.

```html
<Expander>
    <!-- https://github.com/microsoft/fluentui-system-icons -->
    <svg slot="icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z" fill="currentColor" />
    </svg>
    Expander
    <svelte:fragment slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </svelte:fragment>
</Expander>
```

## Component API

<APIDocs {data} />