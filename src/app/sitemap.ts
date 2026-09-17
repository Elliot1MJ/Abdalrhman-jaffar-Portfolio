import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/portfolio";

const SITE_URL = "https://abdalrhman-jaffar-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    // `/projects`, `/tools` and `/cv` are 308 redirects now (see
    // next.config.ts) and must not be advertised as canonical URLs.
    const staticPaths = [
        "",
        "/about",
        "/services",
        "/work",
        "/courses",
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
