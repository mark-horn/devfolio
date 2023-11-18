import { posts } from "$lib/posts";
import { error } from '@sveltejs/kit'

export async function load() {
    if (!posts) throw error(404, 'Not Found');

    // Handle Posts
    const sortedPosts = posts.sort((a,b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

    // Handle Tags
    let tags: Set<string> = new Set<string>();

    for (const post of posts) {
        for (const tag of post.tags) {
            tags.add(tag);
        }   
    }
    const sortedTags = [...tags].sort();

    return {
        posts: sortedPosts,
        tags: sortedTags
    }
}