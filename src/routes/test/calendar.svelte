<script lang="ts">
	import { CalendarDatePicker } from "$lib";

	let value = new Date();
</script>

<div class="test-container">
	<CalendarDatePicker />
</div>

<style>
	.test-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }
</style>