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
        .sort(([a], [b]) => compareByNaturalPath(a, b));
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
        slug: "upafa-university-digital-platform",
        name: "UPAFA – University Digital Platform",
        category: "react",
        timeline: "Jan 1, 2026 - Feb 22, 2026",
        description:
            "Developed UPAFA University's official digital platform with a strong focus on scalability, structured information architecture, and production-ready performance.",
        codeSummary:
            "Built maintainable frontend modules for academic content, admissions workflows, and program pages while optimizing loading behavior and deployment performance.",
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
        name: "Yogo Kids – Child Care Booking Platform",
        category: "next.js",
        timeline: "Dec 25, 2025 - Feb 1, 2026",
        description:
            "Building a childcare booking system for registering children into organized classes with clear UX flows for parents and admins.",
        codeSummary:
            "Developing a full admin dashboard to manage registrations, schedules, and day-to-day operations using structured, reusable frontend patterns.",
        stack: ["React.js", "TypeScript"],
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
        name: "Tariq Al-Shahba – Logistics & Cargo Management System",
        category: "react",
        timeline: "Aug 2, 2025 - Oct 22, 2025",
        description:
            "Built a full logistics system to digitize cargo registration for UAE-to-Syria shipments with operational clarity for admins and staff.",
        codeSummary:
            "Implemented QR-code shipment tracking from the dashboard, customs-rule-based cargo forms, and structured export flows to PDF and Excel formats.",
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
        name: "Ibtisama Clinic – Dental Appointment Booking System",
        category: "fullstack",
        timeline: "Nov 15, 2025 - Dec 22, 2025",
        description:
            "Developed an online dental appointment booking system with smooth scheduling and organized clinic workflow management.",
        codeSummary:
            "Implemented a two-month calendar scheduling flow and role-based dashboard access for doctors and reception staff with reliable booking handling.",
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
        name: "LUJJH – Boat Booking Platform (Saudi Arabia)",
        category: "next.js",
        timeline: "Jun 6, 2025 - Aug 8, 2025",
        description:
            "Designed and built a scalable boat booking platform targeting the Saudi market with a structure ready for regional expansion.",
        codeSummary:
            "Delivered a conversion-focused landing page and a custom admin dashboard for bookings and operations while owning frontend architecture and delivery.",
        stack: ["React.js", "TypeScript", "TailwindCSS"],
        image: lujjhMedia.image,
        gallery: lujjhMedia.gallery,
        codeGallery: lujjhMedia.codeGallery,
        productionSections: lujjhMedia.productionSections,
        githubUrl: "",
        liveUrl: "",
    },
    {
        slug: "tatabu-location-tracking-platform",
        name: "Tatabu – Location Tracking Platform",
        category: "react",
        timeline: "Jul 4, 2025 - Sep 22, 2025",
        description:
            "Improved and extended an existing URL-based location tracking platform integrated with Google Tag Manager.",
        codeSummary:
            "Enhanced admin dashboard visibility and usability with a focus on frontend performance, interface clarity, and long-term maintainability.",
        stack: ["React.js"],
        image: tatabuMedia.image,
        gallery: tatabuMedia.gallery,
        codeGallery: tatabuMedia.codeGallery,
        productionSections: tatabuMedia.productionSections,
        githubUrl: "",
        liveUrl: "https://dashboard.tatabu.io/#/login",
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
