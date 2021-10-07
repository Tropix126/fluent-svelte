import path from "path";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";

import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex({
			extensions: [".svx"]
		}),
		preprocess({
			postcss: {
				plugins: [autoprefixer()]
			}
		})
	],

	kit: {
		target: "body",
		adapter: adapter()
	}
};

export default config;
