import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
    FiBriefcase,
    FiFileText,
    FiHome,
    FiMail,
    FiMenu,
    FiUser,
    FiX,
} from "react-icons/fi";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "../data/portfolio";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: ReactNode;
}

const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "#home", icon: <FiHome /> },
    { id: "about", label: "About", href: "#about", icon: <FiUser /> },
    {
        id: "projects",
        label: "Projects",
        href: "#projects",
        icon: <FiBriefcase />,
    },
    { id: "cv", label: "CV", href: "#cv", icon: <FiFileText /> },
    { id: "contact", label: "Contact", href: "#contact", icon: <FiMail /> },
];

export default function NavigationBar() {
    const shouldReduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const nameParts = profile.name.split(" ").filter(Boolean);
    const brandInitials =
        nameParts.length >= 2
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
            : (nameParts[0]?.[0] ?? "A");

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-section]"),
        );

        if (!sections.length) {
            return;
        }

        let frame = 0;

        const updateActive = () => {
            frame = 0;
            const offset = window.innerHeight * 0.35;
            let current = sections[0];

            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top - offset <= 0) {
                    current = section;
                }
            }

            const nextId = current?.dataset.section;
            if (nextId) {
                setActiveId(nextId);
            }
        };

        const onScroll = () => {
            if (frame) {
                return;
            }
            frame = window.requestAnimationFrame(updateActive);
        };

        updateActive();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, []);

    useEffect(() => {
        const handleHash = () => {
            const nextId = window.location.hash.replace("#", "");
            if (nextId) {
                setActiveId(nextId);
            }
        };

        handleHash();
        window.addEventListener("hashchange", handleHash);

        return () => window.removeEventListener("hashchange", handleHash);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <m.header
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-2xl"
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <a
                    href="#home"
                    className="group inline-flex items-center gap-3"
                >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10 text-sm font-semibold-alt text-primary shadow-[0_15px_30px_-18px_rgba(16,185,129,0.7)] backdrop-blur">
                        {brandInitials}
                    </span>
                    <span className="hidden sm:flex flex-col leading-tight">
                        <span className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                            Portfolio
                        </span>
                        <span className="font-semibold-alt text-sm text-foreground">
                            {profile.shortName}
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-1 backdrop-blur-2xl md:flex">
                    {navItems.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => setActiveId(item.id)}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "rounded-full px-4 py-2 text-xs font-semibold-alt transition-colors sm:text-sm",
                                    isActive
                                        ? "bg-primary/15 text-primary shadow-[0_0_0_1px_rgba(45,212,191,0.45)]"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                                )}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <a href="#contact">
                        <Button size="sm" className="h-9 rounded-full px-4">
                            <FiMail className="text-base" />
                            Hire Me
                        </Button>
                    </a>
                </div>

                <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground backdrop-blur transition hover:border-primary/50 md:hidden"
                >
                    <FiMenu className="text-lg" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <m.div
                            initial={
                                shouldReduceMotion ? false : { opacity: 0 }
                            }
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.2,
                            }}
                            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <m.aside
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 30, scale: 0.98 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.98 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col gap-6 overflow-y-auto bg-background/95 p-6 shadow-2xl backdrop-blur-3xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                                        Menu
                                    </p>
                                    <p className="font-display text-lg">
                                        Navigate
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground transition hover:border-primary/50"
                                >
                                    <FiX />
                                </button>
                            </div>

                            <m.nav
                                className="flex flex-col gap-2"
                                initial={shouldReduceMotion ? false : "hidden"}
                                animate="show"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.06,
                                            delayChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {navItems.map((item) => {
                                    const isActive = activeId === item.id;
                                    return (
                                        <m.a
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => {
                                                setActiveId(item.id);
                                                setIsOpen(false);
                                            }}
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                show: { opacity: 1, y: 0 },
                                            }}
                                            className={cn(
                                                "flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 px-4 py-3 text-sm font-semibold-alt transition",
                                                isActive
                                                    ? "border-primary/50 text-primary"
                                                    : "text-foreground hover:border-primary/40",
                                            )}
                                        >
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-base">
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </m.a>
                                    );
                                })}
                            </m.nav>

                            <m.div
                                className="mt-auto flex flex-col gap-2"
                                initial={
                                    shouldReduceMotion ? false : { opacity: 0, y: 12 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 12 }}
                                transition={{
                                    duration: shouldReduceMotion ? 0 : 0.3,
                                    delay: shouldReduceMotion ? 0 : 0.15,
                                }}
                            >
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button size="lg" className="w-full">
                                        Start a project
                                    </Button>
                                </a>
                                <a
                                    href="#cv"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex w-full items-center justify-center rounded-2xl border border-border/70 bg-card/50 py-3 text-sm font-semibold-alt text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                                >
                                    Download CV
                                </a>
                            </m.div>
                        </m.aside>
                    </>
                )}
            </AnimatePresence>
        </m.header>
    );
}
