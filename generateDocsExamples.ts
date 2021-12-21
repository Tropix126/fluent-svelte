import { docsPages } from "./src/site/data/docs";
import * as fs from "fs";

docsPages
	.filter(page => page?.examples)
	.forEach(page =>
		page.examples.forEach(example => {
			const exampleFilePath = `src/site/examples${page.path}`;
			const exampleFileName = example.name.replace(/ /g, "");

			example.source = `<script>import * as Fluent from '$lib';</script>
<div class="example-${exampleFileName}">
	${example.source}
</div>

<style>
	.example-${exampleFileName} {
		display :flex;
		flex-direction: ${example.direction ?? "row"};
		gap: 1rem;
	}
	
	@media screen and (max-width: 650px) {
		.example-${exampleFileName} {
			flex-direction: column;
		}
	}
</style>
`;

			const exampleFileNameAndPath = `${exampleFilePath}/${exampleFileName}.svelte`;

			// write to file
			if (!fs.existsSync(exampleFilePath)) fs.mkdirSync(exampleFilePath, { recursive: true });
			if (!fs.existsSync(exampleFileNameAndPath))
				fs.appendFileSync(exampleFileNameAndPath, example.source);
			else fs.writeFileSync(exampleFileNameAndPath, example.source);
		})
	);
