import Prism from "prismjs";
import "prism-svelte";
import { docsPages } from "$site/data/docs";

export type DocsExample = {
	path: string;
	name: string;
	mod: any;
	src: string;
	description: string;
	index: number;
};

export const loadExampleModules = async (path: string) => {
	const componentFiles = import.meta.glob(`/src/site/examples/**/*.svelte`);

	const examples: DocsExample[] = await Promise.all(
		Object.entries(componentFiles).map(async ([path, module]) => {
			// const preparedPath = path
			// 	.substr(path.indexOf("/"), path.lastIndexOf("/"))
			// 	.replace("/src/site/examples", "");

			// const name = path
			// 	.substr(
			// 		/* remove leading path */ path.lastIndexOf("/") + 1,
			// 		/* remove file extension */ path.lastIndexOf(".") - path.lastIndexOf("/") - 1
			// 	)
			// 	// add spaces to the name, apparently import.meta.glob removes them
			// 	.replace(/([A-Z])/g, " $1")
			// 	.trim();

			// const docsPage = docsPages.find(page => page.path === preparedPath);
			// const example = docsPage.examples.find(e => e.name === name);

			// return {
			// 	path: docsPage.path,
			// 	name: example.name,
			// 	mod: await module().then(mod => mod.default),
			// 	src: Prism.highlight(example.source, Prism.languages.svelte, "svelte"),
			// 	description: example.description,
			// 	index: docsPage.examples.findIndex(e => e.name === example.name)
			// };
			return true;
		})
	);

	return examples.filter(example => example.path === path).sort((a, b) => a.index - b.index);
};
