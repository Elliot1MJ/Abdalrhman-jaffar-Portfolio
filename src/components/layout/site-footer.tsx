"use client";

import Link from "next/link";
import { FaGitlab, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiBriefcase, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { OctopusMark } from "@/components/shared/octopus-mark";

export function SiteFooter() {
    const { text } = useLanguage();

    // Mirrors getNavItems() minus the home entry; kept flat here because the
    // footer shows no submenus.
    const navLinks = [
        { href: "/about", label: text.nav.about },
        { href: "/services", label: text.nav.services },
        { href: "/work", label: text.nav.work },
        { href: "/courses", label: text.nav.courses },
        { href: "/about#resume", label: text.nav.resume },
        { href: "/contact", label: text.nav.contact },
    ];

    const contactLinks = [
        {
            label: "WhatsApp",
            // The `whatsapp` short-link (`wa.me/message/...`) serves "الرابط لم
            // يعد صالحًا" — the numeric form is the one that actually resolves.
            href: `https://wa.me/${profile.whatsappNumber}`,
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
            <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
                <MotionReveal className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5"
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
                        <p className="type-title mt-6 max-w-md text-foreground">
                            {text.footer.headline}
                        </p>
                        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                            {text.footer.description}
                        </p>

                        {/* The headline above asks a question; this is the
                            answer to it. Without it the whole column was a
                            statement with nothing to act on. */}
                        <Button asChild className="mt-6">
                            <Link href="/contact">
                                {text.nav.startProject}
                                <FiArrowRight
                                    aria-hidden
                                    className="rtl:-scale-x-100"
                                />
                            </Link>
                        </Button>
                    </div>

                    <div>
                        <p className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
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
                        <p className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
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
                        <span data-latin>{new Date().getFullYear()}</span> ©{" "}
                        <span data-latin>{text.profile.shortName}</span>.{" "}
                        {text.footer.rightsReserved}
                    </p>
                    {/* Footer signature form from the brand spec. */}
                    <OctopusMark
                        form="made-with-octopus"
                        alt="Made with The Octopus"
                        width={131}
                        height={28}
                        className="h-7 w-auto opacity-80 transition-opacity hover:opacity-100"
                    />
                </div>
            </div>
        </footer>
    );
}
