import { basename, dirname } from 'path';

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

	return await Promise.all(
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

            if (!post.tags) post.tags = [];

            post.date = new Date(post.date).toLocaleDateString(
                'en-US', { 
                    year: 'numeric', month: 'short', day: 'numeric' 
                }
            ); 

            return post;
        })
    )
}

export const posts = await getAllPosts();