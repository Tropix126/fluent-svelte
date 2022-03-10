<script lang="ts">
    import { CalendarView, Flyout, Button } from "$lib/index";

    export let value: Date | null;
    
    export let open = false;

    export let locale: string = undefined;

    function handleKeyDown(event) {
        event.stopPropagation();
        if (event.key === "Escape") open = false;
    }
</script>

<Flyout placement="bottom" class="calendar-date-picker-container" bind:open>
    <Button class="calendar-date-picker-button">
        {value?.toLocaleDateString(locale) ?? "Select a date"}
    </Button>
    <CalendarView
        slot="override"
        class="calendar-date-picker-calendar"
        multiple={false}
        __floating
        on:keydown={handleKeyDown}
        on:change={() => open = false}
        bind:value
        {...$$restProps}
    />
</Flyout>