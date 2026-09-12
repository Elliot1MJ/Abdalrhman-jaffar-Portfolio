"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiGlobe, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "@/components/providers/theme-provider";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MOTION_DURATION, MOTION_EASE_STANDARD } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
    locale: Locale;
    text: MessageCatalog;
}

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

export function SiteHeader({ locale, text }: SiteHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const shouldReduceMotion = useReducedMotion();
    const [isOpen, setIsOpen] = useState(false);

    const otherLocale: Locale = locale === "ar" ? "en" : "ar";
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "") || "/";
    const switchLocaleHref = `/${otherLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    const navItems = [
        { href: `/${locale}`, label: text.nav.home },
        { href: `/${locale}/about`, label: text.nav.about },
        { href: `/${locale}/services`, label: text.nav.services },
        { href: `/${locale}/projects`, label: text.nav.projects },
        { href: `/${locale}/cv`, label: text.nav.cv },
        { href: `/${locale}/contact`, label: text.nav.contact },
    ];

    const logoSrc =
        theme === "light"
            ? "/brand/octopus-mark-light.svg"
            : "/brand/octopus-mark-dark.svg";

    return (
        <m.header
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: MOTION_DURATION.base,
                ease: MOTION_EASE_STANDARD,
            }}
            className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2.5"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logoSrc}
                        alt={text.profile.shortName}
                        width={28}
                        height={28}
                        className="h-7 w-7"
                    />
                    <span className="font-medium tracking-tight text-foreground">
                        {text.profile.shortName}
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                                    isActive && "text-foreground",
                                )}
                            >
                                {item.label}
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

                <div className="hidden items-center gap-2 lg:flex">
                    <IconButton
                        label={text.nav.toggleLanguage}
                        onClick={() => router.push(switchLocaleHref)}
                    >
                        <FiGlobe />
                    </IconButton>
                    <IconButton
                        label={text.nav.toggleTheme}
                        onClick={toggleTheme}
                    >
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </IconButton>
                </div>

                <button
                    type="button"
                    aria-label={isOpen ? text.nav.closeMenu : text.nav.openMenu}
                    onClick={() => setIsOpen((v) => !v)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground lg:hidden"
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <m.div
                        initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: MOTION_DURATION.base,
                            ease: MOTION_EASE_STANDARD,
                        }}
                        className="overflow-hidden border-t border-border/70 lg:hidden"
                    >
                        <div className="px-5 py-4">
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-base text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-5 flex items-center gap-3">
                                <button
                                    type="button"
                                    aria-label={text.nav.toggleLanguage}
                                    onClick={() => router.push(switchLocaleHref)}
                                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
                                >
                                    <FiGlobe />
                                </button>
                                <button
                                    type="button"
                                    aria-label={text.nav.toggleTheme}
                                    onClick={toggleTheme}
                                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
                                >
                                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                                </button>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </m.header>
    );
}
