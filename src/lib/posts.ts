import { basename, dirname } from 'path';

interface Post {
    slug: string;
    body: string;
    date: string;
    tags: string[];
    title: string;
    description: string;
}

interface MarkdownFile {
    metadata: object;
    default: { 
        render: () => {
            html: string;
        }
    }
}

let allPosts: Post[] = [];
let allTags: Set<string> = new Set<string>();

async function importAllPostFiles() {
    const imports = import.meta.glob('/.data/posts/**/post.md');
    const files = Object.entries(imports);

    const x = await Promise.all(
		files.map(async ([filepath, module]) => {
            const ext = filepath.split('.').pop();
            const slug = basename(dirname(filepath));      
            const file = await module() as MarkdownFile;
            const body = file.default.render().html;
            const metadata = file.metadata;

            let post = { 
                slug,
                body,
                ...metadata,
            } as Post;

            if (!post.tags) 
                post.tags = [];
            
            allPosts.push(post);
        })
    )
}

await importAllPostFiles();

allPosts.forEach(post => {
    for (const tag of post.tags) {
        allTags.add(tag);
    }
    
    post.date = new Date(post.date).toLocaleDateString(
        'en-US', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        }
    )
})

const sortedPosts = allPosts.sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
})

const sortedTags = [...allTags].sort();

export const posts = sortedPosts;
export const tags = sortedTags;