import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import relativeImages from "mdsvex-relative-images";

/** @type {import('@sveltejs/kit').Config} */

const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: [".md"], remarkPlugins: [relativeImages] })
	],
	kit: {
		adapter: adapter()
	}
};

export default config;