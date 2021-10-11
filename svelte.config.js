import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import prefixer from "postcss-variables-prefixer";

import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md"]
		}),
		preprocess({
			postcss: {
				plugins: [
					autoprefixer(),
					cssnano(),
					prefixer({ prefix: "fds-" })
				]
			}
		})
	],

	kit: {
		target: "body",
		adapter: vercel()
	}
};

export default config;