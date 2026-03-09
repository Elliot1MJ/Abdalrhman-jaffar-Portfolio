import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
    FiArrowLeft,
    FiBriefcase,
    FiFileText,
    FiGrid,
    FiHome,
    FiMail,
    FiMenu,
    FiMoon,
    FiSun,
    FiUser,
    FiX,
} from "react-icons/fi";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoMark from "../assets/images/logo.svg";
import { useI18n } from "../i18n/useI18n";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    MOTION_EASE_STANDARD,
    MOTION_STAGGER,
} from "../lib/motion";
import { cn } from "../lib/utils";
import { navigateToSection } from "../lib/sectionNavigation";
import { useTheme } from "../theme/useTheme";
import { Button } from "./ui/button";

interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: ReactNode;
}

interface NavigationBarProps {
    mode?: "default" | "details";
    onBack?: () => void;
}

export default function NavigationBar({
    mode = "default",
    onBack,
}: NavigationBarProps) {
    const shouldReduceMotion = useReducedMotion();
    const location = useLocation();
    const navigate = useNavigate();
    const { isRtl, languageButtonLabel, text, toggleLanguage } = useI18n();
    const { theme, toggleTheme } = useTheme();
    const isLightTheme = theme === "light";
    const isOnHomeRoute = location.pathname === "/";
    const isDetailsMode = mode === "details";
    const [activeId, setActiveId] = useState("home");
    const [isOpen, setIsOpen] = useState(false);
    const controlMotionProps = shouldReduceMotion
        ? {}
        : {
              whileHover: { y: -1.5, scale: 1.03 },
              whileTap: { scale: 0.96 },
          };

    const renderLanguageLabel = (keyPrefix: string) => (
        <AnimatePresence mode="wait" initial={false}>
            <m.span
                key={`${keyPrefix}-${languageButtonLabel}`}
                initial={
                    shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 4, scale: 0.92, filter: "blur(2px)" }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={
                    shouldReduceMotion
                        ? undefined
                        : {
                              opacity: 0,
                              y: -4,
                              scale: 0.92,
                              filter: "blur(2px)",
                          }
                }
                transition={{
                    duration: shouldReduceMotion ? 0 : MOTION_DURATION.fast,
                    ease: MOTION_EASE_STANDARD,
                }}
                className="block leading-none"
            >
                {languageButtonLabel}
            </m.span>
        </AnimatePresence>
    );

    const renderThemeIcon = (keyPrefix: string) => (
        <AnimatePresence mode="wait" initial={false}>
            <m.span
                key={`${keyPrefix}-${theme}`}
                initial={
                    shouldReduceMotion
                        ? false
                        : {
                              opacity: 0,
                              scale: 0.7,
                              rotate: theme === "dark" ? -36 : 36,
                              filter: "blur(2px)",
                          }
                }
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    filter: "blur(0px)",
                }}
                exit={
                    shouldReduceMotion
                        ? undefined
                        : {
                              opacity: 0,
                              scale: 0.72,
                              rotate: theme === "dark" ? 28 : -28,
                              filter: "blur(2px)",
                          }
                }
                transition={{
                    duration: shouldReduceMotion ? 0 : MOTION_DURATION.fast,
                    ease: MOTION_EASE_STANDARD,
                }}
                className="grid place-items-center"
            >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
            </m.span>
        </AnimatePresence>
    );

    const navItems: NavItem[] = [
        { id: "home", label: text.nav.home, href: "/#home", icon: <FiHome /> },
        {
            id: "about",
            label: text.nav.about,
            href: "/#about",
            icon: <FiUser />,
        },
        {
            id: "services",
            label: text.nav.services,
            href: "/#services",
            icon: <FiGrid />,
        },
        {
            id: "projects",
            label: text.nav.projects,
            href: "/#projects",
            icon: <FiBriefcase />,
        },
        { id: "cv", label: text.nav.cv, href: "/#cv", icon: <FiFileText /> },
        {
            id: "contact",
            label: text.nav.contact,
            href: "/#contact",
            icon: <FiMail />,
        },
    ];

    const handleSectionNavigation =
        (sectionId: string, closeMenu = false) =>
        (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            setActiveId(sectionId);
            if (isOnHomeRoute) {
                navigateToSection(sectionId, { smooth: !shouldReduceMotion });
            } else {
                navigate(`/#${sectionId}`);
            }

            if (closeMenu) {
                setIsOpen(false);
            }
        };

    const handleBackNavigation = () => {
        if (onBack) {
            onBack();
            return;
        }

        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/#projects");
    };

    useEffect(() => {
        if (!isOnHomeRoute) {
            setActiveId("");
            return;
        }

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
    }, [isOnHomeRoute]);

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
            transition={{
                duration: shouldReduceMotion ? 0 : MOTION_DURATION.base,
                ease: MOTION_EASE_EMPHASIS,
            }}
            className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex w-[90%] max-w-none items-center justify-between gap-3 py-3 sm:w-[88%] sm:px-6">
                <a
                    href="/#home"
                    className="group inline-flex items-center gap-3"
                    onClick={handleSectionNavigation("home")}
                >
                    <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-foreground/15 bg-background/80 p-1.5">
                        <img
                            src={logoMark}
                            alt={`${text.profile.shortName} logo`}
                            loading="eager"
                            decoding="async"
                            className="h-full w-full object-contain"
                        />
                    </span>
                    <span className="hidden sm:flex flex-col leading-tight">
                        <span
                            className={cn(
                                "text-muted-foreground",
                                isRtl
                                    ? "text-[11px]"
                                    : "text-[11px] uppercase tracking-[0.32em]",
                            )}
                        >
                            {text.nav.portfolio}
                        </span>
                        <span className="font-semibold-alt text-sm text-foreground">
                            {text.profile.shortName}
                        </span>
                    </span>
                </a>

                {!isDetailsMode && (
                    <nav className="hidden items-center gap-6 lg:flex">
                        {navItems.map((item) => {
                            const isActive =
                                isOnHomeRoute && activeId === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={handleSectionNavigation(item.id)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                        "relative pb-2 font-semibold-alt text-muted-foreground transition-colors",
                                        isRtl
                                            ? "text-sm"
                                            : "text-[11px] uppercase tracking-[0.3em] sm:text-xs",
                                        isActive
                                            ? "text-foreground after:scale-x-100"
                                            : "hover:text-foreground after:scale-x-0 hover:after:scale-x-100",
                                        "after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-full after:-translate-x-1/2 after:origin-center after:bg-primary after:transition-transform after:duration-300",
                                    )}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>
                )}

                <div className="hidden items-center gap-3 lg:flex">
                    <m.button
                        type="button"
                        aria-label={text.nav.toggleLanguage}
                        onClick={toggleLanguage}
                        className="relative inline-flex h-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 px-3 text-xs font-semibold-alt uppercase tracking-[0.14em] text-foreground transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_10px_24px_-16px_hsl(var(--primary)/0.9)]"
                        {...controlMotionProps}
                    >
                        {renderLanguageLabel("desktop-lang")}
                    </m.button>
                    <m.button
                        type="button"
                        aria-label={text.nav.toggleTheme}
                        onClick={toggleTheme}
                        className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 text-foreground transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_10px_24px_-16px_hsl(var(--primary)/0.9)]"
                        {...controlMotionProps}
                    >
                        {renderThemeIcon("desktop-theme")}
                    </m.button>
                    {isDetailsMode && (
                        <Button
                            variant="outline"
                            onClick={handleBackNavigation}
                        >
                            <FiArrowLeft className="text-base" />
                            {text.projects.details.back}
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <m.button
                        type="button"
                        aria-label={text.nav.toggleLanguage}
                        onClick={toggleLanguage}
                        className="relative inline-flex h-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 px-3 text-xs font-semibold-alt uppercase tracking-[0.14em] text-foreground transition-[border-color,background-color,color] duration-300 hover:border-primary/60"
                        {...controlMotionProps}
                    >
                        {renderLanguageLabel("mobile-lang")}
                    </m.button>
                    <m.button
                        type="button"
                        aria-label={text.nav.toggleTheme}
                        onClick={toggleTheme}
                        className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 text-foreground transition-[border-color,background-color,color] duration-300 hover:border-primary/60"
                        {...controlMotionProps}
                    >
                        {renderThemeIcon("mobile-theme")}
                    </m.button>
                    {isDetailsMode ? (
                        <Button
                            variant="outline"
                            onClick={handleBackNavigation}
                        >
                            <FiArrowLeft className="text-base" />
                            {text.projects.details.back}
                        </Button>
                    ) : (
                        <button
                            type="button"
                            aria-label={text.nav.openMenu}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setIsOpen(true)}
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/20 bg-transparent text-foreground transition hover:border-primary/60"
                        >
                            <FiMenu className="text-lg" />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {!isDetailsMode && isOpen && (
                    <>
                        <m.div
                            initial={
                                shouldReduceMotion ? false : { opacity: 0 }
                            }
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: shouldReduceMotion
                                    ? 0
                                    : MOTION_DURATION.fast,
                                ease: MOTION_EASE_STANDARD,
                            }}
                            className={cn(
                                "fixed inset-0 z-40",
                                isLightTheme
                                    ? "bg-black/35 backdrop-blur-sm"
                                    : "bg-black/70 backdrop-blur",
                            )}
                            onClick={() => setIsOpen(false)}
                        />
                        <m.aside
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : {
                                          x: isRtl ? -22 : 22,
                                          opacity: 0,
                                      }
                            }
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            exit={{
                                x: isRtl ? -22 : 22,
                                opacity: 0,
                            }}
                            transition={{
                                duration: shouldReduceMotion
                                    ? 0
                                    : MOTION_DURATION.base,
                                ease: MOTION_EASE_STANDARD,
                            }}
                            className={cn(
                                "fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden p-6 text-foreground",
                                isLightTheme
                                    ? "bg-background/97 backdrop-blur-2xl shadow-[0_18px_55px_-30px_rgba(15,23,42,0.5)]"
                                    : "bg-black/90",
                            )}
                        >
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-0",
                                    isLightTheme
                                        ? "bg-[radial-gradient(120%_80%_at_20%_0%,rgba(168,85,247,0.13),transparent_62%)]"
                                        : "bg-[radial-gradient(120%_80%_at_20%_0%,rgba(168,85,247,0.2),transparent_60%)]",
                                )}
                            />
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-0",
                                    isLightTheme
                                        ? "bg-[radial-gradient(80%_60%_at_85%_100%,rgba(236,72,153,0.08),transparent_62%)]"
                                        : "bg-[radial-gradient(80%_60%_at_85%_100%,rgba(236,72,153,0.12),transparent_60%)]",
                                )}
                            />

                            <div className="relative flex min-h-full flex-col">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-foreground/20 bg-background/80 p-1.5">
                                            <img
                                                src={logoMark}
                                                alt={`${text.profile.shortName} logo`}
                                                loading="eager"
                                                decoding="async"
                                                className="h-full w-full object-contain"
                                            />
                                        </span>
                                        <div className="leading-tight">
                                            <p
                                                className={cn(
                                                    "text-muted-foreground",
                                                    isRtl
                                                        ? "text-xs"
                                                        : "text-[10px] uppercase tracking-[0.35em]",
                                                )}
                                            >
                                                {text.nav.portfolio}
                                            </p>
                                            <p
                                                className={cn(
                                                    "text-foreground font-semibold-alt",
                                                    isRtl
                                                        ? "text-sm"
                                                        : "text-xs uppercase tracking-[0.28em]",
                                                )}
                                            >
                                                {text.profile.shortName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <m.button
                                            type="button"
                                            aria-label={text.nav.toggleLanguage}
                                            onClick={toggleLanguage}
                                            className="relative inline-flex h-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 px-3 text-xs font-semibold-alt uppercase tracking-[0.14em] text-foreground transition-[border-color,background-color,color] duration-300 hover:border-primary"
                                            {...controlMotionProps}
                                        >
                                            {renderLanguageLabel("menu-lang")}
                                        </m.button>
                                        <m.button
                                            type="button"
                                            aria-label={text.nav.toggleTheme}
                                            onClick={toggleTheme}
                                            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-foreground/20 text-foreground transition-[border-color,background-color,color] duration-300 hover:border-primary"
                                            {...controlMotionProps}
                                        >
                                            {renderThemeIcon("menu-theme")}
                                        </m.button>
                                        <m.button
                                            type="button"
                                            aria-label={text.nav.closeMenu}
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-foreground transition-[border-color,background-color,color] duration-300 hover:border-primary"
                                            {...controlMotionProps}
                                        >
                                            <FiX />
                                        </m.button>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <p
                                        className={cn(
                                            "text-muted-foreground",
                                            isRtl
                                                ? "text-xs"
                                                : "text-[11px] uppercase tracking-[0.5em]",
                                        )}
                                    >
                                        {text.nav.menu}
                                    </p>
                                    <p className="font-display text-5xl leading-[0.9] sm:text-6xl">
                                        {text.nav.navigate}
                                    </p>
                                </div>

                                <m.nav
                                    className="mt-8 flex flex-col gap-4"
                                    initial={
                                        shouldReduceMotion ? false : "hidden"
                                    }
                                    animate="show"
                                    exit="hidden"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren:
                                                    MOTION_STAGGER.tight,
                                                delayChildren:
                                                    MOTION_DURATION.fast,
                                            },
                                        },
                                    }}
                                >
                                    {navItems.map((item, index) => {
                                        const isActive =
                                            isOnHomeRoute &&
                                            activeId === item.id;
                                        return (
                                            <m.a
                                                key={item.id}
                                                href={item.href}
                                                onClick={handleSectionNavigation(
                                                    item.id,
                                                    true,
                                                )}
                                                variants={{
                                                    hidden: {
                                                        opacity: 0,
                                                        y: 12,
                                                    },
                                                    show: { opacity: 1, y: 0 },
                                                }}
                                                className={cn(
                                                    "group flex items-center justify-between border-b border-foreground/15 pb-3 transition",
                                                    isRtl
                                                        ? "text-2xl font-semibold-alt"
                                                        : "text-2xl font-display uppercase tracking-[0.18em]",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-foreground hover:text-primary",
                                                )}
                                            >
                                                <span>{item.label}</span>
                                                <span
                                                    className={cn(
                                                        "font-semibold-alt text-muted-foreground group-hover:text-foreground",
                                                        isRtl
                                                            ? "text-xs"
                                                            : "text-[10px] uppercase tracking-[0.5em]",
                                                    )}
                                                >
                                                    0{index + 1}
                                                </span>
                                            </m.a>
                                        );
                                    })}
                                </m.nav>

                                <m.div
                                    className="mt-auto grid gap-3"
                                    initial={
                                        shouldReduceMotion
                                            ? false
                                            : { opacity: 0, y: 12 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 12 }}
                                    transition={{
                                        duration: shouldReduceMotion
                                            ? 0
                                            : MOTION_DURATION.base,
                                        delay: shouldReduceMotion
                                            ? 0
                                            : MOTION_DURATION.fast,
                                        ease: MOTION_EASE_STANDARD,
                                    }}
                                >
                                    <a
                                        href="/#services"
                                        onClick={handleSectionNavigation(
                                            "services",
                                            true,
                                        )}
                                    >
                                        <Button size="lg" className="w-full">
                                            {text.nav.startProject}
                                        </Button>
                                    </a>
                                    <a
                                        href="/#cv"
                                        onClick={handleSectionNavigation(
                                            "cv",
                                            true,
                                        )}
                                        className={cn(
                                            "inline-flex w-full items-center justify-center rounded-full border border-foreground/20 py-3 font-semibold-alt text-muted-foreground transition hover:border-primary hover:text-foreground",
                                            isRtl
                                                ? "text-sm"
                                                : "text-xs uppercase tracking-[0.32em]",
                                        )}
                                    >
                                        {text.nav.downloadCV}
                                    </a>
                                </m.div>
                            </div>
                        </m.aside>
                    </>
                )}
            </AnimatePresence>
        </m.header>
    );
}
