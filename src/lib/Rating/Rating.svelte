<script lang="ts">
	import RatingStar from "./RatingStar.svelte";

	export let value = 1;
	export let max = 5;
	export let id: string;
	export let disabled = false;
	export let variant: "default" | "user" = "default";

	let previewValue = undefined;

	const setValue = (i: number) => {
		if (!disabled) value = i;
	};

	const setPreviewValue = (i: number) => {
		if (!disabled) previewValue = i;
	};

	const handleKeyNav = (event: KeyboardEvent) => {
		if (event.key === "ArrowUp" || event.key === "ArrowRight") {
			event.preventDefault();
			setValue(value + 1);
		} else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
			event.preventDefault();
			setValue(value - 1);
		}
	};
</script>

<div class="rating" {id}>
	<label class:disabled for="rating-{id}" on:keydown={handleKeyNav}
	       tabindex={!disabled ? "0" : "-1"}>
		{#each Array(max) as _, n}
			<RatingStar filled={n < value && !previewValue} {disabled} accent={variant === 'user'}
			            preview={!!previewValue && n < previewValue}
			            on:click={() => setValue(n + 1)}
			            on:mouseover={() => setPreviewValue(n + 1)}
			            on:mouseleave={() => setPreviewValue(undefined)}
			/>
		{/each}
		<input bind:value class:disabled {disabled}
		       id="rating-{id}" max={max} min={1}
		       name="rating-{id}" type="range"
		/>
	</label>
	<span class="rating-label" class:disabled>
		<slot />
	</span>
</div>

<style lang="scss">
	@use "../mixins" as *;

	.rating {
		@include flex($justify: start, $align: center);

		input {
			display: none;
			visibility: hidden;
		}

		label {
			cursor: pointer;

			//&:focus {	outline: none }
			&.disabled { cursor: auto }
		}

		&-label {
			@include control-typography;
			margin-block-end: 4px;
			margin-inline-start: 8px;

			&.disabled { color: var(--fds-text-disabled) }
		}
	}
</style>