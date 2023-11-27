___
# Installation

### Clone the repository
```bash
git clone https://github.com/markhorn-dev/devfolio.git
```
### Change to working directory
```bash
cd devfolio
```

### Open in VSCode (optionally)
```bash
code .
```

### Install dependencies
```bash
npm install
```

### Run the dev server
```bash
npm run dev
```

### Devfolio on localhost
Sveltekit runs on port 5173 by default

http://localhost:5173/

___

# Usage

To edit the site, edit the data files in `.data` in the root directory.

Mock posts and projects are included. Please check the blog posts on how to add posts, projects, and write markdown.

The contact form is already wired to an api. The back-end can be found in `src/routes/api/email`. The front-end is found in `src/routes/contact`. 

Choose your own provider. I personally used <https://resend.com/> during development due to its' generous free tier.

___

# Stack
* Svelte/kit
* Tailwind
* MDSvex (use markdown in svelte)
* MDSvex-relative-images (use relative images in mdsvex)

___

# Credits
 
* [Pngwn](https://github.com/pngwn) mdsvex
* [Matt Jennings](https://github.com/mattjennings) mdsvex-relative-images
