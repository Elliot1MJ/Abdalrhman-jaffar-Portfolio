"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "@/components/providers/theme-provider";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
    locale: Locale;
    text: MessageCatalog;
}

export function SiteHeader({ locale, text }: SiteHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
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
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
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
                                    "text-sm text-muted-foreground transition-colors hover:text-foreground",
                                    isActive && "text-foreground",
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <button
                        type="button"
                        aria-label={text.nav.toggleLanguage}
                        onClick={() => router.push(switchLocaleHref)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary"
                    >
                        {locale === "ar" ? "EN" : "AR"}
                    </button>
                    <button
                        type="button"
                        aria-label={text.nav.toggleTheme}
                        onClick={toggleTheme}
                        className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary"
                    >
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>
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

            {isOpen && (
                <div className="border-t border-border/70 px-5 py-4 lg:hidden">
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
                            onClick={() => router.push(switchLocaleHref)}
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground"
                        >
                            {locale === "ar" ? "EN" : "AR"}
                        </button>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
                        >
                            {theme === "dark" ? <FiSun /> : <FiMoon />}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
