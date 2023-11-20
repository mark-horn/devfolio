---
date: 11/15/2023
title: How to publish new posts
description: This article will demonstrate how to publish a new blog post.
tags: [ Info ]
---

### Step-by-step

#### 1. Create a new folder
Create a new folder in ```.data/posts```

```text
.data
└── posts
    └── my-new-post
```

#### 2. Create a markdown file for your post
In the new directory, create a markdown file ```post.md```

```text
.data
└── posts
    └── my-new-post
        └── post.md
```

#### 3. Add metadata to your post
Prepend any content in your markdown file with metadata describing your post.

Metadata fields for posts are:
* date
* title
* tags
* description

```markdown
---
date: 11/15/2023
title: My New Post
tags: [Svelte, Javascript]
description: A description of this post.
---
```

#### 4. Add markdown content
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

#### 5. Save
Save and your new post is published to ```/posts/my-new-post```

### Conclusion
I hope this article demonstrated how to easily make a new post. If you need a comprehensive guide to writing markdown, check out this [Markdown Guide](/posts/markdown-guide)

Happy posting!