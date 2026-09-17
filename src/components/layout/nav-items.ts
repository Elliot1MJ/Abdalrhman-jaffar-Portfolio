import type { MessageCatalog } from "@/lib/i18n/messages";

export interface NavChild {
    href: string;
    label: string;
    description: string;
    /** Icon key resolved to a component at the render site. */
    icon: NavIcon;
}

export type NavIcon =
    | "user"
    | "file"
    | "grid"
    | "package"
    | "code"
    | "server"
    | "book"
    | "chat";

export interface NavItem {
    href: string;
    label: string;
    /** When present, hovering the item opens the full-width subnav. */
    children?: NavChild[];
}

/**
 * Single source of truth for site navigation.
 *
 * The header, the subnav, the sidebar and the footer all derive from this, so
 * adding a route means editing one array instead of four. (Previously the
 * header and footer kept separate hand-maintained copies that had already
 * drifted apart.)
 *
 * Note `sitemap.ts` still keeps its own list — it runs on the server and cannot
 * import the client-side message catalogue.
 */
export function getNavItems(text: MessageCatalog): NavItem[] {
    return [
        { href: "/", label: text.nav.home },
        {
            href: "/about",
            label: text.nav.about,
            children: [
                {
                    href: "/about",
                    label: text.about.title,
                    description: text.about.eyebrow,
                    icon: "user",
                },
                {
                    href: "/about#resume",
                    label: text.nav.resume,
                    description: text.cv.eyebrow,
                    icon: "file",
                },
            ],
        },
        {
            href: "/services",
            label: text.nav.services,
            children: text.services.cards.map((card, index) => ({
                href: "/services",
                label: card.title,
                description: String(index + 1).padStart(2, "0"),
                icon: "grid" as NavIcon,
            })),
        },
        {
            href: "/work",
            label: text.nav.work,
            children: [
                {
                    // `?tab=` selects the tab on /work; without it the Tools
                    // entry landed on the page's default "Featured" tab.
                    href: "/work?tab=all",
                    label: text.work.filters.all,
                    description: text.work.eyebrow,
                    icon: "grid",
                },
                {
                    href: "/work?tab=tools",
                    label: text.work.filters.tools,
                    description: text.tools.eyebrow,
                    icon: "package",
                },
            ],
        },
        {
            href: "/courses",
            label: text.nav.courses,
            children: [
                {
                    href: "/courses",
                    label: text.courses.items.frontend.name,
                    description: text.courses.levels.beginner,
                    icon: "code",
                },
                {
                    href: "/courses",
                    label: text.courses.items.backend.name,
                    description: text.courses.levels.intermediate,
                    icon: "server",
                },
                {
                    href: "/courses",
                    label: text.courses.items["programming-foundations"].name,
                    description: text.courses.levels.beginner,
                    icon: "book",
                },
                {
                    href: "/courses",
                    label: text.courses.items.consultation.name,
                    description: text.courses.levels["all-levels"],
                    icon: "chat",
                },
            ],
        },
        { href: "/contact", label: text.nav.contact },
    ];
}

/**
 * `/work` must stay lit while the visitor is on `/projects/[slug]`, so this is
 * prefix-based rather than the exact equality the header used to use.
 */
export function isNavItemActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/work") {
        return pathname.startsWith("/work") || pathname.startsWith("/projects");
    }
    return pathname.startsWith(href);
}
