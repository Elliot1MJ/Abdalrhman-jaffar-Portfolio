"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
    FiGlobe,
    FiX,
    FiArrowUpRight,
    FiChevronDown,
} from "react-icons/fi";
import { FaGitlab, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/language-provider";
import { profile } from "@/lib/data/profile";
import { OctopusMark } from "@/components/shared/octopus-mark";
import { getNavItems, isNavItemActive } from "@/components/layout/nav-items";
import { NavIcon } from "@/components/layout/nav-icon";
import { MOTION_DURATION, MOTION_EASE_EMPHASIS, MOTION_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navStagger = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: MOTION_STAGGER.tight,
            delayChildren: 0.12,
        },
    },
};

interface SiteSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Full navigation panel, available at every breakpoint (the old drawer was
 * `lg:hidden` and mobile-only).
 *
 * Still built on the Radix Dialog primitive, which supplies the focus trap,
 * Escape handling, scroll lock and `aria-modal` for free — `forceMount` on the
 * portal hands exit animation to framer.
 */
export function SiteSidebar({ open, onOpenChange }: SiteSidebarProps) {
    const pathname = usePathname();
    const { text, dir, toggleLocale } = useLanguage();
    const navItems = getNavItems(text);
    // Which section is expanded. The sidebar previously had no submenus at all,
    // so the sub-pages it links to were unreachable from it.
    const [expanded, setExpanded] = useState<string | null>(null);

    // The panel enters from the inline-start edge, which flips with direction.
    const offscreen = dir === "rtl" ? "100%" : "-100%";
    const itemVariants = {
        hidden: { opacity: 0, x: dir === "rtl" ? -18 : 18 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: MOTION_DURATION.base,
                ease: MOTION_EASE_EMPHASIS,
            },
        },
    };

    const socials = [
        // Numeric form, not the `wa.me/message/...` short-link, which is dead.
        {
            label: "WhatsApp",
            href: `https://wa.me/${profile.whatsappNumber}`,
            icon: <FaWhatsapp />,
        },
        { label: "Instagram", href: profile.instagram, icon: <FaInstagram /> },
        { label: "GitLab", href: profile.gitlab, icon: <FaGitlab /> },
    ];

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <DialogPrimitive.Portal forceMount>
                        <DialogPrimitive.Overlay asChild forceMount>
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: MOTION_DURATION.fast }}
                                className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-md"
                            />
                        </DialogPrimitive.Overlay>

                        <DialogPrimitive.Content asChild forceMount>
                            <m.div
                                initial={{ x: offscreen }}
                                animate={{ x: "0%" }}
                                exit={{ x: offscreen }}
                                transition={{
                                    duration: MOTION_DURATION.slow,
                                    ease: MOTION_EASE_EMPHASIS,
                                }}
                                className="fixed inset-y-0 inset-s-0 z-[80] flex w-full max-w-sm flex-col border-e border-border bg-background p-6 shadow-2xl outline-none sm:p-8"
                            >
                                <DialogPrimitive.Title className="sr-only">
                                    {text.nav.navigate}
                                </DialogPrimitive.Title>

                                <div className="flex shrink-0 items-center justify-between pb-6">
                                    <Link
                                        href="/"
                                        onClick={() => onOpenChange(false)}
                                        className="flex items-center gap-2.5"
                                    >
                                        <OctopusMark
                                            alt={text.profile.shortName}
                                            width={28}
                                            height={28}
                                            className="h-7 w-7"
                                        />
                                        <span className="font-medium tracking-tight text-foreground">
                                            {text.profile.shortName}
                                        </span>
                                    </Link>
                                    <DialogPrimitive.Close asChild>
                                        <button
                                            type="button"
                                            aria-label={text.nav.closeSidebar}
                                            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                                        >
                                            <FiX />
                                        </button>
                                    </DialogPrimitive.Close>
                                </div>

                                {/*
                                  * `initial`/`animate` are repeated here rather
                                  * than inherited: the parent panel animates with
                                  * plain objects, not variant labels, so the
                                  * "show" label never propagates down and the
                                  * items would stay stuck at opacity 0.
                                  */}
                                {/*
                                  * The scroll region is a plain <div>, not the
                                  * motion element.
                                  *
                                  * Lenis owns the wheel globally: `smoothWheel`
                                  * listens on window and drives the page with
                                  * `window.scrollTo`, so Radix's scroll lock
                                  * (which only sets `overflow: hidden` and
                                  * cancels native propagation) could not stop it
                                  * — the wheel scrolled the page behind the
                                  * panel even with the pointer over an
                                  * overflowing nav. Measured before the fix: nav
                                  * scrollHeight 586 / clientHeight 468 with
                                  * submenus open, nav scrollTop stayed 0 while
                                  * window.scrollY moved 360px.
                                  *
                                  * `data-lenis-prevent` is Lenis's opt-out for
                                  * nested scroll areas, and it has to sit on a
                                  * plain element: framer's `m.nav` forwards
                                  * neither unknown DOM attributes nor a ref to
                                  * the node, so both a JSX prop and a callback
                                  * ref were verified absent from the live DOM.
                                  * Any future scrollable overlay needs the same.
                                  */}
                                <div
                                    data-lenis-prevent=""
                                    className="-mx-1 min-h-0 flex-1 overflow-y-auto overscroll-contain px-1"
                                >
                                {/*
                                  * `initial`/`animate` are repeated here rather
                                  * than inherited: the parent panel animates with
                                  * plain objects, not variant labels, so the
                                  * "show" label never propagates down and the
                                  * items would stay stuck at opacity 0.
                                  */}
                                <m.nav
                                    initial="hidden"
                                    animate="show"
                                    variants={navStagger}
                                    className="flex flex-col"
                                >
                                    {navItems.map((navItem) => {
                                        const active = isNavItemActive(
                                            pathname,
                                            navItem.href,
                                        );
                                        const isExpanded = expanded === navItem.href;
                                        return (
                                            <m.div
                                                key={navItem.href}
                                                variants={itemVariants}
                                            >
                                                <div className="border-b border-border/60">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={navItem.href}
                                                            onClick={() => onOpenChange(false)}
                                                            className={cn(
                                                                "group flex flex-1 items-baseline justify-between gap-4 py-4 transition-colors",
                                                                active
                                                                    ? "text-foreground"
                                                                    : "text-muted-foreground hover:text-foreground",
                                                            )}
                                                        >
                                                            <span className="type-title">
                                                                {navItem.label}
                                                            </span>
                                                            <FiArrowUpRight
                                                                aria-hidden
                                                                className={cn(
                                                                    "shrink-0 transition-all rtl:-scale-x-100",
                                                                    active
                                                                        ? "text-accent-text opacity-100"
                                                                        : "opacity-0 group-hover:opacity-70",
                                                                )}
                                                            />
                                                        </Link>

                                                        {navItem.children?.length ? (
                                                            <button
                                                                type="button"
                                                                aria-label={navItem.label}
                                                                aria-expanded={isExpanded}
                                                                onClick={() =>
                                                                    setExpanded((current) =>
                                                                        current === navItem.href
                                                                            ? null
                                                                            : navItem.href,
                                                                    )
                                                                }
                                                                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                                            >
                                                                <FiChevronDown
                                                                    aria-hidden
                                                                    className={cn(
                                                                        "transition-transform",
                                                                        isExpanded && "rotate-180",
                                                                    )}
                                                                />
                                                            </button>
                                                        ) : null}
                                                    </div>

                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && navItem.children ? (
                                                            <m.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{
                                                                    duration: MOTION_DURATION.base,
                                                                    ease: MOTION_EASE_EMPHASIS,
                                                                }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="flex flex-col gap-1 pb-4 ps-1">
                                                                    {navItem.children.map((child) => (
                                                                        <Link
                                                                            key={`${child.href}-${child.label}`}
                                                                            href={child.href}
                                                                            onClick={() => onOpenChange(false)}
                                                                            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
                                                                        >
                                                                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/70 text-accent-text">
                                                                                <NavIcon name={child.icon} />
                                                                            </span>
                                                                            {child.label}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </m.div>
                                                        ) : null}
                                                    </AnimatePresence>
                                                </div>
                                            </m.div>
                                        );
                                    })}
                                </m.nav>
                                </div>

                                <div className="flex shrink-0 flex-col gap-6 pt-8">
                                    <div className="flex items-center gap-3">
                                        {socials.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={social.label}
                                                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 border-t border-border/60 pt-6">
                                        <button
                                            type="button"
                                            aria-label={text.nav.toggleLanguage}
                                            onClick={toggleLocale}
                                            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                                        >
                                            <FiGlobe />
                                        </button>
                                    </div>
                                </div>
                            </m.div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </DialogPrimitive.Root>
    );
}
