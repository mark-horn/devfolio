Devfolio was designed as a starter portfolio / blog for developers just breaking into the field. A place to store thoughts and show off projects.

I put quite a bit of work into this project. Please leave me a star, if you found it useful.

# Deploy your own

Two very popular 1 click deployment platforms are Vercel and Netlify

#### Deploy devfolio on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/markhorn-dev/devfolio)

#### Deploy devfolio on Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/markhorn-dev/devfolio)

# Installation
```bash
git clone https://github.com/<YOUR-GITHUB-PROFILE>/devfolio
cd devfolio
npm install
npm run dev
```
devfolio should now be running at 
http://localhost:5173/


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
