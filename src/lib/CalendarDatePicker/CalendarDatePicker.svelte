<script lang="ts">
    import { CalendarView, Flyout, Button } from "$lib/index";

    export let value: Date | null;
    
    export let open = false;

    function handleKeyDown(event) {
        event.stopPropagation();
        if (event.key === "Escape") open = false;
    }
</script>

<Flyout position="bottom" class="calendar-date-picker-container" bind:open>
    <Button class="calendar-date-picker-button">
        {value?.toLocaleDateString()}
    </Button>
    <CalendarView
        on:keydown={handleKeyDown}
        class="calendar-date-picker-calendar"
        bind:value
        slot="override"
        multiple={false}
        __floating
        on:change
        {...$$restProps}
    />
</Flyout>