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

### Localization

Many elements of a calendar need to vary across languages. By default, the calendar automatically localizes itself based on the browser's `navigator.language` using the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

If you only want the calendar to render in a specific locale, you can pass in a locale string to the `locale`.

```html
<CalendarView locale="en-US" />
```

Many places additionally have different starting days of the week. The JavaScript `Date` starts it's weeks on Sunday, but you can customize the starting day of the calendar's week using the `weekStart` property, which accepts a number between 0 and 6 (zero is sunday, six is saturday).

```html
<!-- Week will start on Monday (1) instead of Sunday (0). -->
<CalendarView weekStart={1} />
```

### "Blackout" dates

In some cases, it might be desirable to prevent the user from selecting a specific day (or days) in the calendar. This can be done by passing in an array of dates to the `blackout` property.

<InfoBar severity="information" title="This property only affects user interaction.">
    Dates excluded using the <code>blackout</code> property do not affect <i>you</i>, the developer from manually setting values to those dates. This propertly only prevents the user from conventionally picking excluded dates themselves.
</InfoBar>

In this example, the user will be able to select all dates *except* for March 7, 2022 and March 9, 2022.

```html
<CalendarView
    value={new Date(2022, 2, 1)}
    blackout={[new Date(2022, 2, 7), new Date(2022, 2, 9)]}
/>
```

### Views

To aid with navigating long ranges of dates, a user can click the CalendarView's main header to switch the *view*. This lets the user quickly navigate through days, months, or years.

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

```html
<CalendarView view="months" />
```

### Item Headers

You can choose display indicator labels for the first day of a month, or first month of a year (depending on the current view) by setting the `headers` property.
- When in days view, the first day of a given month will have a header with the month's name above it.
- When in months view, the first month of a given year will have the year labeled above it.

```html
<CalendarView headers />
```

| No Headers                                                                                                                                  | Headers                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <CalendarViewItem current>1</CalendarViewItem> <CalendarViewItem selected>1</CalendarViewItem>                                              | <CalendarViewItem current header="Jan">1</CalendarViewItem> <CalendarViewItem selected header="Jan">1</CalendarViewItem>                                               |
| <CalendarViewItem current variant="monthYear">Jan</CalendarViewItem> <CalendarViewItem  selected variant="monthYear">Jan</CalendarViewItem> | <CalendarViewItem current variant="monthYear" header="2022">Jan</CalendarViewItem> <CalendarViewItem selected variant="monthYear" header="2022">Jan</CalendarViewItem> |

## Component API

<APIDocs {data} />