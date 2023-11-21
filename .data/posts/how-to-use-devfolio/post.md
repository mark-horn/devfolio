---
title: Getting started with devfolio
date: 11/21/2023
description: Personalize and get devfolio up and running quickly.
tags: [ Info ]
---

Devfolio was designed as a starter portfolio / blog for developers just breaking into the field. A place to store thoughts and projects. 

#### Data

Almost all data on the site is loaded from the `.data` folder at the root of the site. Each page has a respective file that you can edit. For example `about.ts`

#### Content 

There is a `.data/posts` and `/data/projects` folder that will house all of your content. To add a new post or project, simply create a new folder under the respective directory and write your markdown. For example `/posts/my-new-post/post.md` or `projects/my-new-project/project.md`

For a more detailed explanation, check out:<br/>
[How to publish new posts](/posts/how-to-publish-new-posts) <br/>
[How to publish new projects](/posts/how-to-publish-new-projects)

#### Styles
Devfolio uses tailwind css for most of the site. The actual markdown content is not styled by tailwind. Styling for markdown is in `src/css/`

#### Resume
The resume is an asset served from static directory. Replace this file with your own resume.

#### Contact Page
The contact page is already wired to an internal server api that will return a response to the client. See `src/api/email` Just add your service of choice for email delivery. I recommend [Resend](https://resend.com/) for their good allowance in the free-tier.

<br/>
<br/>
<br/>
Happy editing!
