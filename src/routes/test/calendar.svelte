<script lang="ts">
	import { CalendarView } from "$lib";

    let value = new Date();
</script>

<br /><br /><br /><br />

{JSON.stringify(value)}

<br /><br />

<CalendarView headers blackout={[new Date()]} bind:value />