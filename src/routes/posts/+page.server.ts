import { posts, tags } from "$lib/posts";
import { error } from '@sveltejs/kit'

export async function load() {
    if (!posts) throw error(404, 'Not Found');

    return {
        posts, tags
    }
} 