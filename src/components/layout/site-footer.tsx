"use client";

import Link from "next/link";
import { FaGitlab, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiBriefcase, FiMail } from "react-icons/fi";
import { useTheme } from "@/components/providers/theme-provider";
import { profile } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";
import { MotionReveal } from "@/components/shared/motion-reveal";

export function SiteFooter() {
    const { text } = useLanguage();
    const { theme } = useTheme();

    const logoSrc =
        theme === "light"
            ? "/brand/octopus-mark-light.svg"
            : "/brand/octopus-mark-dark.svg";

    const navLinks = [
        { href: "/about", label: text.nav.about },
        { href: "/services", label: text.nav.services },
        { href: "/projects", label: text.nav.projects },
        { href: "/tools", label: text.nav.tools },
        { href: "/cv", label: text.nav.cv },
        { href: "/contact", label: text.nav.contact },
    ];

    const contactLinks = [
        {
            label: "WhatsApp",
            href: profile.whatsapp,
            icon: <FaWhatsapp />,
        },
        {
            label: "Instagram",
            href: profile.instagram,
            icon: <FaInstagram />,
        },
        {
            label: "GitLab",
            href: profile.gitlab,
            icon: <FaGitlab />,
        },
        {
            label: "Khamsat",
            href: profile.khamsat,
            icon: <FiBriefcase />,
        },
        {
            label: "Mostaql",
            href: profile.mostaql,
            icon: <FiBriefcase />,
        },
        {
            label: profile.email,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
            icon: <FiMail />,
        },
    ];

    return (
        <footer className="border-t border-border/70 bg-background/85 backdrop-blur-xl">
            <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
                <MotionReveal className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5"
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
                        <p className="mt-6 max-w-md text-xl font-medium leading-snug tracking-tight text-foreground">
                            {text.footer.headline}
                        </p>
                        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                            {text.footer.description}
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {text.nav.navigate}
                        </p>
                        <nav className="mt-4 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {text.footer.contactLabel}
                        </p>
                        <div className="mt-4 flex flex-col gap-3">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </MotionReveal>

                <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-border/70 pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                        {new Date().getFullYear()} © {text.profile.shortName}.{" "}
                        {text.footer.rightsReserved}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {text.profile.title}
                    </p>
                </div>
            </div>
        </footer>
    );
}
