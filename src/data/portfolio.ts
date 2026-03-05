const projectCodeGalleryAssets = import.meta.glob<{ default: string }>(
    "../assets/images/Project_Code_Gallery/**/*.{png,jpg,jpeg,webp,avif}",
    { eager: true },
);

export interface ProductionSection {
    key: string;
    title: string;
    images: string[];
}

function compareByNaturalPath(a: string, b: string) {
    return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

function getPreferredImageFormatRank(path: string) {
    const lowerPath = path.toLowerCase();
    if (lowerPath.endsWith(".avif")) {
        return 0;
    }
    if (lowerPath.endsWith(".webp")) {
        return 1;
    }
    if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
        return 2;
    }
    if (lowerPath.endsWith(".png")) {
        return 3;
    }

    return 4;
}

function formatSectionTitle(rawKey: string) {
    if (rawKey === "production") {
        return "Production";
    }

    const normalized = rawKey
        .replace(/[-_]+/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .trim();

    if (!normalized) {
        return "Production";
    }

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function collectProjectMedia(folderName: string) {
    const baseSegment = `/Project_Code_Gallery/${folderName}/`;
    const matchingEntries = Object.entries(projectCodeGalleryAssets).filter(
        ([path]) => path.includes(baseSegment),
    );

    const mainEntries = matchingEntries
        .filter(([path]) => path.includes("/mainPic/"))
        .sort(([a], [b]) => {
            const rankDifference =
                getPreferredImageFormatRank(a) - getPreferredImageFormatRank(b);
            if (rankDifference !== 0) {
                return rankDifference;
            }

            return compareByNaturalPath(a, b);
        });
    const productionEntries = matchingEntries
        .filter(([path]) => path.includes("/Production/"))
        .sort(([a], [b]) => compareByNaturalPath(a, b));
    const codeEntries = matchingEntries
        .filter(([path]) => path.includes("/Code/"))
        .sort(([a], [b]) => compareByNaturalPath(a, b));

    const mainImage = mainEntries[0]?.[1].default ?? "";
    const productionSectionMap = new Map<
        string,
        { path: string; src: string }[]
    >();
    for (const [path, mod] of productionEntries) {
        const productionPathPart = path.split("/Production/")[1] ?? "";
        const pathSegments = productionPathPart.split("/").filter(Boolean);
        const sectionKey =
            pathSegments.length > 1 ? pathSegments[0] : "production";
        const sectionItems = productionSectionMap.get(sectionKey) ?? [];
        sectionItems.push({ path, src: mod.default });
        productionSectionMap.set(sectionKey, sectionItems);
    }

    const productionSectionKeys = Array.from(productionSectionMap.keys()).sort(
        compareByNaturalPath,
    );
    const productionSections: ProductionSection[] = productionSectionKeys.map(
        (key) => {
            const sortedItems = (productionSectionMap.get(key) ?? []).sort(
                (a, b) => compareByNaturalPath(a.path, b.path),
            );
            return {
                key,
                title: formatSectionTitle(key),
                images: sortedItems.map((item) => item.src),
            };
        },
    );
    const productionImages = productionSections.flatMap(
        (section) => section.images,
    );
    const gallery = productionImages;
    const codeGallery = codeEntries.map(([, mod]) => mod.default);

    const firstAvailableImage =
        mainImage ||
        productionImages[0] ||
        codeGallery[0] ||
        "/images/project-fallback.svg";

    return {
        image: firstAvailableImage,
        gallery,
        codeGallery: codeGallery.length ? codeGallery : productionImages,
        productionSections,
    };
}

const upafaMedia = collectProjectMedia("upafa");
const yogoKidsMedia = collectProjectMedia("yogoKids");
const tareekAlshahbaMedia = collectProjectMedia("Tareek-alshahba");
const ibtisamaMedia = collectProjectMedia("Ibtisama");
const lujjhMedia = collectProjectMedia("lujjh");
const tatabuMedia = collectProjectMedia("tatabu");

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

export const profile = {
    name: "Abdalrhman Jaffar",
    shortName: "Abdalrhman",
    title: "Frontend Developer",
    roleSummary:
        "I build modern web applications, scalable dashboards, and high-conversion landing pages using React and modern frontend technologies. Focused on performance, clean architecture, and real production systems.",
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
        value: "3+ Years",
        detail: "Building production-ready frontend applications.",
    },
    {
        label: "Primary Focus",
        value: "Dashboards & Booking Platforms",
        detail: "Interface architecture for real operational workflows.",
    },
    {
        label: "Core Stack",
        value: "React, Next.js, TypeScript",
        detail: "Modern frontend tooling for scalable products.",
    },
    {
        label: "Backend Integration",
        value: "REST APIs & Auth",
        detail: "Practical integration with Express.js and MySQL.",
    },
] as const;

export const skillGroups = [
    {
        title: "Frontend",
        skills: [
            "React.js",
            "Next.js",
            "TypeScript",
            "JavaScript (ES6+)",
            "Tailwind CSS",
            "shadcn/ui",
            "Responsive Design",
            "UI Animations",
        ],
    },
    {
        title: "System Design",
        skills: [
            "Admin Dashboards",
            "Booking Systems",
            "Complex Forms",
            "UX Flow Structuring",
        ],
    },
    {
        title: "Backend Integration",
        skills: [
            "REST APIs",
            "Authentication flows",
            "Basic Node.js",
            "Express.js",
            "MySQL",
        ],
    },
] as const;

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

export const education = {
    degree: "Bachelor's Degree in Computer & Control Engineering",
    university: "Lattakia University (formerly Tishreen University)",
    duration: "Expected Graduation: 2028",
    status: "Undergraduate student",
    coursework: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Frontend Architecture",
        "API Integration",
    ],
};

export const values = [
    {
        title: "Frontend",
        description:
            "React.js, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, shadcn/ui, Responsive Design, UI Animations.",
    },
    {
        title: "System Design",
        description:
            "Admin Dashboards, Booking Systems, Complex Forms, UX Flow Structuring.",
    },
    {
        title: "Backend Integration",
        description:
            "REST APIs, Authentication flows, Basic Node.js, Express.js, MySQL.",
    },
] as const;
