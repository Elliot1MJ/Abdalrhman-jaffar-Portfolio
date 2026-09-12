import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { projects } from "@/lib/data/portfolio";

const SITE_URL = "https://abdalrhman-jaffar-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPaths = ["", "/about", "/services", "/projects", "/cv", "/contact"];

    const staticEntries = locales.flatMap((locale) =>
        staticPaths.map((path) => ({
            url: `${SITE_URL}/${locale}${path}`,
            lastModified: new Date(),
        })),
    );

    const projectEntries = locales.flatMap((locale) =>
        projects.map((project) => ({
            url: `${SITE_URL}/${locale}/projects/${project.slug}`,
            lastModified: new Date(),
        })),
    );

    return [...staticEntries, ...projectEntries];
}
