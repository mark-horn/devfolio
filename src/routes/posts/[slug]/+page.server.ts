import { posts } from "$lib/posts";
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const { slug } = params;
    const post = posts.find((post) => slug === post.slug);

    if (!posts || !post ) throw error(404, 'Not Found');

    return {
        post
    }
}