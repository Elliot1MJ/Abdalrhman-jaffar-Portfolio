import fs from "node:fs";
import path from "node:path";

const GALLERY_ROOT = path.join(
    process.cwd(),
    "public",
    "images",
    "Project_Code_Gallery",
);

export interface ProductionSection {
    key: string;
    title: string;
    images: string[];
}

export interface ProjectMedia {
    image: string;
    gallery: string[];
    codeGallery: string[];
    productionSections: ProductionSection[];
}

function compareByNaturalPath(a: string, b: string) {
    return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

function getPreferredImageFormatRank(filePath: string) {
    const lowerPath = filePath.toLowerCase();
    if (lowerPath.endsWith(".avif")) return 0;
    if (lowerPath.endsWith(".webp")) return 1;
    if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) return 2;
    if (lowerPath.endsWith(".png")) return 3;
    return 4;
}

function formatSectionTitle(rawKey: string) {
    if (rawKey === "production") return "Production";

    const normalized = rawKey
        .replace(/[-_]+/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .trim();

    if (!normalized) return "Production";

    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function walkFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walkFiles(fullPath));
        } else if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

function toPublicPath(absolutePath: string) {
    const relative = path.relative(
        path.join(process.cwd(), "public"),
        absolutePath,
    );
    return `/${relative.split(path.sep).join("/")}`;
}

export function collectProjectMedia(folderName: string): ProjectMedia {
    const projectDir = path.join(GALLERY_ROOT, folderName);
    const allFiles = walkFiles(projectDir).map(toPublicPath);

    const mainEntries = allFiles
        .filter((p) => p.includes("/mainPic/"))
        .sort((a, b) => {
            const rankDifference =
                getPreferredImageFormatRank(a) - getPreferredImageFormatRank(b);
            if (rankDifference !== 0) return rankDifference;
            return compareByNaturalPath(a, b);
        });

    const productionEntries = allFiles
        .filter((p) => p.includes("/Production/"))
        .sort(compareByNaturalPath);

    const codeEntries = allFiles
        .filter((p) => p.includes("/Code/"))
        .sort(compareByNaturalPath);

    const mainImage = mainEntries[0] ?? "";

    const productionSectionMap = new Map<string, string[]>();
    for (const p of productionEntries) {
        const productionPathPart = p.split("/Production/")[1] ?? "";
        const segments = productionPathPart.split("/").filter(Boolean);
        const sectionKey = segments.length > 1 ? segments[0] : "production";
        const items = productionSectionMap.get(sectionKey) ?? [];
        items.push(p);
        productionSectionMap.set(sectionKey, items);
    }

    const productionSectionKeys = Array.from(
        productionSectionMap.keys(),
    ).sort(compareByNaturalPath);

    const productionSections: ProductionSection[] = productionSectionKeys.map(
        (key) => ({
            key,
            title: formatSectionTitle(key),
            images: (productionSectionMap.get(key) ?? []).sort(
                compareByNaturalPath,
            ),
        }),
    );

    const productionImages = productionSections.flatMap((s) => s.images);
    const gallery = productionImages;
    const codeGallery = codeEntries.length ? codeEntries : productionImages;

    const firstAvailableImage =
        mainImage ||
        productionImages[0] ||
        codeGallery[0] ||
        "/images/project-fallback.svg";

    return {
        image: firstAvailableImage,
        gallery,
        codeGallery,
        productionSections,
    };
}
