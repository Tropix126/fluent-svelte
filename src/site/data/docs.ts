export type RawExample = {
	name: string,
	source: string,
	description?: string,
	repl?: string,
}

export type PreparedExample = {
	title: string,
	description: string,
	componentName: string,
	source: string,
	pagePath: string,
	repl?: string
}

export type DocsMap = {
	name: string,
	path?: string,
	type?: "page" | "category",
	icon?: string,
	examples?: RawExample[],
	pages?: DocsMap[],
};

// SVG stuff is hopefully temporary
export const docsMap: DocsMap[] = [
	{
		name: "Overview",
		path: "",
		icon: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 7c.28 0 .5.22.5.5v3a.5.5 0 01-1 0v-3c0-.28.22-.5.5-.5z"/><path d="M8 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/><path d="M2 8a6 6 0 1112 0A6 6 0 012 8zm6-5a5 5 0 100 10A5 5 0 008 3z"/></svg>`
	},
	{
		type: "category",
		name: "Components",
		pages: [
			{
				name: "Button",
				path: "/components/button",
				icon: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M1 5c0-1.1.9-2 2-2h10a2 2 0 012 2v5a2 2 0 01-1.16 1.82 1.5 1.5 0 00-.28-.38l-.45-.45A1 1 0 0014 10V5a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h4v1H3a2 2 0 01-2-2V5z"/><path d="M8.85 8.15A.5.5 0 008 8.5v6a.5.5 0 00.9.3l1.35-1.8h2.25a.5.5 0 00.35-.85l-4-4zM9 13V9.7l2.3 2.3H10a.5.5 0 00-.4.2L9 13z"/></svg>`,
				examples: [
					{
						name: "Simple Button",
						source: `<Fluent.Button variant="standard">Button</Fluent.Button>
<Fluent.Button variant="accent">Button</Fluent.Button>
<Fluent.Button variant="hyperlink">Button</Fluent.Button>
<Fluent.Button variant="standard" disabled>Button</Fluent.Button>
<Fluent.Button variant="accent" disabled>Button</Fluent.Button>
<Fluent.Button variant="hyperlink" disabled>Button</Fluent.Button>
`,
						description: "Buttons can have 3 different variants: standard, accent, and hyperlink. They can also be disabled.",
						repl: "0c6ca42e2c5c4868a7a8c1a1a45759eb"
					}
				]
			}
		]
	}
];

export const docsPages = filterPages(docsMap);

function filterPages(docsStructure: DocsMap[] | DocsMap): DocsMap[] {
	if (Array.isArray(docsStructure)) {
		// it's an array of pages/categories
		return docsStructure
				.map(page => filterPages(page)) // recursively flatten the structure and filter to only include pages
				.flat(Infinity) as DocsMap[] // flatten the structure to get rid of any nesting
	} else {
		// it's a single page/category, not a structure
		if (docsStructure.type === "category") {
			// it's a category
			return docsStructure.pages
					.map(page => filterPages(page)) // filter down and down until only pages are left
					.flat(Infinity) as DocsMap[] // flatten the array
		} else {
			// it's a page
			return [docsStructure];
		}
	}
}
