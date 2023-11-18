---
date: 11/15/2023
title: How to publish new posts
description: This article will dive into how to publish new posts on this website.
tags: [ Info ]
---

### Step-by-step
#### Create a new folder in ```.data/posts```

```text
.data
└── posts
    └── my-new-post
```

#### Create a markdown file in this directory named ```post.md```

```text
.data
└── posts
    └── my-new-post
        └── post.md
```

Metadata fields for posts are:
* date
* title
* tags
* description

#### Add metadata to the top of the markdown file like so:

```markdown
---
date: 11/15/2023
title: My New Post
tags: [Svelte, Javascript]
description: A description of this post.
---
```

The metadata is not required, but will show some fields as undefined on your pages. Additionally, without the date field, they cannot be sorted.

#### Add markdown content
```markdown
---
date: 11/15/2023
title: My New Post
tags: [Svelte, Javascript]
description: A description of this post.
---

## HELLO WORLD 😁
...more content
```

### Images
Allmost all markdown content will compile as normal, including images. But images have caveats. Images can be added to your markdown in several ways.

**External**
```md
![Alt Text](https://picsum.photos/id/237/200/300)
```

**External with img tag**
```html
<img src="https://picsum.photos/id/237/200/300" alt=""/>
```

**Internal**
```md
![Alt Text](myImage.jpg)
```
***Note*** when using internal relative images, they will not hot reload. There are
two options:
1. Stop and restart the dev environment ```npm run dev```
2. In terminal run ```node scripts/copyImages.js``` from the root of this project.

This will copy your relative images to ```static/images/posts/my-new-post/```

### Conclusion
I hope this demonstrated how to make a new post. Happy posting!