---
title: How to setup email with devfolio
date: 11/13/2023
description: How to easily setup this site to send emails using the contact page.
tags: [ Info ]
---

### Step-by-Step

#### 1) Add your email
Open `.data/site.ts` and change recipientEmail to your email

#### 2) Create a Resend account
Create a free account at <https://resend.com>. Be sure to use the same email address for registration
that you specified in step 1.

#### 3) Create an API key
While logged in navigate to <https://resend.com/api-keys> and create a new api key.

#### 4) Create an .env file
In the root directory of the devfolio project, create an .env file. This is for your api key. Do not use quotes.
`RESEND_KEY=the_api_key_you_created_on_resend`

*At this point, you should be able to send emails using the contact form, in your local dev environment*

When you deploy your site (I recommend Vercel), consult their documentation to see how to add the environment variable for live use.

Happy coding!