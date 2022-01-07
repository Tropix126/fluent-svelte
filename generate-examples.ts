import { docsPages } from "./src/site/data/docs"
import * as fs from "fs"

docsPages.filter(page => page?.examples).forEach(page => {
	page.examples.forEach((example, index) => {
		fs.writeFileSync(
				// i.e. _SimpleButton0.svelte
				`src/site/examples${ page.path }/_${ example.name.replace(/\s+/g, "") }${ index }.svelte`,
				`<script>
	import * as Fluent from "$lib"
</script>
${ example.source }
			`
		)
	})
})