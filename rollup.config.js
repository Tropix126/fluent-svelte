import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	watch: true,
	input: "src/site/lib/Repl/worker.ts",
	output: {
		sourcemap: true,
		format: "esm",
		name: "app",
		file: "static/worker.js"
	},
	plugins: [
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		typescript()
	],
	watch: {
		clearScreen: false
	}
};
