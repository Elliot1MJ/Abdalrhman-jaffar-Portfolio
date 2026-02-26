import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "../data/portfolio";
import { Badge } from "./ui/badge";

const contactLinks = [
    {
        label: "GitHub",
        href: profile.github,
        icon: <FaGithub className="text-base" />,
    },
    {
        label: "WhatsApp",
        href: profile.whatsapp,
        icon: <FaWhatsapp className="text-base" />,
    },
    {
        label: "Email",
        href: `mailto:${profile.email}`,
        icon: <FiMail className="text-base" />,
    },
] as const;

const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "CV", href: "#cv" },
    { label: "Contact", href: "#contact" },
] as const;

export default function FooterSection() {
    return (
        <footer className="border-t border-border/60 bg-background/70">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                    <div className="space-y-4">
                        <Badge variant="outline" className="w-fit text-xs uppercase tracking-[0.2em]">
                            Open for projects
                        </Badge>
                        <div className="space-y-2">
                            <p className="font-display text-2xl sm:text-3xl">
                                Let us build a modern, fast web experience together.
                            </p>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                I ship glassy, high-performance interfaces that feel premium on
                                every device.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {contactLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                                >
                                    {item.icon}
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 rounded-3xl border border-border/60 bg-card/55 p-5 backdrop-blur-2xl">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                Quick links
                            </p>
                            <div className="grid gap-2 text-sm">
                                {quickLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="text-muted-foreground transition hover:text-foreground"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="border-t border-border/60 pt-4 text-xs text-muted-foreground">
                            {new Date().getFullYear()} © {profile.shortName}. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
