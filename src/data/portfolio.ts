import ibtisamaImage from "../assets/images/projects-Images/Ibtisama.png";
import lujjhImage from "../assets/images/projects-Images/lujjh.png";
import tatabuImage from "../assets/images/projects-Images/tatabu.png";
import tareekAlshahbaImage from "../assets/images/projects-Images/Tareek-alshahba.png";
import upafaImage from "../assets/images/projects-Images/upafa-speical.png";
import yogoKidsImage from "../assets/images/projects-Images/yogoKids.png";

export interface PortfolioProject {
    name: string;
    category: "javascript" | "react" | "next.js" | "fullstack";
    timeline: string;
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
        name: "UPAFA – University Digital Platform",
        category: "react",
        timeline: "Jan 1, 2026 - Feb 28, 2026",
        description:
            "Developed and structured UPAFA University's official multilingual platform with scalable architecture, structured academic/admissions flows, and production-focused performance optimization.",
        stack: ["Next.js", "React.js", "TypeScript", "TailwindCSS"],
        image: upafaImage,
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Yogo Kids – Child Care Booking Platform",
        category: "next.js",
        timeline: "Dec 25, 2025 - Feb 1, 2026",
        description:
            "Building a childcare booking platform with child registration workflows and a full admin dashboard for schedules, operations, and structured class management.",
        stack: ["React.js", "TypeScript", "shadcn/ui"],
        image: yogoKidsImage,
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Tariq Al-Shahba – Logistics & Cargo Management System",
        category: "react",
        timeline: "Aug 2025 - Oct 22, 2025",
        description:
            "Built a cargo registration system for UAE-to-Syria shipments with dashboard-generated QR tracking, customs-rule-based structured forms, and PDF/Excel export.",
        stack: ["React.js", "TypeScript"],
        image: tareekAlshahbaImage,
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        name: "Ibtisama Clinic – Dental Appointment Booking System",
        category: "fullstack",
        timeline: "Nov 15, 2025 - Dec 22, 2025",
        description:
            "Developed an online dental booking system with a two-month calendar scheduler and a role-based dashboard for doctors and reception staff.",
        stack: ["React.js", "TypeScript", "Express.js", "MySQL"],
        image: ibtisamaImage,
        githubUrl: "",
        liveUrl: "",
    },
    {
        name: "LUJJH – Boat Booking Platform (Saudi Arabia)",
        category: "next.js",
        timeline: "Jan 2025 - Aug 2025",
        description:
            "Designed and built a scalable Saudi market boat booking platform with a conversion-focused landing page, custom admin dashboard, and complete booking/payment flow.",
        stack: ["React.js", "TypeScript"],
        image: lujjhImage,
        githubUrl: "",
        liveUrl: "",
    },
    {
        name: "Tatabu – Location Tracking Platform",
        category: "react",
        timeline: "Jul 4, 2025 - Sep 22, 2025",
        description:
            "Improved and extended an existing URL-based location tracking platform with stronger dashboard clarity, frontend performance, and maintainable architecture.",
        stack: ["React.js"],
        image: tatabuImage,
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
