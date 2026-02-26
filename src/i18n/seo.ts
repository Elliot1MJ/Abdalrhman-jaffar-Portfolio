import type { MessageCatalog } from "./messages";

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

export function applySeoTags(text: MessageCatalog) {
    const { seo } = text;

    document.title = seo.title;

    upsertMeta('meta[name="description"]', "name", "description", seo.description);
    upsertMeta('meta[name="keywords"]', "name", "keywords", seo.keywords);
    upsertMeta(
        'meta[name="robots"]',
        "name",
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:title"]', "property", "og:title", seo.ogTitle);
    upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        seo.ogDescription,
    );
    upsertMeta(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        "Abdalrhman Jaffar Portfolio",
    );
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", seo.locale);
    upsertMeta(
        'meta[property="og:locale:alternate"]',
        "property",
        "og:locale:alternate",
        seo.localeAlternate,
    );
    upsertMeta('meta[property="og:image"]', "property", "og:image", "/images/hero.webp");

    upsertMeta(
        'meta[name="twitter:card"]',
        "name",
        "twitter:card",
        "summary_large_image",
    );
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.ogTitle);
    upsertMeta(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        seo.ogDescription,
    );
    upsertMeta(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        "/images/hero.webp",
    );
}
