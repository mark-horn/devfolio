export const heading: string = 
"Let's Connect";

export const subheading: string = 
"If you want to work together or just to say hi. Get in touch!";

export const emails: Email[] = [
    {
        url: "johndoe@acme.com"
    },
    {
        url: "devfolio@acme.com"
    },
];

export const social: Social[] = [
    {
        img: { 
            dark: "/images/social/linkedin-dark.svg",
            light: "/images/social/linkedin-light.svg",
        },
        url: "https://www.linkedin.com/in/some-user-profile"
    },
    {
        img: { 
            dark: "/images/social/github-dark.svg",
            light: "/images/social/github-light.svg",
        },
        url: "https://www.github.com/some-user-profile"
    }
];

interface Email {
    url:string;
}

interface Social {
    url:string;
    img: {
        dark: string;
        light: string;
    };
}