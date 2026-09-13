"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiGlobe, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "@/components/providers/theme-provider";
import { useLanguage } from "@/lib/i18n/language-provider";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

const sidebarStagger = {
    hidden: {},
    show: { transition: { staggerChildren: MOTION_STAGGER.tight } },
};

const sidebarItem = {
    hidden: { opacity: 0, x: 16 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE_STANDARD },
    },
};

export function SiteHeader() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { text, dir, toggleLocale } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/", label: text.nav.home },
        { href: "/about", label: text.nav.about },
        { href: "/services", label: text.nav.services },
        { href: "/projects", label: text.nav.projects },
        { href: "/tools", label: text.nav.tools },
        { href: "/cv", label: text.nav.cv },
        { href: "/contact", label: text.nav.contact },
    ];

    const logoSrc =
        theme === "light"
            ? "/brand/octopus-mark-light.svg"
            : "/brand/octopus-mark-dark.svg";

    const sidebarSlideX = dir === "rtl" ? ["100%", "0%"] : ["-100%", "0%"];

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
            <div className="mx-auto flex h-(--nav-height) max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
                <Link href="/" className="flex items-center gap-2.5">
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
                        onClick={toggleLocale}
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
                    aria-label={text.nav.openMenu}
                    onClick={() => setIsOpen(true)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground lg:hidden"
                >
                    <FiMenu />
                </button>
            </div>

            <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
                <AnimatePresence>
                    {isOpen && (
                        <DialogPrimitive.Portal forceMount>
                            <DialogPrimitive.Overlay asChild forceMount>
                                <m.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: MOTION_DURATION.fast }}
                                    className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden"
                                />
                            </DialogPrimitive.Overlay>
                            <DialogPrimitive.Content asChild forceMount>
                                <m.div
                                    initial={{ x: sidebarSlideX[0] }}
                                    animate={{ x: sidebarSlideX[1] }}
                                    exit={{ x: sidebarSlideX[0] }}
                                    transition={{
                                        duration: MOTION_DURATION.base,
                                        ease: MOTION_EASE_STANDARD,
                                    }}
                                    className="fixed inset-y-0 inset-s-0 z-50 flex w-full max-w-xs flex-col gap-8 border-e border-border bg-background p-6 shadow-lg outline-none lg:hidden"
                                >
                                    <DialogPrimitive.Title className="sr-only">
                                        {text.nav.navigate}
                                    </DialogPrimitive.Title>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium tracking-tight text-foreground">
                                            {text.profile.shortName}
                                        </span>
                                        <DialogPrimitive.Close asChild>
                                            <button
                                                type="button"
                                                aria-label={text.nav.closeMenu}
                                                className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground"
                                            >
                                                <FiX />
                                            </button>
                                        </DialogPrimitive.Close>
                                    </div>

                                    <m.nav
                                        initial="hidden"
                                        animate="show"
                                        variants={sidebarStagger}
                                        className="flex flex-col gap-1"
                                    >
                                        {navItems.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <m.div key={item.href} variants={sidebarItem}>
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={cn(
                                                            "block rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                                                            isActive &&
                                                                "bg-secondary text-foreground",
                                                        )}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </m.div>
                                            );
                                        })}
                                    </m.nav>

                                    <div className="mt-auto flex items-center gap-3">
                                        <button
                                            type="button"
                                            aria-label={text.nav.toggleLanguage}
                                            onClick={toggleLocale}
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
                                </m.div>
                            </DialogPrimitive.Content>
                        </DialogPrimitive.Portal>
                    )}
                </AnimatePresence>
            </DialogPrimitive.Root>
        </m.header>
    );
}
