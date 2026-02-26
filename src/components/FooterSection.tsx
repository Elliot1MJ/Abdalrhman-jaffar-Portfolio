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

export default function FooterSection() {
    return (
        <footer className="border-t border-border/70 bg-card/45">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="font-display text-xl leading-none">{profile.name}</p>
                        <p className="text-sm text-muted-foreground">{profile.title}</p>
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                        Built with React, shadcn-style UI, Framer Motion
                    </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {contactLinks.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground">
                    {new Date().getFullYear()} © {profile.shortName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
