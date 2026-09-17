/**
 * Service catalogue.
 *
 * Structural data only — the display copy lives in `messages.ts` under
 * `services.cards`, keyed by the same order, so both languages stay in sync.
 * `slug` is what gets sent in the WhatsApp order message.
 */

export type ServiceSlug =
    | "landing-pages"
    | "react-systems"
    | "shopify-stores"
    | "bots-automation";

export interface Service {
    slug: ServiceSlug;
    /** Technology names — always Latin, rendered with `data-latin`. */
    stack: string[];
}

export const services: Service[] = [
    { slug: "landing-pages", stack: ["Next.js", "React.js", "Tailwind CSS"] },
    { slug: "react-systems", stack: ["React.js", "TypeScript", "REST APIs"] },
    { slug: "shopify-stores", stack: ["Shopify", "Liquid", "E-commerce"] },
    { slug: "bots-automation", stack: ["Node.js", "Automation", "APIs"] },
];
