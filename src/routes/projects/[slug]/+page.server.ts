import { projects } from "$lib/projects";
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const { slug } = params;
    const project = projects.find((project) => slug === project.slug);

    if (!projects || !project ) throw error(404, 'Not Found');

    return {
        project
    }
}