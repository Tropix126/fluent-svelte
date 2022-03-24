<script>
    import { InfoBar } from "$lib";
</script>

Welcome to the Fluent Svelte documentation! This page will explain the basic concepts and usage of the library.

### What is this?

`fluent-svelte` is a [Svelte](http://svelte.dev/) component UI library that emulates the look and feel of [Microsoft's Windows UI Controls](https://github.com/microsoft/microsoft-ui-xaml/) which conform to the Fluent Design System.

<InfoBar
    severity="caution"
    title="Before We Begin"
    message="This is not a 1-to-1 re-implementation of WinUI, but rather a faithful attempt to emulate the look and feel of WinUI on the web. Some controls will have API or behaviorial differences, but the overall look and feel should be very similar."
/>

### Features

-   [SvelteKit](https://kit.svelte.dev/) and SSR Compatible
-   [TypeScript](https://typescriptlang.org/) and type definitions are supported, but optional.
-   Full RTL support with no additional configuration.
-   All components are accessible according to [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) standards.
-   Theming support using CSS custom properties.
-   Minimal third-party dependency usage.
-   Reduced motion support.
-   Easy setup. Just install the library, add some base styles, and you're ready to go.
-   Minimal CSS overhead. Styles are included and scoped alongside their respective components, only bundling the CSS you need.

### Undocumented Components

This documentation site is still not entirely finished. Many components exported in the library are not yet documented. That progress can be tracked [here](https://github.com/Tropix126/fluent-svelte/issues/13). For now, i've setup a testing page with every component included in the library that is viewable [here](https://fluent-svelte.vercel.app/test). It's source can be viewed [here](https://github.com/Tropix126/fluent-svelte/blob/main/src/routes/test/index.svelte).

Please keep in mind that any undocumented component is _considered to be in the 0.x phase of development_. This means that they could potentially recieve breaking API changes or be heavily updated before being finalized.

### Changelog

See [CHANGELOG.md](https://github.com/Tropix126/fluent-svelte/blob/main/CHANGELOG.md).
