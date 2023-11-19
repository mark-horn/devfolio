import test from 'node:test';
import { basename, dirname } from 'path';

interface ImageFile {
    default: string;
    symbol: { 
        module: {}
    }
}

interface MarkdownFile {
    metadata: object;
    default: { 
        render: () => {
            html: string;
        }
    }
}

interface Project {
    slug: string;
    body: string;
    date: string;
    tags: string[];
    title: string;
    liveURL: string;
    githubURL: string;
    description: string;
}

async function getAllImages() {
    const objects = import.meta.glob('/.data/projects/**/project.*');
    const entries = Object.entries(objects);
    const supportedImages = ["jpeg","jpg","png","gif"]

    let allImages: { slug: string; path: string; }[] = [];

    for (const entry of entries) {
        const [filepath,module] = entry;
        const [d,p,slug,filename] = filepath.split("/");
        const ext = filename.split(".").pop();

        if (slug && filename && ext && supportedImages.includes(ext)) {
            const img = await module() as ImageFile;
            allImages.push({ slug: slug, path: img.default })
        }
    }

    return allImages;
}



async function getAllProjects() {
    const markdownFiles = import.meta.glob('/.data/projects/**/project.md');
	const files = Object.entries(markdownFiles);

	return await Promise.all(
		files.map(async ([filepath, module]) => {
            const slug = basename(dirname(filepath));
			const file = await module() as MarkdownFile;
            const body = file.default.render().html;
            const metadata = file.metadata;

            let project = { 
                slug,
                body,
                ...metadata,
            } as Project;

            project.date = new Date(project.date).toLocaleDateString(
                'en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                }
            );

            return project;
        })
    )
}

const allProjects = await getAllProjects();
const allImages = await getAllImages();

const sortedProjects = allProjects.sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
})

let uniqueTags: Set<string> = new Set<string>();

for (const project of sortedProjects) {
    for (const tag of project.tags) {
        uniqueTags.add(tag);
    }   
}
const sortedTags = [...uniqueTags].sort();

export const projects = sortedProjects;
export const tags = sortedTags;
export const images = allImages;
