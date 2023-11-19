import { basename, dirname } from 'path';

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
    //
    image: string;
}

//
let img = await import("/.data/projects/expensify/test.jpg");
console.log(img.default)
//

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

            project.image = img.default

            return project;
        })
    )
}

export const projects = await getAllProjects();