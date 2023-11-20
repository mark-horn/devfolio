import test from 'node:test';
import { basename, dirname } from 'path';

interface Project {
    slug: string;
    body: string;
    date: string;
    tags: string[];
    image: string;
    title: string;
    liveURL: string;
    githubURL: string;
    description: string;
}

interface Image {
    slug: string;
    path: string;
}

interface MarkdownFile {
    metadata: object;
    default: { 
        render: () => {
            html: string;
        }
    }
}

interface ImageFile {
    default: string;
}

const supportedImages = ["jpeg","jpg","png","gif"];
let allImages: Image[] = [];
let allProjects: Project[] = [];
let allTags: Set<string> = new Set<string>();

async function importAllProjectFiles() {
    const imports = import.meta.glob('/.data/projects/**/project.*');
    const files = Object.entries(imports);

    const x = await Promise.all(
		files.map(async ([filepath, module]) => {
            const ext = filepath.split('.').pop();
            const slug = basename(dirname(filepath));
            
            if (ext === 'md') {
                const file = await module() as MarkdownFile;
                const body = file.default.render().html;
                const metadata = file.metadata;

                let project = { 
                    slug,
                    body,
                    ...metadata,
                } as Project;

                if (!project.tags) 
                    project.tags = [];
                
                allProjects.push(project);

            } else if (ext && supportedImages.includes(ext)) {
                const file = await module() as ImageFile;
                const path = file.default;

                let image = {
                    slug,
                    path
                }
                allImages.push(image);
            }
        })
    )
}

await importAllProjectFiles();

allProjects.forEach(project => {
    let image = allImages.find(x => x.slug === project.slug);
    if (image) project.image = image.path;

    for (const tag of project.tags) {
        allTags.add(tag);
    }
    
    project.date = new Date(project.date).toLocaleDateString(
        'en-US', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        }
    )
})

const sortedProjects = allProjects.sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
})

const sortedTags = [...allTags].sort();

export const projects = sortedProjects;
export const tags = sortedTags;