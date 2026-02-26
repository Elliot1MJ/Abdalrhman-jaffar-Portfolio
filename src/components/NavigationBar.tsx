import { m, useReducedMotion } from "framer-motion";
import { FiHome, FiMail } from "react-icons/fi";
import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface NavItem {
    label: string;
    path: string;
    icon?: ReactNode;
}

const navItems: NavItem[] = [
    { label: "Home", path: "/", icon: <FiHome className="text-[15px]" /> },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
    { label: "CV", path: "/cv" },
];

export default function NavigationBar() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.header
            initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl"
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="scrollbar-hidden inline-flex max-w-[calc(100vw-2rem)] min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-border/80 bg-card/85 px-2 py-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground transition-colors sm:text-sm",
                                    isActive && "bg-primary text-primary-foreground"
                                )
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <NavLink to="/contact" className="hidden sm:block">
                    <Button size="sm" className="h-9 rounded-full px-4">
                        <FiMail />
                        Hire Me
                    </Button>
                </NavLink>
            </div>
        </m.header>
    );
}
