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
    title: "Frontend Engineer (React & Next.js Specialist)",
    roleSummary:
        "Frontend engineer focused on scalable booking systems, structured dashboards, and production-ready business platforms.",
    location: "Open to remote roles",
    email: "dev.elliot.j@gmail.com",
    instagram: "https://www.instagram.com/abdalrhman_jaffar/",
    whatsapp: "https://wa.me/message/6JSWUGX5ELVKB1",
    yearsOfExperience: "3",
    education:
        "Bachelor's Degree in Computer & Control Engineering (Expected Graduation: 2028)",
};

export const quickStats = [
    {
        label: "Experience",
        value: "3 Years",
        detail: "Frontend delivery across freelance and team environments.",
    },
    {
        label: "Production Systems",
        value: "Booking, Logistics, Healthcare",
        detail: "Built for real operations and day-to-day workflows.",
    },
    {
        label: "Specialization",
        value: "Dashboards & Booking",
        detail: "Structured admin interfaces and booking workflows.",
    },
    {
        label: "Core Stack",
        value: "React + Next.js",
        detail: "TypeScript, TailwindCSS, Express.js, and REST APIs.",
    },
] as const;

export const skillGroups = [
    {
        title: "Primary Stack",
        skills: ["React.js", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
        title: "Systems Focus",
        skills: [
            "Booking Workflows",
            "Structured Dashboards",
            "Role-Based Access",
            "Authentication Flows",
            "REST API Integration",
            "MySQL Data Flows",
        ],
    },
    {
        title: "Engineering Quality",
        skills: [
            "Maintainable Code",
            "Frontend Architecture",
            "Performance Awareness",
            "Security-Conscious UI",
            "AI-Assisted Workflows",
            "Production Readiness",
        ],
    },
] as const;

export const projects: PortfolioProject[] = [
    {
        name: "LUJJH – Boat Booking Platform",
        category: "react",
        description:
            "Built the full booking and reservation flow, developed the admin dashboard, and delivered a conversion-focused landing page while owning the frontend architecture.",
        stack: ["React.js", "TypeScript"],
        image: "/projects-Images/MERN/E-commerce-store.png",
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Tariq Al-Shahba – Logistics & Cargo Management System",
        category: "react",
        description:
            "Built a shipment registration system for UAE-to-Syria logistics operations, with QR-based tracking, structured customs pricing forms, and PDF/Excel export flows.",
        stack: ["React.js", "TypeScript"],
        image: "/projects-Images/React/TodoApp-website-main.png",
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Ibtisama Clinic – Appointment Booking System",
        category: "fullstack",
        description:
            "Developed a two-month appointment scheduling system with role-based dashboards, authentication and permissions, and backend integration using Express.js and MySQL.",
        stack: ["React.js", "TypeScript", "Express.js", "MySQL"],
        image: "/projects-Images/JS/Sunnyside-Agency-LP.png",
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Yogo Kids – Childcare Booking Platform",
        category: "react",
        description:
            "In progress: building child registration workflows and a full admin dashboard for structured childcare operations.",
        stack: ["React.js", "TypeScript", "shadcn/ui"],
        image: "/projects-Images/React/article-preview-component-master.png",
        githubUrl: "",
        liveUrl: "",
    },
    {
        name: "Tatabu – Location Tracking Platform",
        category: "react",
        description:
            "Improved an existing tracking platform by restructuring dashboard flows for clearer operations, better performance, and easier long-term maintenance.",
        stack: ["React.js"],
        image: "/projects-Images/React/faq-accordion-main.png",
        githubUrl: "",
        liveUrl: "",
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const education = {
    degree: "Bachelor's Degree in Computer & Control Engineering",
    university: "Lattakia University (formerly Tishreen University)",
    duration: "Expected Graduation: 2028",
    status: "Undergraduate student",
    coursework: [
        "Computer Engineering Fundamentals",
        "Control Systems",
        "Algorithms",
        "Database Systems",
        "Software Engineering",
    ],
};

export const values = [
    {
        title: "Clean & Maintainable Code",
        description:
            "Readable code, reusable patterns, and clear ownership across components and modules.",
    },
    {
        title: "Structured Architecture",
        description:
            "Feature structure, state boundaries, and API contracts are planned before implementation.",
    },
    {
        title: "Performance, Security & AI Workflow",
        description:
            "Rendering optimization, permission-aware implementation, and AI-assisted workflows for reliable delivery.",
    },
] as const;
