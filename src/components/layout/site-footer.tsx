import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "@/lib/data/portfolio";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";

interface SiteFooterProps {
    locale: Locale;
    text: MessageCatalog;
}

export function SiteFooter({ text }: SiteFooterProps) {
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
            label: profile.email,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
            icon: <FiMail />,
        },
    ];

    return (
        <footer className="border-t border-border/70">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8">
                <p className="max-w-xl text-2xl font-medium leading-snug tracking-tight text-foreground">
                    {text.footer.headline}
                </p>
                <p className="max-w-md text-sm text-muted-foreground">
                    {text.footer.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 border-t border-border/70 pt-6">
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

                <p className="text-xs text-muted-foreground">
                    {new Date().getFullYear()} © {text.profile.shortName}.{" "}
                    {text.footer.rightsReserved}
                </p>
            </div>
        </footer>
    );
}
