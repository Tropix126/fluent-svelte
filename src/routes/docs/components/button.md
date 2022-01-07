A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus.

```ts
import { Button } from "fluent-svelte";
```

## Usage

A button can either be a clickable action or a link. By default, a button will be rendered as a standard HTML `<button>` element. If an `href` prop is provided, the button will be converted into an `<a>` tag.

### Styles

Buttons come in three possible _variants_ - `standard`, `accent` and `hyperlink`. Variants can be specified using the `variant` prop.

|  Variant  | Usage                                                                        |
|:---------:|:-----------------------------------------------------------------------------|
| Standard  | Secondary or alternative actions that are not important to the user.         |
|  Accent   | Actions that are important to the user, or are the primary focus a decision. |
| Hyperlink | Low-emphasis, tertiary actions that link to an external resource.            |

### Disabled Buttons

If the button is not meant to be clicked, you can use the `disabled` prop to visually indicate this. If a button is disabled, the button will be unclickable and the `href` prop will be ignored.