import { basename, dirname } from 'path';
import { JSDOM } from "jsdom";
import { error } from '@sveltejs/kit';

interface MarkdownFile {
    metadata: object;
    default: { 
        render: () => {
            html: string;
        }
    }
}

interface Post {
    slug: string;
    body: string;
    date: string;
    tags: string[];
    title: string;
    description: string;
}

async function getAllPosts() {
	const markdownFiles = import.meta.glob('/.data/posts/**/post.md');
	const files = Object.entries(markdownFiles);

	const allPosts = await Promise.all(
		files.map(async ([filepath, module]) => {
            const slug = basename(dirname(filepath));
			const file = await module() as MarkdownFile;
            const body = file.default.render().html;
            const metadata = file.metadata;

            let post = { 
                slug,
                body,
                ...metadata,
            } as Post;

            /** REWRITE IMAGE URLS IN THE MARKDOWN */
            // const dom = new JSDOM(post.body);
            // const document = dom.window.document;
            // const elements = document.querySelectorAll('img');

            // elements.forEach(element => {
            //     const oldSrc = element.getAttribute('src') || '';
            //     const hasProtocol = /^(https?|ftp):\/\//i.test(oldSrc);
            //     if (!hasProtocol) {
            //         const imageName = oldSrc.replace(/^.*[\\/]/, '');
            //         const newSrc = `/images/posts/${post.slug}/${imageName}`;
            //         element.setAttribute('src', newSrc);
            //     }
            // });
            // post.body = document.documentElement.outerHTML;

            post.date = new Date(post.date).toLocaleDateString(
                'en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                }
            ); 

            if (!post.slug)
                console.warn(filepath,`field slug is missing`);

            if (!post.title)
                console.warn(filepath,`field title is missing`);

            if (!post.description)
                console.warn(filepath,`field description is missing`);

            if (!post.body)
                console.warn(filepath,`field body is missing`);

            if (!post.date)
                console.warn(filepath,`field date is missing`);

            if (isNaN(new Date(post.date).getTime()))
                console.warn(filepath,`field date is invalid`);

            if (!post.tags) {
                console.warn(filepath,`field tags is missing`);
                post.tags = [];
            }

            return post;
        })
    )

    return allPosts;
}

export const posts = await getAllPosts();