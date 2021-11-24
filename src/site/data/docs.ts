export type DocsMap = {
	name: string;
	path?: string;
	type?: "page" | "category";
	pages?: DocsMap[],
	examples?: Array<{ name: string, source: string, description: string, direction?: "row" | "column" }>
};

export const docsMap: DocsMap[] = [
	{
		name: "Overview",
		path: ""
	},
	{
		type: "category",
		name: "Components",
		pages: [
			{
				name: "Button",
				path: "/components/button",
				examples: [
					{
						name: "Simple Button",
						source: "<Fluent.Button>Click Me!</Fluent.Button>",
						description: "The default button component."
					},
					{
						name: "Button Variants",
						source: `<Fluent.Button>Standard</Fluent.Button>
<Fluent.Button variant="accent">Accent</Fluent.Button>
<Fluent.Button variant="hyperlink">Hyperlink</Fluent.Button>`,
						description: "Buttons can have different variants: standard, accent, or hyperlink."
					},
				]
			}
		]
	}
];

export const docsPages = filterPages(docsMap);

export function filterPages(docsStructure: DocsMap[] | DocsMap): DocsMap[] {
	if (Array.isArray(docsStructure)) {
		// it's an array of pages/categories
		return docsStructure
			.map(page => filterPages(page)) // recursively flatten the structure and filter to only include pages
			.flat(Infinity) as DocsMap[]; // flatten the structure to get rid of any nesting
	} else {
		// it's a single page/category, not a structure
		if (docsStructure.type === "category") {
			// it's a category
			return docsStructure.pages
				.map(page => filterPages(page)) // filter down and down until only pages are left
				.flat(Infinity) as DocsMap[]; // flatten the array
		} else {
			// it's a page
			return [docsStructure];
		}
	}
}