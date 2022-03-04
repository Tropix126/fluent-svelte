<script lang="ts">
	import { CalendarView } from "$lib";

	let value = new Date();
</script>

<br /><br /><br /><br />

{JSON.stringify(value)}

<br /><br />

<CalendarView headers min={new Date(2021, 11, 9)} max={new Date(2022, 3, 1)} blackout={[new Date(2022, 2, 1)]} bind:value />