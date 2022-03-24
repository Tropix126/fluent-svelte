<h1 align="center">
  <img src="https://raw.githubusercontent.com/Tropix126/fluent-svelte/e78982fb9fa48a6ea0b7cc61f4ff8fae9df88db3/static/logo.svg" width="72" height="128" />
  <br />
  Fluent Svelte
</h1>

> Warning: This project is still in alpha stages; I would not consider it production ready _yet_. Assume any undocumented component to be in the 0.x. phase of development and therefore unstable.

### What is this?

`fluent-svelte` is an experimental [Svelte](http://svelte.dev/) component UI library that emulates the look and feel of [Microsoft's Windows UI Controls](https://github.com/microsoft/microsoft-ui-xaml/) which conform to the Fluent Design System.

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

The documentation site (https://fluent-svelte.vercel.app/) is still not entirely finished. Many components exported in the library are not yet documented. That progress can be tracked [here](https://github.com/Tropix126/fluent-svelte/issues/13). For now, i've setup a testing page with every component included in the library that is viewable [here](https://fluent-svelte.vercel.app/test). It's source can be viewed [here](https://github.com/Tropix126/fluent-svelte/blob/main/src/routes/test/index.svelte).

Please keep in mind that any undocumented component is _considered to be in the 0.x phase of development_. This means that they could potentially recieve breaking API changes or be heavily updated before being finalized.

### Changelog

See [CHANGELOG.md](https://github.com/Tropix126/fluent-svelte/blob/main/CHANGELOG.md).
