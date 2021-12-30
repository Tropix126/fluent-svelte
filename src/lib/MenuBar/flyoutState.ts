import type { SvelteComponentTyped } from "svelte";

import { writable } from "svelte/store";

export const currentMenu = writable<SvelteComponentTyped>(null);
