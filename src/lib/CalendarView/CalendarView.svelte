<script lang="ts">
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { fly } from "svelte/transition";
	import { circOut } from "svelte/easing";
	import { get_current_component } from "svelte/internal";
	import { createEventForwarder, getCSSDuration } from "../internal";

	import CalendarViewItem from "./CalendarViewItem.svelte";

	type View = "days" | "months" | "years";
	type AnimationDirection = "up" | "down" | "neutral";
	type DateTimeWeekdayFormat = "long" | "short" | "narrow";
	type DateTimeMonthFormat = "long" | "short" | "narrow" | "numeric" | "2-digit";
	type DateComparisonPrecision = "time" | "day" | "month" | "year" | "decade";

	interface WeekdayLocaleOptions {
		locale?: string;
		format?: DateTimeWeekdayFormat;
		offset?: number;
	}

	interface MonthLocaleOptions {
		locale?: string;
		format?: DateTimeMonthFormat;
	}

	interface FocusIncrementAmount {
		ArrowUp: number;
		ArrowDown: number;
		ArrowLeft: number;
		ArrowRight: number;
	}

	/** Locale code used for specifying the language of the calendar. If unset, the locale will be automatically inferred from `navigator.language`. */
	export let locale: string = undefined;

	/** Determines if multiple dates can be manually selected by the user. */
	export let multiple = false;

	/** Controls whether header text will be shown above items representing the first day of a month or the first month of a year. */
	export let headers = false;

	/** The currently selected calendar date(s). */
	export let value: Date | Date[] | null = null;

	/** Array of specifically excluded dates that cannot be selected by the user. */
	export let blackout: Date[] = undefined;

	/** The minimum date that can be manually selected by the user. */
	export let min: Date = undefined;

	/** The maximum date that can be manually selected by the user. */
	export let max: Date = undefined;

	/** The selection view that the calendar will start in. Views can be manually changed by the user when clicking the calendar's header. */
	export let view: View = "days";

	/** Number representing the day that the calendar week starts on. 0 is sunday, 6 is saturday. */
	export let weekStart = 0;

	/** INTERNAL USE ONLY: Applies flyout styles to the outer CalendarView container. */
	export let __floating = false;

	/** Specifies a custom class name for the calendar's outer container element. */
	let className = "";
	export { className as class };

	/** Obtains a bound DOM reference to the calendar's outer container element. */
	export let element: HTMLDivElement = null;

	const dispatch = createEventDispatcher();
	const forwardEvents = createEventForwarder(get_current_component(), ["change"]);
	const bodyElementBinding = node => (bodyElement = node); // bind:this breaks with our page transition for some reason

	let header = "";
	let viewAnimationDirection: AnimationDirection = "neutral";
	let pageAnimationDirection: AnimationDirection = "neutral";
	let pageAnimationDuration = 0;
	let bodyElement: HTMLTableSectionElement = null;
	let firstValue = Array.isArray(value) ? value[0] : value;
	let page =
		(!min || firstValue >= min) && (!max || firstValue < max)
			? new Date(
					(firstValue ?? new Date()).getFullYear(),
					(firstValue ?? new Date()).getMonth(),
					1
			  )
			: firstValue < min
			? new Date(min.getFullYear(), min.getMonth(), 1)
			: new Date(max.getFullYear(), max.getMonth(), 1);

	$: firstValue = Array.isArray(value) ? value[0] : value;
	$: view, updatePage(0);
	$: nextPage = getPageByOffset(1, page, view);
	$: if (view === "days") {
		header = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "long"
		}).format(page);
	} else if (view === "months") {
		header = new Intl.DateTimeFormat(locale, {
			year: "numeric"
		}).format(page);
	} else if (view === "years") {
		const decadeStart = Math.floor(page.getFullYear() / 10) * 10;
		const decadeEnd = decadeStart + 9;

		// https://github.com/microsoft/TypeScript/issues/46905
		header = (<any>new Intl.DateTimeFormat(locale, {
			year: "numeric"
		})).formatRange(new Date(decadeStart, 0, 1), new Date(decadeEnd, 0, 1));
	}

	onMount(() => {
		pageAnimationDuration = getCSSDuration("--fds-control-slow-duration");
	});

	function getWeekdayLocale(
		day: number,
		{ locale = undefined, format = "long", offset = 0 }: WeekdayLocaleOptions = {}
	) {
		return new Intl.DateTimeFormat(locale, {
			weekday: format,
			timeZone: "UTC"
		}).format(new Date(Date.UTC(2000, 1, day + offset - 1)));
	}

	function getMonthLocale(
		month: number,
		{ locale = undefined, format = "long" }: MonthLocaleOptions = {}
	) {
		return new Intl.DateTimeFormat(locale, {
			month: format
		}).format(new Date(2000, month));
	}

	function getMonthLength(year: number, month: number) {
		return new Date(year, month + 1, 0).getDate() - 1;
	}

	function getMonthDays(year: number, month: number): Date[] {
		const days: Date[] = [];
		for (let i = 0; i < getMonthLength(year, month) + 1; i++) {
			days.push(new Date(year, month, i + 1));
		}
		return days;
	}

	function getYearMonths(year: number): Date[] {
		const days: Date[] = [];
		for (let i = 0; i < 12; i++) {
			days.push(new Date(year, i, 1));
		}
		return days;
	}

	function compareDates(a: Date, b: Date, precision: DateComparisonPrecision = "time") {
		switch (precision) {
			case "time":
				return a.getTime() === b.getTime();
			case "day":
				return (
					a.getFullYear() === b.getFullYear() &&
					a.getMonth() === b.getMonth() &&
					a.getDate() === b.getDate()
				);
			case "month":
				return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
			case "year":
				return a.getFullYear() === b.getFullYear();
			case "decade":
				return (
					Math.floor(a.getFullYear() / 10) * 10 === Math.floor(b.getFullYear() / 10) * 10
				);
		}
	}

	function indexOfDate(array: Date[], date: Date, precision: DateComparisonPrecision = "time") {
		return array.findIndex(d => compareDates(d, date, precision));
	}

	function getCalendarDays(date: Date): Date[] {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstWeekday = new Date(year, month, 1).getDay();
		const calendarRows = 6;

		let days: Date[] = [];
		let nextMonth = month + 1;
		let lastMonth = month - 1;
		let nextMonthYear = year;
		let lastMonthYear = year;

		const daysBefore = (firstWeekday - weekStart + 7) % 7;
		if (daysBefore > 0) {
			if (lastMonth === -1) {
				lastMonth = 11;
				lastMonthYear = year - 1;
			}
			days = getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
		}

		days = days.concat(getMonthDays(year, month));

		if (nextMonth === 12) {
			nextMonth = 0;
			nextMonthYear = year + 1;
		}

		const daysAfter = 7 * calendarRows - days.length;
		days = days.concat(getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter));

		return days;
	}

	function getCalendarMonths(date: Date): Date[] {
		const year = date.getFullYear();

		let months: Date[] = [];

		return months.concat(getYearMonths(year), getYearMonths(year + 1).slice(0, 4));
	}

	function getCalendarYears(date: Date): Date[] {
		const decadeStart = Math.floor(date.getFullYear() / 10) * 10;

		let years: Date[] = [];

		for (let i = 0; i < 12; i++) {
			years.push(new Date(decadeStart + i, 0, 1));
		}

		if (decadeStart % 20 === 0) {
			for (let i = 0; i < 2; i++) {
				years.unshift(new Date(decadeStart - (i + 1), 0, 1));
			}
			for (let i = 0; i < 4; i++) {
				years.push(new Date(decadeStart + i + 12, 0, 1));
			}
		} else {
			for (let i = 0; i < 6; i++) {
				years.push(new Date(decadeStart + i + 12, 0, 1));
			}
		}

		return years;
	}

	function getPageByOffset(offset: number, page: Date, view: View) {
		if (view === "days") {
			return new Date(page.getFullYear(), page.getMonth() + offset, 1);
		} else if (view === "months") {
			return new Date(page.getFullYear() + offset, 0, 1);
		} else if (view === "years") {
			return new Date(Math.floor(page.getFullYear() / 10) * 10 + offset * 10, 0, 1);
		}
	}

	function updatePage(amount: number = 0, directionOverride: AnimationDirection = undefined) {
		page = getPageByOffset(amount, page, view);
		if (directionOverride) {
			pageAnimationDirection = directionOverride;
			return;
		}
		if (amount <= -1) {
			pageAnimationDirection = "up";
		} else if (amount >= 1) {
			pageAnimationDirection = "down";
		} else {
			pageAnimationDirection = "neutral";
		}
	}

	function updateView(newView: View) {
		if (
			(view === "days" && newView === "months") ||
			(view === "months" && newView === "years")
		) {
			viewAnimationDirection = "up";
		} else if (
			(view === "years" && newView === "months") ||
			(view === "months" && newView === "days")
		) {
			viewAnimationDirection = "down";
		} else {
			viewAnimationDirection = "neutral";
		}

		pageAnimationDirection = "neutral";
		view = newView;
	}

	async function handleKeyDown(event: KeyboardEvent, date: Date) {
		const { key } = event;

		if (
			key === "ArrowUp" ||
			key === "ArrowDown" ||
			key === "ArrowLeft" ||
			key === "ArrowRight" ||
			key === "Home" ||
			key === "End"
		) {
			event.preventDefault();
		}

		if (event.ctrlKey && (key === "ArrowUp" || key === "ArrowDown")) {
			if (key === "ArrowUp") {
				updateView(view === "days" ? "months" : "years");
			} else if (key === "ArrowDown") {
				updateView(view === "years" ? "months" : "days");
			}
			return;
		}

		let focusOrder = bodyElement.querySelectorAll("button");
		let focusedDate = date;

		const focusIndex = Array.from(focusOrder).indexOf(
			<HTMLButtonElement>document.activeElement
		);

		if (focusOrder.length === 0) return;

		if (view === "days") {
			let focusIncrementAmount: FocusIncrementAmount = {
				ArrowUp: -7,
				ArrowDown: 7,
				ArrowLeft: -1,
				ArrowRight: 1
			};

			if (!focusIncrementAmount[key] || event.shiftKey) return;

			focusedDate = new Date(
				new Date(focusedDate).setDate(focusedDate.getDate() + focusIncrementAmount[key])
			);

			const nextDateIsBlackout = blackout && indexOfDate(blackout, focusedDate, "day") > -1;

			if (nextDateIsBlackout) {
				focusedDate.setDate(focusedDate.getDate() + focusIncrementAmount[key]);
			}

			const calendarDays = getCalendarDays(focusedDate);
			const newFocusedDate = calendarDays.find(day => compareDates(day, focusedDate, "time"));

			if (min > newFocusedDate || max < newFocusedDate) return;

			if (focusedDate.getMonth() !== page.getMonth()) {
				if (key === "ArrowLeft" || key === "ArrowUp") {
					updatePage(-1, "neutral");
				} else if (key === "ArrowRight" || key === "ArrowDown") {
					updatePage(1, "neutral");
				}

				await tick();
				focusOrder = bodyElement.querySelectorAll("button");
				focusedDate = newFocusedDate;
				focusOrder?.[calendarDays.indexOf(newFocusedDate)].focus();

				return;
			}

			focusOrder?.[
				focusIndex + focusIncrementAmount[key] * (nextDateIsBlackout ? 2 : 1)
			].focus();
		} else if (view === "months" || view === "years") {
			let calendar: Date[] = [];
			const focusIncrementAmount: FocusIncrementAmount = {
				ArrowUp: -4,
				ArrowDown: 4,
				ArrowLeft: -1,
				ArrowRight: 1
			};

			if (!focusIncrementAmount[key] || event.shiftKey) return;

			if (view === "months") {
				focusedDate = new Date(
					new Date(focusedDate).setMonth(
						focusedDate.getMonth() + focusIncrementAmount[key],
						1
					)
				);
			} else {
				focusedDate = new Date(
					new Date(focusedDate).setFullYear(
						focusedDate.getFullYear() + focusIncrementAmount[key]
					)
				);
			}

			calendar =
				view === "months" ? getCalendarMonths(focusedDate) : getCalendarYears(focusedDate);
			const newFocusedDate = calendar.find(day =>
				compareDates(day, focusedDate, view === "months" ? "month" : "year")
			);

			const aboveMinimumMonths =
				min?.getMonth() > newFocusedDate.getMonth() &&
				min?.getFullYear() === newFocusedDate.getFullYear();
			const aboveMinimumYears = min?.getFullYear() > newFocusedDate.getFullYear();

			if (
				(view === "months" ? aboveMinimumMonths : aboveMinimumYears) ||
				max < newFocusedDate
			)
				return;

			if (!compareDates(focusedDate, page, view === "months" ? "year" : "decade")) {
				if (key === "ArrowLeft" || key === "ArrowUp") {
					updatePage(-1, "neutral");
				} else if (key === "ArrowRight" || key === "ArrowDown") {
					updatePage(1, "neutral");
				}

				await tick();

				focusedDate = newFocusedDate;
				focusOrder = bodyElement.querySelectorAll("button");
				focusOrder?.[calendar.indexOf(newFocusedDate)].focus();

				return;
			}

			focusOrder?.[focusIndex + focusIncrementAmount[key]].focus();
		}
	}

	function selectDay(day) {
		if (multiple) {
			if (!Array.isArray(value)) {
				if (value !== null) {
					value = [value];
				} else {
					value = [day];
					return;
				}
			}
			if (indexOfDate(value, day) === -1) {
				value.push(day);
				value = value;
			} else {
				value = value
					.slice(0, indexOfDate(value, day))
					.concat(value.slice(indexOfDate(value, day) + 1));
			}
		} else {
			if (Array.isArray(value)) value = null;
			if (day.getTime() === (<Date>value)?.getTime()) {
				value = null;
			} else {
				value = day;
			}
		}
		dispatch("change", value);
	}

	function selectMonth(month: Date) {
		page = new Date(new Date(month.setDate(1)));
		updateView("days");
	}

	function selectYear(month: Date) {
		page.setFullYear(month.getFullYear());
		updateView("months");
	}

	function fadeScale(node, { delay = 0, duration = 0, easing = x => x, baseScale = 0 }) {
		const o = +getComputedStyle(node).opacity;
		const is = 1 - baseScale;

		return {
			delay,
			duration,
			css: t => {
				const eased = easing(t);
				return `opacity: ${eased * o}; transform: scale(${eased * is + baseScale})`;
			}
		};
	}
</script>

<!--
@component
A calendar view lets a user view and interact with a calendar that they can navigate by month, year, or decade. A user can select a single date or multiple dates. [Docs](https://fluent-svelte.vercel.app/docs/components/calendarview)
- Usage:
    ```tsx
    <CalendarView value={new Date(2022, 2, 14)} />
    ```
-->
<div
	class="calendar-view {className}"
	class:floating={__floating}
	use:forwardEvents
	bind:this={element}
	{...$$restProps}
>
	<header class="calendar-view-header">
		<div class="calendar-view-header-text" role="heading" aria-live="polite">
			<button
                on:click={() => updateView(view === "days" ? "months" : "years")}
                type="button"
				disabled={view === "years"}>{header}</button
			>
		</div>
		<div class="calendar-view-pagination-controls">
			<button type="button" disabled={view && min >= page} on:click={() => updatePage(-1)}>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.95681 10.998C4.14912 10.998 3.67466 10.09 4.13591 9.42698L6.76854 5.64257C7.36532 4.78469 8.63448 4.7847 9.23126 5.64257L11.8639 9.42698C12.3251 10.09 11.8507 10.998 11.043 10.998H4.95681Z"
					/>
				</svg>
			</button>
			<button type="button" disabled={max < nextPage} on:click={() => updatePage(1)}>
				<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.95681 5C4.14912 5 3.67466 5.90803 4.13591 6.57107L6.76854 10.3555C7.36532 11.2134 8.63448 11.2133 9.23126 10.3555L11.8639 6.57106C12.3251 5.90803 11.8507 5 11.043 5H4.95681Z"
					/>
				</svg>
			</button>
		</div>
	</header>
	<div class="calendar-view-table-wrapper">
		{#key view}
			<table
				class="calendar-view-table view-{view}"
				role="grid"
				in:fadeScale={{
					duration: viewAnimationDirection !== "neutral" ? 500 : 0,
					easing: circOut,
					baseScale: viewAnimationDirection === "up" ? 1.29 : 0.84,
					delay: viewAnimationDirection !== "neutral" ? 150 : 0
				}}
				out:fadeScale|local={{
					duration: viewAnimationDirection !== "neutral" ? 150 : 0,
					easing: circOut,
					baseScale: viewAnimationDirection === "up" ? 0.84 : 1.29,
					delay: 0
				}}
			>
				{#if view === "days"}
					<thead>
						<tr>
							{#each Array(7) as _, day}
								<th
									scope="col"
									{...{
										abbr: getWeekdayLocale(day, { locale, offset: weekStart })
									}}
								>
									{getWeekdayLocale(day, {
										locale,
										format: "short",
										offset: weekStart
									})}
								</th>
							{/each}
						</tr>
					</thead>
				{/if}
				{#key page}
					<tbody
						use:bodyElementBinding
						in:fly={{
							opacity: 1,
							duration: pageAnimationDuration,
							easing: circOut,
							y:
								pageAnimationDirection === "neutral"
									? 0
									: pageAnimationDirection === "up"
									? -198
									: 198
						}}
						out:fly|local={{
							opacity: 1,
							duration: pageAnimationDuration,
							easing: circOut,
							y:
								pageAnimationDirection === "neutral"
									? 0
									: pageAnimationDirection === "up"
									? 198
									: -198
						}}
					>
						{#if view === "days"}
							{#each Array(6) as _, week}
								<tr>
									{#each getCalendarDays(page).slice(week * 7, week * 7 + 7) as day, i}
										{@const selected =
											value !== null &&
											(Array.isArray(value)
												? indexOfDate(value, day, "day") > -1
												: compareDates(value, day, "day"))}
										{@const inMonth = compareDates(day, page, "month")}
										{@const firstFocusableDay = getCalendarDays(page).find(
											d =>
												compareDates(d, page, "month") &&
												(!blackout ||
													indexOfDate(blackout, d, "day") === -1) &&
												(!min || min <= d) &&
												(!max || max >= d)
										)}

										<td role="gridcell">
											<CalendarViewItem
												on:click={() => selectDay(day)}
												on:keydown={e => handleKeyDown(e, day)}
												outOfRange={!inMonth}
												current={compareDates(day, new Date(), "day")}
												disabled={min > day || max < day}
												blackout={blackout &&
													indexOfDate(blackout, day, "day") > -1}
												header={page &&
													headers &&
													day.getDate() === 1 &&
													getMonthLocale(day.getMonth(), {
														locale,
														format: "short"
													})}
												tabindex={firstFocusableDay &&
												compareDates(firstFocusableDay, day, "day")
													? 0
													: -1}
												{selected}
											>
												{day.getDate()}
											</CalendarViewItem>
										</td>
									{/each}
								</tr>
							{/each}
						{:else}
							{#each Array(4) as _, row}
								<tr>
									{#if view === "months"}
										{#each getCalendarMonths(page).slice(row * 4, row * 4 + 4) as month, i}
											{@const selected =
												value !== null &&
												(Array.isArray(value)
													? indexOfDate(value, month, "month") > -1
													: compareDates(value, month, "month"))}
											{@const inYear =
												month.getFullYear() === page.getFullYear()}
											{@const firstFocusableMonth = getCalendarMonths(
												page
											).find(
												d =>
													compareDates(d, page, "year") &&
													(!min ||
														new Date(
															min.getFullYear(),
															min.getMonth(),
															1
														) <=
															new Date(
																d.getFullYear(),
																d.getMonth(),
																1
															)) &&
													(!max || max >= d)
											)}

											<td role="gridcell">
												<CalendarViewItem
													on:click={() => selectMonth(month)}
													on:keydown={e => handleKeyDown(e, month)}
													variant="monthYear"
													outOfRange={!inYear}
													current={compareDates(
														month,
														new Date(),
														"month"
													)}
													disabled={(min?.getMonth() > month.getMonth() &&
														min?.getFullYear() ===
															month.getFullYear()) ||
														max < month}
													header={page &&
														headers &&
														month.getMonth() === 0 &&
														month.getFullYear().toString()}
													{selected}
													tabindex={firstFocusableMonth &&
													compareDates(
														firstFocusableMonth,
														month,
														"month"
													)
														? 0
														: -1}
												>
													{getMonthLocale(month.getMonth(), {
														locale,
														format: "short"
													})}
												</CalendarViewItem>
											</td>
										{/each}
									{:else if view === "years"}
										{#each getCalendarYears(page).slice(row * 4, row * 4 + 4) as year, i}
											{@const selected =
												value !== null &&
												(Array.isArray(value)
													? indexOfDate(value, year, "year") > -1
													: compareDates(value, year, "year"))}
											{@const inDecade = compareDates(year, page, "decade")}
											{@const firstFocusableYear = getCalendarYears(
												page
											).find(
												d =>
													compareDates(d, page, "decade") &&
													(!min ||
														min.getFullYear() <= d.getFullYear()) &&
													(!max || max >= d)
											)}

											<td role="gridcell">
												<CalendarViewItem
													on:click={() => selectYear(year)}
													on:keydown={e => handleKeyDown(e, year)}
													variant="monthYear"
													outOfRange={!inDecade}
													current={compareDates(year, new Date(), "year")}
													disabled={min?.getFullYear() >
														year.getFullYear() || max < year}
													{selected}
													tabindex={firstFocusableYear &&
													compareDates(firstFocusableYear, year, "year")
														? 0
														: -1}
												>
													{year.getFullYear()}
												</CalendarViewItem>
											</td>
										{/each}
									{/if}
								</tr>
							{/each}
						{/if}
					</tbody>
				{/key}
			</table>
		{/key}
	</div>
</div>

<style lang="scss">
	@use "./CalendarView";
</style>
