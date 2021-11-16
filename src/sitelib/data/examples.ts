import Prism from "prismjs";
import "prism-svelte";

export type DocsExamples = {
	path: string,
	name: string,
	mod: any,
	src: string,
}

export const loadExampleModules = async (path: string) => {
	const componentFiles = import.meta.glob(`/src/sitelib/examples/**/*.svelte`);

	const examples: DocsExamples[] = await Promise.all(Object.entries(componentFiles)
		.map(async ([path, module]) => {
			const preparedPath = path
				.substr(path.indexOf("/"), path.lastIndexOf("/"))
				.replace("/src/sitelib/examples", "");

			const name = path
				.substr(
					/* remove leading path */ path.lastIndexOf("/") + 1,
					/* remove file extension */ path.lastIndexOf(".") - path.lastIndexOf("/") - 1
				)
				// add spaces to the name, apparently import.meta.glob removes them
				.replace(/([A-Z])/g, " $1").trim();

			const src = (await import(/* @vite-ignore */ path + "?raw").then(x => x.default) as string)
				.replace(`<script>\n\timport * as Fluent from '$lib';\n</script>\n\n`, "")
				.trim();

			return {
				path: preparedPath,
				name,
				mod: await module().then(mod => mod.default),
				src: Prism.highlight(src, Prism.languages.svelte, "svelte")
			};
		}));

	return examples.filter(example => example.path === path);
};