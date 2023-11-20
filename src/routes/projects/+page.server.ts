import { projects, tags } from "$lib/projects";
import { error } from '@sveltejs/kit'

export async function load() {
    if (!projects) throw error(404, 'Not Found');

    return {
        projects,
        tags
    }
}