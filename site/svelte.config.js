import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import { mdsvex } from "mdsvex";

const __dirname = path.resolve();

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: [
        '.svelte',
        '.svx'
    ],
	kit: {
		target: 'body',
        vite: {
            resolve: {
                alias: {
                    $components: path.resolve(__dirname, './src/lib/components'),
                    $fluent: path.resolve(__dirname, './src/lib/fluent-svelte/src'),
                    $examples: path.resolve(__dirname, './src/routes/examples')
                }
            },
            optimizeDeps: {
                include: ["highlight.js/lib/core"],
            },
        }
	},
    preprocess: [
        mdsvex({
            layout: path.resolve(__dirname, './src/lib/components/DocsPageLayout.svelte')
        }),
        sveltePreprocess({
            defaults: {
                style: 'scss'
            },
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            }
        })
    ]
};

export default config;