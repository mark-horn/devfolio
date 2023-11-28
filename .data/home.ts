export const avatar: string = 
"/images/home/avatar.png";

export const fullname: string = 
"Dev Folio";

export const hello: string = 
"Hi, I am " + fullname;

export const position: string = 
"Software Engineer";

export const statement: string = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.`;

type Button = {
    text: string;
    url: string;
}

export const buttonLeft: Button = {
    text: "About Me",
    url: "/about"
};

export const buttonRight: Button = {
    text: "Get in Touch",
    url: "/contact"
};

export const showRepository: boolean = true;