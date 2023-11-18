import { basename, dirname } from 'path';
import { JSDOM } from "jsdom";

let imgTypes = ['jpg', 'jpeg', 'gif', 'png'];

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
    image: string;
    liveURL: string;
    githubURL: string;
    description: string;
}

interface KV {
    [key:string]: string;
}

async function getAllProjects() {
    //HANDLE PROJECT IMAGES
    let projectImages: any[] = [];
    const imageGlob = import.meta.glob('/.data/projects/**/project.*');

    for (let entry in imageGlob) {
        const [d,p,slug,img] = entry.split('/');
        const ext = img.split('.').pop();
        if (ext && imgTypes.includes(ext)) {
            const path = `/images/projects/${slug}/${img}`;
            projectImages.push({slug: slug, path: path})
        }
    }

    // HANDLE MARKDOWN FILES
    const markdownFiles = import.meta.glob('/.data/projects/**/project.md');
	const files = Object.entries(markdownFiles);

	const allProjects = await Promise.all(
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

            /** REWRITE IMAGE URLS IN THE MARKDOWN */
            const dom = new JSDOM(project.body);
            const document = dom.window.document;
            const elements = document.querySelectorAll('img');

            elements.forEach(element => {
                const oldSrc = element.getAttribute('src') || '';
                const hasProtocol = /^(https?|ftp):\/\//i.test(oldSrc);
                if (!hasProtocol) {
                    const imageName = oldSrc.replace(/^.*[\\/]/, '');
                    const newSrc = `/images/projects/${project.slug}/${imageName}`;
                    element.setAttribute('src', newSrc);
                }
            });
            project.body = document.documentElement.outerHTML;

            let img = projectImages.find(x => x.slug === project.slug);
            project.image = img.path;

            project.date = new Date(project.date).toLocaleDateString(
                'en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                }
            );

            if (!project.slug)
            console.warn(filepath,`field slug is missing`);

            if (!project.title)
                console.warn(filepath,`field title is missing`);

            if (!project.description)
                console.warn(filepath,`field description is missing`);

            if (!project.body)
                console.warn(filepath,`field body is missing`);

            if (!project.date)
                console.warn(filepath,`field date is missing`);

            if (isNaN(new Date(project.date).getTime()))
                console.warn(filepath,`field date is invalid`);

            if (!project.tags) {
                console.warn(filepath,`field tags is missing`);
                project.tags = [];
            }

            return project;
        })
    )

    return allProjects;
}

export const projects = await getAllProjects();