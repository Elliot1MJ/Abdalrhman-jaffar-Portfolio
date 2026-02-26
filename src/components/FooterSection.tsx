import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "../data/portfolio";
import { useI18n } from "../i18n/useI18n";
import { cn } from "../lib/utils";

export default function FooterSection() {
    const { isRtl, text } = useI18n();

    const contactLinks = [
        {
            label: text.contact.ways.whatsappLabel,
            href: profile.whatsapp,
            icon: <FaWhatsapp className="text-base" />,
        },
        {
            label: text.contact.ways.instagramLabel,
            href: profile.instagram,
            icon: <FaInstagram className="text-base" />,
        },
        {
            label: text.contact.ways.emailLabel,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                profile.email,
            )}`,
            icon: <FiMail className="text-base" />,
        },
    ] as const;

    return (
        <footer className="border-t border-border/60 bg-background/70 backdrop-blur-xl">
            <div className="mx-auto flex w-[90%] max-w-none flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="font-display text-4xl sm:text-5xl">
                                {text.footer.headline}
                            </p>
                            <p className="text-sm text-muted-foreground sm:text-base">
                                {text.footer.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="space-y-3">
                            <p
                                className={cn(
                                    "text-muted-foreground",
                                    isRtl
                                        ? "text-sm"
                                        : "text-[11px] uppercase tracking-[0.3em]",
                                )}
                            >
                                {text.footer.contactLabel}
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p className="text-foreground">
                                    {profile.email}
                                </p>
                                <p>{text.profile.location}</p>
                                <p>{text.footer.availability}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 border-t border-border/60 pt-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                        {contactLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                    "inline-flex items-center gap-2 border-b border-transparent font-semibold-alt text-muted-foreground transition hover:border-primary hover:text-foreground",
                                    isRtl
                                        ? "text-sm"
                                        : "text-[11px] uppercase tracking-[0.3em]",
                                )}
                            >
                                {item.icon}
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div
                        className={cn(
                            "text-muted-foreground",
                            isRtl
                                ? "text-sm"
                                : "text-xs uppercase tracking-[0.28em]",
                        )}
                    >
                        {new Date().getFullYear()} © {text.profile.shortName}.{" "}
                        {text.footer.rightsReserved}
                    </div>
                </div>
            </div>
        </footer>
    );
}
