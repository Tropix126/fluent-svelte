import { docsPages } from "./src/site/data/docs";
import * as fs from "fs";

docsPages.filter(page => page?.examples).forEach(page => page.examples.forEach(example => {
	example.source = `<script>
	import * as Fluent from '$lib';
</script>

${ example.source }
`;

	const exampleFilePath = `src/site/examples${ page.path }`;
	const exampleFileName = `${ exampleFilePath }/${ example.name.replace(/ /g, "") }.svelte`;

	// write to file
	if (!fs.existsSync(exampleFilePath)) fs.mkdirSync(exampleFilePath, { recursive: true });
	if (!fs.existsSync(exampleFileName)) fs.appendFileSync(exampleFileName, example.source);
	else fs.writeFileSync(exampleFileName, example.source);
}));