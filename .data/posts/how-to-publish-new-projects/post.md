---
date: 11/14/2023
title: How to publish new projects
description: This article will demonstrate how to publish a new portfolio project.
tags: [ Info ]
---

### Step-by-step

#### 1. Create a new folder
Create a new folder in ```.data/projects```

```text
.data
└── projects
    └── my-new-project
```

#### 2. Create a markdown file for your project
In the new directory, create a markdown file ```project.md```

```text
.data
└── projects
    └── my-new-project
        └── project.md
```

#### 3. Optionally, use a cover image for your project
Naming convention for the image is ```project.*```

Supported image types are ```jpg```,```jpeg```,```png```,```gif```

```text
.data
└── projects
    └── my-new-project
        └── project.md
        └── project.jpg
```

#### 4. Add metadata to your project
Prepend any content in your markdown file with metadata describing your project.

Metadata fields for projects are:
* date
* title
* tags
* description
* liveURL
* githubURL

```markdown
---
date: 11/15/2023
title: My New Project
tags: [Svelte, Javascript]
description: A cool project description.
liveURL: https://www.example.com/your-project-live-url
githubURL: https://www.example.com/your-github-repo-url
---
```

#### 5. Add markdown content
```markdown
---
date: 11/15/2023
title: My New Project
tags: [Svelte, Javascript]
description: A cool project description.
liveURL: https://www.example.com/your-project-live-url
githubURL: https://www.example.com/your-github-repo-url
---

## HELLO WORLD 😁
...more markdown about your project
```

#### 6. Save
Save and your new project is published to ```/projects/my-new-project```

### Conclusion
I hope this article demonstrated how to easily publish a new project. If you need a comprehensive guide to writing markdown, check out this [Markdown Guide](/posts/markdown-guide)

Happy coding!