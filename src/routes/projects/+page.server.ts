import { projects } from "$lib/projects";
import { error } from '@sveltejs/kit'

export async function load() {
    if (!projects) throw error(404, 'Not Found');

    // Handle Posts
    const sortedProjects = projects.sort((a,b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

    // Handle Tags
    let tags: Set<string> = new Set<string>();

    for (const project of projects) {
        for (const tag of project.tags) {
            tags.add(tag);
        }   
    }
    const sortedTags = [...tags].sort();

    return {
        projects: sortedProjects,
        tags: sortedTags
    }
}