<script lang="ts">
	import { CalendarDatePicker } from "$lib";

	let value = new Date();
</script>

<div class="test-container">
	<CalendarDatePicker />
</div>

<style>
	.test-container {
        padding-top: 20vh;
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }
</style>