import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/portfolio";

const SITE_URL = "https://abdalrhman-jaffar-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPaths = [
        "",
        "/about",
        "/services",
        "/projects",
        "/tools",
        "/cv",
        "/contact",
    ];

    const staticEntries = staticPaths.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
    }));

    const projectEntries = projects.map((project) => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(),
    }));

    return [...staticEntries, ...projectEntries];
}
