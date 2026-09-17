import { collectProjectMedia, type ProductionSection } from "./gallery";

export type { ProductionSection };
export { profile, quickStats, skillGroups, education, values } from "./profile";

export interface PortfolioProject {
    slug: string;
    name: string;
    category: "javascript" | "react" | "next.js" | "fullstack";
    timeline: string;
    description: string;
    codeSummary: string;
    stack: string[];
    image: string;
    gallery: string[];
    codeGallery: string[];
    productionSections: ProductionSection[];
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
}

const yogoKidsMedia = collectProjectMedia("yogoKids");
const tareekAlshahbaMedia = collectProjectMedia("Tareek-alshahba");
const ibtisamaMedia = collectProjectMedia("Ibtisama");
const lujjhMedia = collectProjectMedia("lujjh");
const tatabuMedia = collectProjectMedia("tatabu");

export const projects: PortfolioProject[] = [
    {
        slug: "yogo-kids-child-care-booking-platform",
        name: "Childcare Booking Platform",
        category: "next.js",
        timeline: "Dec 25, 2025 - Feb 1, 2026",
        description:
            "Context: A childcare provider needed to replace manual registration and scheduling with a system capable of managing capacity and availability in real time.",
        codeSummary:
            "Engineering Solution: A Next.js platform covering the full booking lifecycle — from registration through confirmation — backed by administrative views for schedules, attendance, and capacity, with a component architecture that reduced the cost of every subsequent feature.",
        stack: ["Next.js", "React.js", "TypeScript"],
        image: yogoKidsMedia.image,
        gallery: yogoKidsMedia.gallery,
        codeGallery: yogoKidsMedia.codeGallery,
        productionSections: yogoKidsMedia.productionSections,
        githubUrl: "",
        liveUrl: "https://yogokids.ae/",
        featured: true,
    },
    {
        slug: "tariq-al-shahba-logistics-cargo-management-system",
        name: "Cargo Logistics System",
        category: "react",
        timeline: "Aug 2, 2025 - Oct 22, 2025",
        description:
            "Context: A logistics operation required visibility and control over shipment registration, tracking, and customs-related workflows, previously handled without a unified system.",
        codeSummary:
            "Engineering Solution: A React-based operations dashboard featuring QR-based shipment tracking, validated data entry for pricing and shipping rules, and export-ready views built for daily operational use.",
        stack: ["React.js", "TypeScript", "TailwindCSS"],
        image: tareekAlshahbaMedia.image,
        gallery: tareekAlshahbaMedia.gallery,
        codeGallery: tareekAlshahbaMedia.codeGallery,
        productionSections: tareekAlshahbaMedia.productionSections,
        githubUrl: "",
        liveUrl: "",
        featured: true,
    },
    {
        slug: "ibtisama-clinic-dental-appointment-booking-system",
        name: "Dental Clinic Booking System",
        category: "fullstack",
        timeline: "Nov 15, 2025 - Dec 22, 2025",
        description:
            "Appointment booking for clinics, with fully separate role-based access for doctors and reception staff.",
        codeSummary:
            "Highlights: • Conflict-aware scheduling with calendar views. • Separate interfaces per role, driven by real access control. • Frontend wired directly into Express.js APIs and MySQL.",
        stack: ["React.js", "TypeScript", "TailwindCSS", "Express.js", "MySQL"],
        image: ibtisamaMedia.image,
        gallery: ibtisamaMedia.gallery,
        codeGallery: ibtisamaMedia.codeGallery,
        productionSections: ibtisamaMedia.productionSections,
        githubUrl: "",
        liveUrl: "",
    },
    {
        slug: "lujjh-boat-booking-platform-saudi-arabia",
        name: "Boat Booking Platform",
        category: "next.js",
        timeline: "Jun 6, 2025 - Aug 8, 2025",
        description:
            "Boat reservation platform for the Saudi market — a conversion-focused landing page plus a full admin side.",
        codeSummary:
            "Highlights: • High-conversion landing page built to drive booking intent. • Admin dashboard for trips, pricing, and reservations. • Mobile-first responsive behavior, tuned for daily use.",
        stack: ["Next.js", "React.js", "TypeScript", "TailwindCSS"],
        image: lujjhMedia.image,
        gallery: lujjhMedia.gallery,
        codeGallery: lujjhMedia.codeGallery,
        productionSections: lujjhMedia.productionSections,
        githubUrl: "",
        liveUrl: "",
    },
    {
        slug: "tatabu-shipment-tracking-dashboard",
        name: "Tatabu Shipment Tracking Platform",
        category: "react",
        timeline: "Apr 8, 2025 - Jun 2, 2025",
        description:
            "Shipment tracking platform built around live status, route visibility, and day-to-day operational monitoring.",
        codeSummary:
            "Highlights: • Tracking-first dashboard screens for the full shipment lifecycle. • Reusable UI blocks for status timelines and operations panels. • Responsive views built for desktop and tablet logistics work.",
        stack: ["React.js", "TypeScript", "TailwindCSS"],
        image: tatabuMedia.image,
        gallery: tatabuMedia.gallery,
        codeGallery: tatabuMedia.codeGallery,
        productionSections: tatabuMedia.productionSections,
        githubUrl: "",
        liveUrl: "",
        featured: false,
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug);
}

export function getProjectDetailsPath(slug: string) {
    return `/projects/${slug}`;
}
