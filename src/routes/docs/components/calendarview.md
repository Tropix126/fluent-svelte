<script lang="ts">
    import { CalendarView, ComboBox, InfoBar } from "$lib";
    import { CalendarViewItem } from "$lib/internal";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/CalendarView/CalendarView.svelte?sveld&raw";

    let viewExample = "days";
</script>

A calendar view lets a user view and interact with a calendar that they can navigate by month, year, or decade. A user can select a single date or multiple dates.

```ts
import { CalendarView } from "fluent-svelte";
```

<Showcase style="block-size: 480px">
    <CalendarView on:keydown={e => e.stopPropagation()} on:dblclick={e => e.stopPropagation()} on:mousedown={e => e.stopPropagation()} />
</Showcase>

## Usage

### Controlling Value

Selections made in the calendar can be controlled using the `value` property, which outputs a `Date` object or array of `Date` objects. When the user clicks an item in the calendar, the `value` property is updated to reflect the selection. `value` can also be `null` or `undefined` to indicate no selection or a selection cleared by the user.

This CalendarView will be initialized with a value of March 3, 2020.

```svelte hideScript
<CalendarView value={new Date(2020, 2, 3)} />
```

You can also use two-way binding to programatically work with the value of the calendar.

```svelte example
<script>
	import { Button, CalendarView } from "fluent-svelte";

	let value = new Date(); // The current date
</script>

<CalendarView bind:value />

Current value: {value?.toLocaleDateString()}

<Button on:click={() => (value = null)}>Clear Value</Button>
```

### Multiple Selections

CalendarView can also accept more than one value. To initially select multiple dates, pass an array of `Date` objects to the `value` property rather than a single `Date`.

```svelte
<CalendarView value={[new Date(2022, 2, 3), new Date(2022, 2, 4)]} />
```

This will render the calendar with March 3 and 4 selected, but as soon as the user attempts to choose another date, the previous selections will be cleared and `value` will be set back to a single date that the user chooses.

To allow the user to pick multiple dates at once, set the `multiple` property to `true`.

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<CalendarView multiple value={[new Date(2022, 2, 3), new Date(2022, 2, 4)]} />
```

<InfoBar title="Multiple selections will always be arrays." severity="caution">
    In multiple mode, the <code>value</code> property will always be an array of <code>Date</code>s. If you pass a single date into <code>value</code> initially in multiple mode, it will be converted to an array containing that date once a second selection is made.
</InfoBar>

### Minimum and Maximum Values

You can limit the range of dates that can be selected by the user using the `min` and `max` properties. These properties are both `Date` objects representing the earliest and latest dates that can be selected. If the user attempts to click a date outside of the range, the calendar will not allow the selection.

In this example, the user will only be able to select dates in the year of 2020.

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<CalendarView min={new Date(2020, 0, 1)} max={new Date(2020, 11, 31)} />
```

### Localization

Many elements of a calendar need to vary across languages. By default, the calendar automatically localizes itself based on the browser's `navigator.language` using the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

If you only want the calendar to render in a specific locale, you can pass in a locale string to the `locale` property.

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<CalendarView locale="ja-JP" />
```

Many places additionally have different starting days of the week. The JavaScript `Date` object starts it's weeks on Sunday, but you can customize the starting day of the calendar's week using the `weekStart` property. `weekStart` accepts a number between 0 and 6 (zero is sunday, six is saturday).

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<!-- Week will start on Monday (1) instead of Sunday (0). -->
<CalendarView weekStart={1} />
```

### "Blackout" Dates

In some cases, it might be desirable to prevent the user from selecting a specific day (or days) in the calendar. This can be done by passing in an array of dates to the `blackout` property.

<InfoBar severity="information" title="This property only affects user interaction.">
    Dates excluded using the <code>blackout</code> property do not affect <i>you</i>, the developer from manually setting values to those dates. This propertly only prevents the user from conventionally picking excluded dates themselves.
</InfoBar>

In this example, the user will be able to select all dates _except_ for March 7, 2022 and March 9, 2022.

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<CalendarView
	value={new Date(2022, 2, 1)}
	blackout={[new Date(2022, 2, 7), new Date(2022, 2, 9)]}
/>
```

### Views

To aid with navigating long ranges of dates, a user can click the CalendarView's main header to switch the _view_. This lets the user quickly navigate through days, months, or years.

<ComboBox style="margin-block-end: 12px; min-inline-size: 100px;" bind:value={viewExample} placeholder="View" items={[
{
name: "days",
value: "days"
},
{
name: "months",
value: "months"
},
{
name: "years",
value: "years"
}
]} />

<br />

<CalendarView bind:view={viewExample} />

<br /><br />

You can control the current view that the calendar is in using the `view` property, which can be set to either `days`, `months`, or `years`. Setting the `view` property will not prevent the user from manually changing the view by clicking the header.

For example, this will start the calendar in the `months` view:

```svelte
<CalendarView view="months" />
```

### Item Headers

You can choose display indicator labels for the first day of a month, or first month of a year (depending on the current view) by setting the `headers` property.

-   When in days view, the first day of a given month will have a header with the month's name above it.
-   When in months view, the first month of a given year will have the year labeled above it.

```svelte example hideScript
<script>
	import { CalendarView } from "fluent-svelte";
</script>

<CalendarView headers />
```

| No Headers                                                                                                                                  | Headers                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <CalendarViewItem current>1</CalendarViewItem> <CalendarViewItem selected>1</CalendarViewItem>                                              | <CalendarViewItem current header="Jan">1</CalendarViewItem> <CalendarViewItem selected header="Jan">1</CalendarViewItem>                                               |
| <CalendarViewItem current variant="monthYear">Jan</CalendarViewItem> <CalendarViewItem  selected variant="monthYear">Jan</CalendarViewItem> | <CalendarViewItem current variant="monthYear" header="2022">Jan</CalendarViewItem> <CalendarViewItem selected variant="monthYear" header="2022">Jan</CalendarViewItem> |

## Component API

<APIDocs manualForward {data} />
