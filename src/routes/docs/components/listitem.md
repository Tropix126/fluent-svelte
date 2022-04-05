<script lang="ts">
    import { ListItem } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import Circle from "@fluentui/svg-icons/icons/circle_16_regular.svg?raw";

    import data from "$lib/ListItem/ListItem.svelte?raw&sveld";
</script>

List Items display data stacked vertically in a single column. List Items work better for items that have text as a focal point, and for collections that are meant to be read top to bottom (i.e. alphabetically ordered). A few common use cases for List Items include lists of messages and search results.

```ts
import { ListItem } from "fluent-svelte";
```

<Showcase repl="">
    <div style="inline-size: 240px">
        <ListItem>ListItem</ListItem>
        <ListItem>
            <svelte:fragment slot="icon">
                {@html Circle}
            </svelte:fragment>
            ListItem
        </ListItem>
        <ListItem selected>ListItem</ListItem>
        <ListItem disabled>ListItem</ListItem>
    </div>
</Showcase>

## Usage

A ListItem is either a general-purpose item or a link. By default, an item will be rendered as a standard HTML `<li>` element. If an `href` property is provided, the item will be converted into an `<a>` tag.

### Selecting Items

An item can be marked as _selected_ to indicate that it a currently active option. To do this, use the `selected` property.

```svelte example hideScript
<script>
	import { ListItem } from "fluent-svelte";
</script>

<ListItem selected>Text</ListItem>
```

You can also listen to the `select` event, which is dispatched when the `selected` property is changed to a truthy value.

### Disabled Items

If the item is not meant to be clicked, you can use the `disabled` property to visually indicate this. If an item is disabled, it will be unclickable and the `href` prop will be ignored.

```svelte example hideScript
<script>
	import { ListItem } from "fluent-svelte";
</script>

<ListItem disabled>Text</ListItem>
```

### Adding an Icon

You can easily add an icon to an item using the `icon` slot. Passing in an SVG element will render it before any contents with 16x16 dimensions.

```svelte example hideScript
<script>
	import { ListItem } from "fluent-svelte";
</script>

<ListItem>
	<!-- https://github.com/microsoft/fluentui-system-icons -->
	<svg slot="icon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z"
			fill="currentColor"
		/>
	</svg>
	Text
</ListItem>
```

### ARIA Roles

For the purposes of accessibly adapting ListItems to certain use-cases, a `role` property has been exposed to override the default [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques) of the item, which is `listitem`.

## Component API

<APIDocs {data} />
