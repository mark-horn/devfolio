export const heading: string = "About";

export const subheading: string = "A little bit about me, my skills and experience.";

export const image: string = "/images/about/photo.png"; // relative to static/

export const paragraphs: Paragraphs = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac 
    felis donec et odio pellentesque diam volutpat. Turpis egestas 
    sed tempus urna et pharetra pharetra massa massa. Duis at tellus 
    at urna condimentum mattis pellentesque id nibh.`,
    
    `Eu lobortis elementum nibh. Ipsum consequat nisl vel pretium 
    lectus quam id leo in. Porttitor lacus luctus accumsan tortor 
    posuere. Ac auctor augue mauris augue neque. Bibendum arcu vitae 
    elementum curabitur vitae nunc. A diam maecenas sed enim ut sem 
    viverra aliquet. Cursus mattis molestie a iaculis. At quis risus 
    Ipsum consequat nisl vel pretium.`,

    `Sed tempus urna et pharetra pharetra massa massa. Duis at tellus 
    at urna condimentum mattis pellentesque id nibh. Pharetra massa 
    massa ultricies mi quis hendrerit dolor magna. Etiam tempor orci 
    eu lobortis elementum nibh. Ipsum consequat nisl vel pretium 
    lectus quam id leo in. Porttitor lacus luctus accumsan tortor 
    posuere. Ac auctor augue mauris augue neque. Bibendum arcu vitae`,
]

export const skills: Skills = [
    "Front-end", "Back-end", "Python", "Golang", "Javascript","Typescript",
    "SQL", "React", "NextJS", "Gatsby", "Vue", "Svelte", "CSS", "SCSS",
    "Tailwind", "VSCode", "Git", "Github", "Photoshop", "Adobe AE", "Figma",
]

export const experience: Experience[] = [
    { company: "Google", position: "Senior Software Engineer", timeframe: "2022-Current"},
    { company: "Facebook", position: "Software Engineer", timeframe: "2021-2022"},
    { company: "Twitter", position: "Software Intern", timeframe: "2020-2021"},
    { company: "McDonald's", position: "French Fryer", timeframe: "2017-2020"},
]

export const stack: Stack[] = [
    { 
        name: "Svelte/kit", 
        href: "https://kit.svelte.dev",
        hrefText: "kit.svelte.dev",
        desc: "Modern web framework for building fast, interactive apps.",
        image: "svelte.svg"
    },
    { 
        name: "Typescript", 
        href: "https://typescriptlang.org",
        hrefText: "typescriptlang.org",
        desc: "A safer, statically typed superset of JavaScript, with types.",
        image: "typescript.svg"
    },
    { 
        name: "Tailwind", 
        href: "https://tailwindcss.com",
        hrefText: "tailwindcss.com",
        desc: "Utility-first CSS framework for efficient and expressive styling.",
        image: "tailwind.svg"
    },
    { 
        name: "MDsvex", 
        href: "https://mdsvex.pngwn.io",
        hrefText: "mdsvex.pngwn.io",
        desc: "Markdown syntax compiled into Svelte dynamic web components.",
        image: "mdsvex.svg"
    },
    { 
        name: "Figma", 
        href: "https://www.figma.com/design-overview",
        hrefText: "figma.com",
        desc: "Collaborative platform for creating, prototyping, and sharing digital interfaces.",
        image: "figma.svg"
    },
    { 
        name: "Vercel", 
        href: "https://vercel.com/home",
        hrefText: "vercel.com",
        desc: "Infrastructure to build, scale, and secure a faster, more personalized web.",
        image: "vercel.svg"
    },
]

interface Experience {
    company: string; 
    position: string; 
    timeframe: string; 
}

interface Stack {
    name: string;
    href: string;
    hrefText: string;
    desc: string;
    image: string;
}

type Skills = string[];

type Paragraphs = string[];
