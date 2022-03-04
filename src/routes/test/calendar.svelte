<script lang="ts">
	import { CalendarView } from "$lib";

	let value = new Date();
</script>

<br /><br /><br /><br />

{JSON.stringify(value)}

<br /><br />

<CalendarView headers min={new Date()} blackout={[new Date(2022, 2, 1)]} bind:value />