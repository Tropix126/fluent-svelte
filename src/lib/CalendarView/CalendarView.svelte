<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import CalendarViewItem from "./CalendarViewItem.svelte";

	export let locale: string = undefined;
    export let multiple = false;
    export let value: Date | Date[] | null = null;
    export let blackout: Date[] = undefined;        
    export let min: Date = undefined;
    export let max: Date = undefined;
    export let view: View = "days";
    export let weekStart = 0;
    
    const firstValue = Array.isArray(value) ? value[0] : value;
    const dispatch = createEventDispatcher();

    let header = "";
    let page = new Date((firstValue ?? new Date()).getFullYear(), (firstValue ?? new Date()).getMonth(), 1);
    let bodyElement: HTMLTableSectionElement = null;

    type View = "days" | "months" | "years";
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
	
	function getWeekdayLocale(day: number, { locale = undefined, format = "long", offset = 0 }: WeekdayLocaleOptions = {}) {
		return new Intl.DateTimeFormat(locale, {
			weekday: format,
            timeZone: 'UTC'
		}).format(new Date(Date.UTC(2000, 1, (day + offset - 1))));
	}
	
	function getMonthLocale(month: number, { locale = undefined, format = "long" }: MonthLocaleOptions = {}) {
		return new Intl.DateTimeFormat(locale, {
			month: format
		}).format(new Date(2000, month));
	}
	
    function getMonthLength(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate() - 1;
	}

	function getMonthDays(year: number, month: number): Date[] {
		const days: Date[] = [];
		for (let i = 0; i < (getMonthLength(year, month) + 1); i++) {
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
                return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
            case "month":
                return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
            case "year":
                return a.getFullYear() === b.getFullYear();
            case "decade":
                return Math.floor(a.getFullYear() / 10) * 10 === Math.floor(b.getFullYear() / 10) * 10;
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

		const daysAfter = (7 * calendarRows) - days.length;
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
            return new Date(page.getFullYear() + (offset * 10), 0, 1);
        }
    }

    function updatePage(value: number = 0) {
        page = new Date(getPageByOffset(value, page, view));
    }

    function handleKeyDown(event: KeyboardEvent, date: Date) {
        const { key } = event;

        if (event.ctrlKey && (key === "ArrowUp" || key === "ArrowDown")) {
            if (key === "ArrowUp") {
                view = view === "days" ? "months" : "years";
            } else if (key === "ArrowDown") {
                view = view === "years" ? "months" : "days";
            }
            return;
        }

        let focusOrder = bodyElement.querySelectorAll("button");
        let focusedDate = date;

        const focusIndex = Array.from(focusOrder).indexOf(<HTMLButtonElement>document.activeElement);

        if (focusOrder.length === 0) return;
        
        if (view === "days") {
            let focusIncrementAmount: FocusIncrementAmount = {
                ArrowUp: -7,
                ArrowDown: 7,
                ArrowLeft: -1,
                ArrowRight: 1
            }
            
            if (!focusIncrementAmount[key]) return;
            
            focusedDate = new Date(new Date(focusedDate).setDate(focusedDate.getDate() + focusIncrementAmount[key]));

            const nextDateIsBlackout = blackout && indexOfDate(blackout, focusedDate, "day") > -1;

            if (nextDateIsBlackout) {
                focusedDate.setDate(focusedDate.getDate() + focusIncrementAmount[key]);
            }

            const calendarDays = getCalendarDays(focusedDate);
            const newFocusedDate = calendarDays.find(day => compareDates(day, focusedDate, "time"));
    
            if ((min > newFocusedDate) || (max < newFocusedDate)) return;

            if (focusedDate.getMonth() !== page.getMonth()) {
                if ((key === "ArrowLeft" || key === "ArrowUp")) {
                    updatePage(-1);
                } else if ((key === "ArrowRight" || key === "ArrowDown")) {
                    updatePage(1);
                }
    
                focusedDate = newFocusedDate;
                focusOrder = bodyElement.querySelectorAll("button");
                focusOrder?.[calendarDays.indexOf(newFocusedDate)].focus();
                
                return;
            }
            
            focusOrder?.[focusIndex + focusIncrementAmount[key] * (nextDateIsBlackout ? 2 : 1)].focus();
        } else if (view === "months" || view === "years") {
            let calendar: Date[] = [];
            const focusIncrementAmount: FocusIncrementAmount = {
                ArrowUp: -4,
                ArrowDown: 4,
                ArrowLeft: -1,
                ArrowRight: 1
            }

            if (!focusIncrementAmount[key]) return;
            
            if (view === "months") {
                focusedDate = new Date(new Date(focusedDate).setMonth(focusedDate.getMonth() + focusIncrementAmount[key], 1));
            } else {
                focusedDate = new Date(new Date(focusedDate).setFullYear(focusedDate.getFullYear() + focusIncrementAmount[key]));
            }

            calendar = view === "months" ? getCalendarMonths(focusedDate) : getCalendarYears(focusedDate);
            const newFocusedDate = calendar.find(day => compareDates(day, focusedDate, view === "months" ? "month" : "year"));

            const aboveMinimumMonths = min?.getMonth() > newFocusedDate.getMonth() && min?.getFullYear() === newFocusedDate.getFullYear(); 
            const aboveMinimumYears = min?.getFullYear() > newFocusedDate.getFullYear();

            if ((view === "months" ? aboveMinimumMonths : aboveMinimumYears) || (max < newFocusedDate)) return;

            if ((view === "months" && (!compareDates(focusedDate, page, view === "months" ? "year" : "decade")))) {
                if ((key === "ArrowLeft" || key === "ArrowUp")) {
                    updatePage(-1);
                } else if ((key === "ArrowRight" || key === "ArrowDown")) {
                    updatePage(1);
                }
    
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
                value = value.slice(0, indexOfDate(value, day)).concat(value.slice(indexOfDate(value, day) + 1));
            }
        } else {
            if (Array.isArray(value)) value = null;
            if (day.getTime() === (<Date>value)?.getTime()) {
                value = null;
            } else {
                value = day;
            }
        }
    }

    function selectMonth(month: Date) {
        page.setMonth(month.getMonth(), 1);
        view = "days";
    }

    function selectYear(month: Date) {
        page.setFullYear(month.getFullYear());
        view = "months";
    }

    $: dispatch("change", value);
    $: view, updatePage(0); // ensures that data is in sync when comparing min/max values
    $: previousPage = getPageByOffset(-1, page, view);
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
</script>

<div class="calendar-view view-{view}">
    <header>
        <div class="header-text" role="heading" aria-live="polite">
            <button on:click={() => view = view === "days" ? "months" : "years"} disabled={view === "years"}>{header}</button>
        </div>
        <div class="page-controls">
            <button disabled={view && (min > page)} on:click={() => updatePage(-1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.95681 10.998C4.14912 10.998 3.67466 10.09 4.13591 9.42698L6.76854 5.64257C7.36532 4.78469 8.63448 4.7847 9.23126 5.64257L11.8639 9.42698C12.3251 10.09 11.8507 10.998 11.043 10.998H4.95681Z" />
                </svg>
            </button>
            <button disabled={max < nextPage} on:click={() => updatePage(1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.95681 5C4.14912 5 3.67466 5.90803 4.13591 6.57107L6.76854 10.3555C7.36532 11.2134 8.63448 11.2133 9.23126 10.3555L11.8639 6.57106C12.3251 5.90803 11.8507 5 11.043 5H4.95681Z" />
                </svg>
            </button>
        </div>
    </header>
    <table class="calendar-table" role="grid">
        {#if view === "days"}
            <thead>
                <tr>
                    {#each Array(7) as _, day}
                        <th scope="col" {...{abbr: getWeekdayLocale(day, { locale, offset: weekStart })}}>
                            {getWeekdayLocale(day, { locale, format: "short", offset: weekStart })}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody bind:this={bodyElement}>
                {#each Array(6) as _, week}
                    <tr>
                        {#each getCalendarDays(page).slice((week * 7), (week * 7) + 7) as day, i}
                            {@const selected = value !== null && (Array.isArray(value) ? indexOfDate(value, day, "day") > -1 : compareDates(value, day, "day"))}
                            {@const inMonth = day.getMonth() === page.getMonth()}
                            
                            <td role="gridcell">
                                <CalendarViewItem
                                    on:click={() => selectDay(day)}
                                    on:keydown={e => handleKeyDown(e, day)}
                                    tabindex={-1}
                                    outOfRange={!inMonth}
                                    current={compareDates(day, new Date(), "day")}
                                    disabled={(min > day) || (max < day)}
                                    blackout={blackout && indexOfDate(blackout, day, "day") > -1}
                                    {selected}
                                >
                                    {day.getDate()}
                                </CalendarViewItem>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
            {:else}
            <tbody bind:this={bodyElement}>
                {#each Array(4) as _, row}
                    <tr>
                        {#if view === "months"}
                            {#each getCalendarMonths(page).slice((row * 4), (row * 4) + 4) as month, i}
                                {@const selected = value !== null && (Array.isArray(value) ? indexOfDate(value, month, "month") > -1 : compareDates(value, month, "month"))}
                                {@const inYear = month.getFullYear() === page.getFullYear()}
                                
                                <td role="gridcell">
                                    <CalendarViewItem
                                        on:click={() => selectMonth(month)}
                                        on:keydown={e => handleKeyDown(e, month)}
                                        variant="monthYear"
                                        tabindex={-1}
                                        outOfRange={!inYear}
                                        current={compareDates(month, new Date(), "month")}
                                        disabled={((min?.getMonth() > month.getMonth()) && min?.getFullYear() === month.getFullYear()) || (max < month)}
                                        {selected}
                                    >
                                        {getMonthLocale(month.getMonth(), { locale, format: "short" })}
                                    </CalendarViewItem>
                                </td>
                            {/each}
                            {:else if view === "years"}
                            {#each getCalendarYears(page).slice((row * 4), (row * 4) + 4) as year, i}
                                {@const selected = value !== null && (Array.isArray(value) ? indexOfDate(value, year, "year") > -1 : compareDates(value, year, "year"))}
                                {@const inDecade = compareDates(year, page, "decade")}

                                <td role="gridcell">
                                    <CalendarViewItem
                                        on:click={() => selectYear(year)}
                                        on:keydown={e => handleKeyDown(e, year)}
                                        variant="monthYear"
                                        tabindex={-1}
                                        outOfRange={!inDecade}
                                        current={compareDates(year, new Date(), "year")}
                                        disabled={(min?.getFullYear() > year.getFullYear()) || (max < year)}
                                        {selected}
                                    >
                                        {year.getFullYear()}
                                    </CalendarViewItem>
                                </td>
                            {/each}
                        {/if}
                    </tr>
                {/each}
            </tbody>
        {/if}
    </table>
</div>

<style lang="scss">
    @use "./CalendarView";
</style>