# fluent-svelte Changelog

# 1.6.0
- Corrected an issue with styling usage in `ProgressRing`.
- Minor improvements and interaction fixes in `ComboBox`.
- Exposed `<Flyout>` props to `CalendarDatePicker`.
- Use `<svelte:element>` in areas that are applicable.

# 1.5.1

- CalendarDatePicker now correctly resolves `../Flyout/FlyoutWrapper.svelte`.

## 1.5.0

-   Added `CalendarDatePicker` component.
-   CalendarView now forwards DOM events to it's outer container.
-   CalendarView pages will no longer start out of bounds if the first `value` provided is less than the `min` property or greater than the `max` property.
-   `change` events are now correctly fired from CalendarView.
-   Reverted a change that broke resolving internal components from `$lib/index.ts`. This mainly affects the REPL.
-   `className` on `Flyout` and `MenuFlyout` is now placed on the wrapper element rather than the flyout surface.
-   Fixed a minor bug where the user could momentarily click the `MenuFlyout` trigger button when closing the flyout, which would immediately reopen it.
-   The fly animation for `Flyout` is no longer tied to the surface element, making it present when the `override` slot is used.
-   Fixed a minor bug where the `CalendarView` table element would not appear until 150ms after it's initial rendering.
-   `MenuFlyout` and `ContextMenu` now correctly handle the <kbd>Home</kbd> and <kbd>End</kbd> keys when navigating items.
-   Updated the system font stack to include Helvetica.

## 1.4.1

-   **Breaking**: ComboBox now handles `value` differently. For more information, see [issue #25](https://github.com/Tropix126/fluent-svelte/issues/25).
-   Fixed a bug where `CalendarView` would throw an error if it wasn't initialized with a value.

## 1.4.0

-   Sliders now correctly dispatch `change` events.
-   Slider thumbs are now bound within the track contents, rather than overflowing by half their width.
-   Added `CalendarView` component.
-   Fallback font stack now includes `ui-sans-serif`, `-apple-system`, and `BlinkMacSystemFont`.

## Start of Changelog

Past releases do not have a documented changelog.
