<script lang="ts">
    import { Button, PersonPicture, InfoBadge } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/PersonPicture/PersonPicture.svelte?sveld&raw";
</script>

The person picture control displays the avatar image for a person, if one is available; if not, it displays the person's initials or a generic glyph. You can additionally insert your own badge at the top of the picture, and provide your own inner content.

```ts
import { PersonPicture } from "fluent-svelte";
```

<Showcase repl="46c25d4df2414602878cb7a1d7d47194" columns={4}>
    <PersonPicture src="https://thispersondoesnotexist.com/image" alt="Random person">
        {Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .toUpperCase()
            .substr(0, 2)}
    </PersonPicture>
    <PersonPicture src="https://thispersondoesnotexist.com/image" alt="Random person" size={48} />
    <PersonPicture>
        {Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .toUpperCase()
            .substr(0, 2)}
        <svelte:fragment slot="badge">
            <InfoBadge>1</InfoBadge>
        </svelte:fragment>
    </PersonPicture>
    <PersonPicture alt="A A A" />
</Showcase>

## Usage

### Setting a Photo

Similarly to HTML's [`<img />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) element, you can set the `src` property to a URL of an image.

```svelte example hideScript
<script>
	import { PersonPicture } from "fluent-svelte";
</script>

<PersonPicture src="https://source.unsplash.com/random" />
```

It's recommended for both accessibility and fallback purposes that you provide an `alt` property for the image as well. The `alt` attribute is used by screen readers to provide a description of the image to visually impaired users.

```svelte example hideScript
<script>
	import { PersonPicture } from "fluent-svelte";
</script>

<PersonPicture
	alt="Dog runs through the snow"
	src="https://images.unsplash.com/photo-1530126483408-aa533e55bdb2"
/>
```

Additionally, if `src` is invalid and no slot text is inserted, the alt text will be converted to initials format as a fallback.

```svelte example hideScript
<script>
	import { PersonPicture } from "fluent-svelte";
</script>

<PersonPicture src="not-a-real-domain" alt="John Smith" />
```

### Custom Text

If no `src` is provided, you can provide your own text to be displayed in the control. The order of display is:

1. If a valid image URL in `src` is provided, it will be displayed.
2. If the `src` attribute fails to display or is invalid, the text or HTML is passed into the default slot will be displayed.
3. If `src` is invalid, no slots are used, but an `alt` property is provided, the alt text will be converted to initials format and displayed.

```svelte example hideScript
<script>
	import { PersonPicture } from "fluent-svelte";
</script>

<div style="display: flex; gap: 12px;">
	<PersonPicture>RDJ</PersonPicture>
	<PersonPicture src="not-a-real-domain" alt="Robert Downey Jr." />
</div>
```

### Badges

You can use the component's `badge` slot to insert an offset element at the top of the picture. It's recommended that you use the [`InfoBadge`](infobadge) component for this.

```svelte example
<script>
	import { InfoBadge, PersonPicture } from "fluent-svelte";

	let messages = 4;
</script>

<PersonPicture src="https://thispersondoesnotexist.com/image" alt="John Smith">
	<InfoBadge slot="badge">{messages}</InfoBadge>
</PersonPicture>
```

### Size

You can control the dimensions of the picture in pixels by setting the `size` property. The default size is `72`.

```svelte example hideScript
<script>
	import { PersonPicture } from "fluent-svelte";
</script>

<PersonPicture size={8} />
<PersonPicture size={16} />
<PersonPicture size={32} />
<PersonPicture size={64} />
```

## Component API

<APIDocs {data} />
