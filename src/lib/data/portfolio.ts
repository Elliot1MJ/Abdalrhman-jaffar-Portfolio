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

const upafaMedia = collectProjectMedia("upafa");
const yogoKidsMedia = collectProjectMedia("yogoKids");
const tareekAlshahbaMedia = collectProjectMedia("Tareek-alshahba");
const ibtisamaMedia = collectProjectMedia("Ibtisama");
const lujjhMedia = collectProjectMedia("lujjh");
const tatabuMedia = collectProjectMedia("tatabu");

export const projects: PortfolioProject[] = [
    {
        slug: "upafa-university-digital-platform",
        name: "UPAFA University Platform",
        category: "react",
        timeline: "Jan 1, 2026 - Feb 22, 2026",
        description:
            "Official university web platform with structured frontend architecture for admissions, programs, and academic content.",
        codeSummary:
            "Highlights: • Built reusable modules for admissions and program pages. • Improved performance with rendering and asset optimization. • Delivered a consistent content system across key university pages.",
        stack: ["React.js", "TypeScript", "TailwindCSS"],
        image: upafaMedia.image,
        gallery: upafaMedia.gallery,
        codeGallery: upafaMedia.codeGallery,
        productionSections: upafaMedia.productionSections,
        githubUrl: "",
        liveUrl: "https://upafa-edu.com/",
        featured: true,
    },
    {
        slug: "yogo-kids-child-care-booking-platform",
        name: "Childcare Booking Platform",
        category: "next.js",
        timeline: "Dec 25, 2025 - Feb 1, 2026",
        description:
            "Booking platform for parents to register children, manage schedules, and follow class availability.",
        codeSummary:
            "Highlights: • Designed a clear booking flow from registration to confirmation. • Built admin views for schedules, attendance, and capacity. • Structured reusable components for faster feature delivery.",
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
            "Operations dashboard for cargo registration, shipment tracking, and customs-related workflow handling.",
        codeSummary:
            "Highlights: • Implemented QR-based shipment tracking in the dashboard. • Built complex cargo forms with pricing and rules validation. • Added export-ready views for daily logistics operations.",
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
            "Appointment booking system for clinics with role-based access for reception staff and doctors.",
        codeSummary:
            "Highlights: • Built conflict-aware appointment scheduling with calendar views. • Implemented role-based interfaces for doctors and reception staff. • Connected frontend workflows to Express.js APIs and MySQL.",
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
            "Boat reservation platform for the Saudi market with booking-focused landing pages and admin operations.",
        codeSummary:
            "Highlights: • Built a high-conversion landing page for booking intent. • Developed an admin dashboard for trips, pricing, and reservations. • Optimized responsive behavior for mobile-first usage.",
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
            "Shipment tracking platform focused on live status flow, route visibility, and operational monitoring.",
        codeSummary:
            "Highlights: • Built tracking-first dashboard screens for shipment lifecycle updates. • Structured reusable UI blocks for status timelines and operations panels. • Implemented responsive views for desktop and tablet logistics workflows.",
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
