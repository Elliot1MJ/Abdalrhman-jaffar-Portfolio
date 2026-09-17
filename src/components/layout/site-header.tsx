"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    AnimatePresence,
    m,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from "framer-motion";
import { FiGlobe, FiMenu, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/language-provider";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { OctopusMark } from "@/components/shared/octopus-mark";
import { SiteSidebar } from "@/components/layout/site-sidebar";
import { NavIcon } from "@/components/layout/nav-icon";
import {
    getNavItems,
    isNavItemActive,
    type NavItem,
} from "@/components/layout/nav-items";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    MOTION_EASE_STANDARD,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const subnavStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};

const subnavItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_EMPHASIS },
    },
};

function IconButton({
    label,
    onClick,
    children,
}: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    aria-label={label}
                    onClick={onClick}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                >
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

export function SiteHeader() {
    const pathname = usePathname();
    const { text, toggleLocale } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCondensed, setIsCondensed] = useState(false);
    const [openSubnav, setOpenSubnav] = useState<string | null>(null);

    const navItems = getNavItems(text);
    const activeSubnav = navItems.find(
        (navItem) => navItem.href === openSubnav && navItem.children?.length,
    );

    // Condense on scroll. `useMotionValueEvent` reads the scroll value outside
    // React's render loop, so this sets state only on the two frames where the
    // boolean actually flips — not on every scroll tick.
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        const next = latest > 24;
        setIsCondensed((current) => (current === next ? current : next));
    });

    // Publish the header's live height so the scroll-progress bar sits flush
    // against its bottom edge in both the normal and condensed states.
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--nav-height-current",
            isCondensed ? "3.5rem" : "4.5rem",
        );
    }, [isCondensed]);

    // Any route change closes the subnav, including back/forward.
    useEffect(() => {
        setOpenSubnav(null);
    }, [pathname]);

    useEffect(() => {
        if (!openSubnav) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenSubnav(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [openSubnav]);

    const handleItemEnter = (navItem: NavItem) => {
        setOpenSubnav(navItem.children?.length ? navItem.href : null);
    };

    return (
        <>
            <m.header
                initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: MOTION_DURATION.base,
                    ease: MOTION_EASE_STANDARD,
                }}
                onMouseLeave={() => setOpenSubnav(null)}
                className={cn(
                    // Fixed, not sticky — `<main>` carries a matching top pad.
                    "fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,box-shadow] duration-300",
                    isCondensed
                        ? "border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
                        : "border-transparent bg-background/70 backdrop-blur-lg",
                )}
            >
                <div
                    className={cn(
                        "mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8",
                        isCondensed ? "h-14" : "h-(--nav-height)",
                    )}
                >
                    <Link href="/" className="group flex items-center gap-2.5">
                        <OctopusMark
                            alt={text.profile.shortName}
                            width={28}
                            height={28}
                            className="h-7 w-7 transition-transform group-hover:rotate-[-8deg]"
                        />
                        <span className="font-medium tracking-tight text-foreground">
                            {text.profile.shortName}
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        {navItems.map((navItem) => {
                            const isActive = isNavItemActive(pathname, navItem.href);
                            return (
                                <Link
                                    key={navItem.href}
                                    href={navItem.href}
                                    onMouseEnter={() => handleItemEnter(navItem)}
                                    onFocus={() => handleItemEnter(navItem)}
                                    aria-expanded={
                                        navItem.children?.length
                                            ? openSubnav === navItem.href
                                            : undefined
                                    }
                                    className={cn(
                                        "relative pb-1 text-sm transition-colors hover:text-foreground",
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {navItem.label}
                                    {isActive && (
                                        <m.span
                                            layoutId="nav-underline"
                                            className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                                            transition={{
                                                duration: MOTION_DURATION.fast,
                                                ease: MOTION_EASE_STANDARD,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 sm:flex">
                            <IconButton
                                label={text.nav.toggleLanguage}
                                onClick={toggleLocale}
                            >
                                <FiGlobe />
                            </IconButton>
                        </div>

                        <button
                            type="button"
                            aria-label={text.nav.openSidebar}
                            onClick={() => setIsSidebarOpen(true)}
                            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                        >
                            <FiMenu />
                        </button>
                    </div>
                </div>

                {/*
                 * Full-bleed subnav. It lives inside <header> so moving the
                 * pointer from a nav link down into the panel never crosses a
                 * gap that would trigger onMouseLeave.
                 */}
                <AnimatePresence initial={false}>
                    {activeSubnav && !shouldReduceMotion && (
                        <m.div
                            key={activeSubnav.href}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: MOTION_DURATION.base,
                                ease: MOTION_EASE_EMPHASIS,
                            }}
                            className="hidden overflow-hidden border-y border-border/60 bg-background/95 backdrop-blur-xl lg:block"
                        >
                            <m.div
                                initial="hidden"
                                animate="show"
                                variants={subnavStagger}
                                className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8"
                            >
                                <m.p
                                    variants={subnavItem}
                                    className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground"
                                >
                                    {activeSubnav.label}
                                </m.p>

                                <div className="mt-4 grid gap-2 md:grid-cols-4">
                                    {activeSubnav.children?.map((child) => (
                                        <m.div
                                            key={`${child.href}-${child.label}`}
                                            variants={subnavItem}
                                        >
                                            <Link
                                                href={child.href}
                                                onClick={() => setOpenSubnav(null)}
                                                className="group/card flex items-start gap-3 rounded-xl border border-transparent p-3.5 transition-all hover:border-border hover:bg-card/60"
                                            >
                                                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-card/60 text-accent-text transition-colors group-hover/card:border-primary/50 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                                                    <NavIcon name={child.icon} />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-sm font-medium text-foreground">
                                                        {child.label}
                                                    </span>
                                                    <span className="mt-0.5 block text-xs text-muted-foreground">
                                                        {child.description}
                                                    </span>
                                                </span>
                                                <FiArrowUpRight
                                                    aria-hidden
                                                    className="ms-auto shrink-0 text-muted-foreground opacity-0 transition-all group-hover/card:opacity-100 rtl:-scale-x-100"
                                                />
                                            </Link>
                                        </m.div>
                                    ))}
                                </div>
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.header>

            <SiteSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
        </>
    );
}
