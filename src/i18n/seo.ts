import type { MessageCatalog } from "./messages";

const DEFAULT_OG_IMAGE = "/images/og-image.jpg";
const DYNAMIC_SCHEMA_SCRIPT_ID = "dynamic-page-schema";

interface SeoPayload {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    locale: string;
    localeAlternate: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    robots?: string;
    twitterCard?: "summary" | "summary_large_image";
    schema?: Record<string, unknown> | null;
}

interface ProjectSeoInput {
    title: string;
    description: string;
    keywords: string;
    locale: string;
    localeAlternate: string;
    image?: string;
    url?: string;
    ogTitle?: string;
    ogDescription?: string;
    schema?: Record<string, unknown> | null;
}

function upsertMeta(
    selector: string,
    attribute: "name" | "property",
    key: string,
    content: string,
) {
    let element = document.head.querySelector<HTMLMetaElement>(selector);

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

function upsertCanonical(url: string) {
    let link = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
    );

    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }

    link.setAttribute("href", url);
}

function upsertDynamicSchema(schema: Record<string, unknown> | null) {
    const existingScript = document.getElementById(DYNAMIC_SCHEMA_SCRIPT_ID);
    if (!schema) {
        existingScript?.remove();
        return;
    }

    const nextScript =
        existingScript ??
        Object.assign(document.createElement("script"), {
            id: DYNAMIC_SCHEMA_SCRIPT_ID,
            type: "application/ld+json",
        });

    nextScript.textContent = JSON.stringify(schema);

    if (!existingScript) {
        document.head.appendChild(nextScript);
    }
}

function resolveAbsoluteUrl(pathOrUrl: string) {
    if (/^https?:\/\//i.test(pathOrUrl)) {
        return pathOrUrl;
    }

    if (typeof window === "undefined") {
        return pathOrUrl;
    }

    return new URL(pathOrUrl, window.location.origin).toString();
}

function currentPathUrl() {
    if (typeof window === "undefined") {
        return "/";
    }

    return `${window.location.pathname}${window.location.search}`;
}

function applySeoPayload(payload: SeoPayload) {
    const imageUrl = resolveAbsoluteUrl(payload.image ?? DEFAULT_OG_IMAGE);
    const pageUrl = resolveAbsoluteUrl(payload.url ?? currentPathUrl());
    const robotsContent =
        payload.robots ??
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = payload.title;

    upsertMeta(
        'meta[name="description"]',
        "name",
        "description",
        payload.description,
    );
    upsertMeta('meta[name="keywords"]', "name", "keywords", payload.keywords);
    upsertMeta('meta[name="robots"]', "name", "robots", robotsContent);

    upsertMeta(
        'meta[property="og:type"]',
        "property",
        "og:type",
        payload.type ?? "website",
    );
    upsertMeta(
        'meta[property="og:title"]',
        "property",
        "og:title",
        payload.ogTitle,
    );
    upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        payload.ogDescription,
    );
    upsertMeta('meta[property="og:url"]', "property", "og:url", pageUrl);
    upsertMeta(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        payload.title,
    );
    upsertMeta(
        'meta[property="og:locale"]',
        "property",
        "og:locale",
        payload.locale,
    );
    upsertMeta(
        'meta[property="og:locale:alternate"]',
        "property",
        "og:locale:alternate",
        payload.localeAlternate,
    );
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);

    upsertMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        payload.twitterCard ?? "summary_large_image",
    );
    upsertMeta(
        'meta[name="twitter:title"]',
        "name",
        "twitter:title",
        payload.ogTitle,
    );
    upsertMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        payload.ogDescription,
    );
    upsertMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        imageUrl,
    );

    upsertCanonical(pageUrl);
    upsertDynamicSchema(payload.schema ?? null);
}

export function applySeoTags(text: MessageCatalog) {
    const { seo } = text;

    applySeoPayload({
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        locale: seo.locale,
        localeAlternate: seo.localeAlternate,
        type: "website",
        schema: null,
    });
}

export function applyProjectSeoTags(input: ProjectSeoInput) {
    applySeoPayload({
        title: input.title,
        description: input.description,
        keywords: input.keywords,
        ogTitle: input.ogTitle ?? input.title,
        ogDescription: input.ogDescription ?? input.description,
        locale: input.locale,
        localeAlternate: input.localeAlternate,
        image: input.image,
        url: input.url,
        type: "article",
        schema: input.schema ?? null,
    });
}
