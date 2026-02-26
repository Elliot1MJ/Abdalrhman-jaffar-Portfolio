export interface PortfolioProject {
    name: string;
    category: "javascript" | "react" | "fullstack";
    description: string;
    stack: string[];
    image: string;
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
}

export const profile = {
    name: "Abdalrhman Mohammed Jaffar",
    shortName: "Abdalrhman",
    title: "Full-Stack Developer",
    roleSummary:
        "I build high-performance web apps with clean architecture, smooth UX, and production-ready code.",
    location: "Lattakia, Syria",
    email: "dev.elliot.j@gmail.com",
    github: "https://github.com/Elliot1MJ",
    whatsapp: "https://wa.me/message/6JSWUGX5ELVKB1",
    yearsOfExperience: "2+",
    education: "Computer Science Engineering Student",
};

export const quickStats = [
    {
        label: "Projects Delivered",
        value: "15+",
        detail: "Frontend and full-stack builds shipped on Vercel.",
    },
    {
        label: "Core Stack",
        value: "React + Node",
        detail: "Modern TypeScript stack focused on DX and scalability.",
    },
    {
        label: "Performance Focus",
        value: "90+",
        detail: "Optimized for lightweight bundles, lazy loading, and smooth motion.",
    },
    {
        label: "Languages",
        value: "3",
        detail: "Arabic, English, Turkish.",
    },
] as const;

export const skillGroups = [
    {
        title: "Frontend",
        skills: [
            "TypeScript",
            "React",
            "Framer Motion",
            "Tailwind CSS",
            "Accessibility",
            "Responsive UI",
        ],
    },
    {
        title: "Backend",
        skills: [
            "Node.js",
            "Express",
            "REST APIs",
            "MongoDB",
            "MySQL",
            "Auth Flows",
        ],
    },
    {
        title: "Tooling",
        skills: [
            "Git + GitHub",
            "Vite",
            "React Hook Form",
            "Zod",
            "React Query",
            "Deployment",
        ],
    },
] as const;

export const projects: PortfolioProject[] = [
    {
        name: "Blisscet Store",
        category: "fullstack",
        description:
            "MERN e-commerce platform with authentication, protected routes, cart workflows, and dashboard-ready architecture.",
        stack: ["MongoDB", "Express", "React", "Node.js"],
        image: "/projects-Images/MERN/E-commerce-store.png",
        githubUrl: "https://github.com/Elliot1MJ/BlisscetStore-Website-MERN",
        liveUrl: "https://blisscet-store-website-mern.vercel.app/login",
        featured: true,
    },
    {
        name: "Todo App",
        category: "react",
        description:
            "Task management app with clean component structure, fast interactions, and simple productivity flow.",
        stack: ["React", "TypeScript", "CSS"],
        image: "/projects-Images/React/TodoApp-website-main.png",
        githubUrl: "https://github.com/Elliot1MJ/TodoApp-website_React",
        liveUrl: "https://todo-app-website-react.vercel.app/",
        featured: true,
    },
    {
        name: "Sunnyside Agency",
        category: "javascript",
        description:
            "Marketing landing page emphasizing responsive design, modern layout composition, and animated interactions.",
        stack: ["JavaScript", "HTML", "CSS"],
        image: "/projects-Images/JS/Sunnyside-Agency-LP.png",
        githubUrl: "https://github.com/Elliot1MJ/SunnysideAgencyLP-Website_JS",
        liveUrl: "https://age-calculator-website-js-zbka.vercel.app/",
        featured: true,
    },
    {
        name: "Book Mark Master",
        category: "javascript",
        description:
            "Product-style landing page with UI sections, smooth interactions, and mobile-first responsiveness.",
        stack: ["JavaScript", "HTML", "CSS"],
        image: "/projects-Images/JS/Book-Mark-Master-LP.png",
        githubUrl: "https://github.com/Elliot1MJ/BookMarkMasterLP-Website_JS",
        liveUrl: "https://book-mark-master-lp-website-js.vercel.app/",
    },
    {
        name: "Contact Form Page",
        category: "javascript",
        description:
            "Client-side validation workflow for robust forms with error states and accessible interaction patterns.",
        stack: ["JavaScript", "Form Validation", "CSS"],
        image: "/projects-Images/JS/contact-form-main.png",
        githubUrl: "https://github.com/Elliot1MJ/ContactFormMain-Website_JS",
        liveUrl: "https://contact-form-main-website-js.vercel.app/",
    },
    {
        name: "CURDS App",
        category: "javascript",
        description:
            "CRUD app with efficient state updates, table rendering, and straightforward local data handling.",
        stack: ["JavaScript", "DOM APIs", "Local Storage"],
        image: "/projects-Images/JS/CURDS-app.png",
        githubUrl: "https://github.com/Elliot1MJ/CURDSApp-Website_JS",
        liveUrl: "https://curds-app-website-js.vercel.app/",
    },
    {
        name: "Multi Step App",
        category: "javascript",
        description:
            "Multi-step user flow with validation, progress states, and polished UI transitions.",
        stack: ["JavaScript", "Form UX", "CSS"],
        image: "/projects-Images/JS/Multi-Step-App.png",
        githubUrl: "https://github.com/Elliot1MJ/MultiStepApp-Website_JS",
        liveUrl: "https://multi-step-app-website-js.vercel.app/",
    },
    {
        name: "Product List App",
        category: "javascript",
        description:
            "Interactive cart experience with product listing, quantity controls, and persistent cart behavior.",
        stack: ["JavaScript", "Cart Logic", "Responsive Design"],
        image: "/projects-Images/JS/product-list-with-cart-app.png",
        githubUrl: "https://github.com/Elliot1MJ/ProductListWithCart-Website_JS",
        liveUrl: "https://product-list-with-cart-website-js.vercel.app/",
    },
    {
        name: "FAQ Accordion",
        category: "react",
        description:
            "Accessible accordion with reusable components and state-driven visibility transitions.",
        stack: ["React", "State Management", "CSS"],
        image: "/projects-Images/React/faq-accordion-main.png",
        githubUrl: "https://github.com/Elliot1MJ/FaqAccordion-Website-React",
        liveUrl: "https://faq-accordion-website-react.vercel.app/",
    },
    {
        name: "Interactive Rating",
        category: "react",
        description:
            "Component-focused rating interface with instant feedback and success screens.",
        stack: ["React", "Component Design", "CSS"],
        image: "/projects-Images/React/interactive-rating-component-main.png",
        githubUrl:
            "https://github.com/Elliot1MJ/InteractiveRatingComponent-Website_React",
        liveUrl: "https://interactive-rating-component-websit.vercel.app/",
    },
    {
        name: "Article Preview",
        category: "react",
        description:
            "Share card interaction with polished layout details and responsive behavior across breakpoints.",
        stack: ["React", "UI States", "CSS"],
        image: "/projects-Images/React/article-preview-component-master.png",
        githubUrl:
            "https://github.com/Elliot1MJ/ArticlePreviewComponent-Website_React",
        liveUrl: "https://article-preview-component-website-r.vercel.app/",
    },
    {
        name: "Base Apparel",
        category: "react",
        description:
            "Conversion-focused coming-soon page with email capture and validation experience.",
        stack: ["React", "Validation", "CSS"],
        image: "/projects-Images/React/base-apparel-coming-soon-master.png",
        githubUrl:
            "https://github.com/Elliot1MJ/BaseApparelComingSoon-Website_React",
        liveUrl: "https://base-apparel-coming-soon-website-re.vercel.app/",
    },
    {
        name: "Intro Signup Form",
        category: "react",
        description:
            "Form-focused page with clear validation feedback and semantic structure.",
        stack: ["React", "Forms", "Accessibility"],
        image: "/projects-Images/React/intro-component-with-signup-form-master.png",
        githubUrl: "https://github.com/Elliot1MJ/IntroSignupForm-Website_React",
        liveUrl: "https://intro-signup-form-website-react.vercel.app/",
    },
    {
        name: "Ping Coming Soon",
        category: "react",
        description:
            "Minimal launch page with lightweight structure and responsive presentation.",
        stack: ["React", "Micro UI", "CSS"],
        image: "/projects-Images/React/ping-coming-soon-page-master.png",
        githubUrl: "https://github.com/Elliot1MJ/PingComingSoon-Website-React",
        liveUrl: "https://ping-coming-soon-website-react.vercel.app/",
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const education = {
    degree: "BSc in Computer Science Engineering",
    university: "Lattakia University (formerly Tishreen University)",
    duration: "2022 - 2028 (Expected)",
    status: "3rd Year Student",
    coursework: [
        "Data Structures",
        "Algorithms",
        "Database Systems",
        "Software Engineering",
        "Web Development",
    ],
};

export const values = [
    {
        title: "Performance First",
        description:
            "I prioritize lazy loading, compact bundles, and smooth rendering from day one.",
    },
    {
        title: "Clean Architecture",
        description:
            "Readable, maintainable code and predictable component boundaries are part of every project.",
    },
    {
        title: "Product Thinking",
        description:
            "I build features with user behavior, conversion, and long-term scaling in mind.",
    },
] as const;
