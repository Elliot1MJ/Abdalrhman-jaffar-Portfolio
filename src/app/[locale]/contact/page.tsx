import { notFound } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaGitlab } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "@/lib/data/portfolio";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { ContactForm } from "@/components/contact/contact-form";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const text = getMessages(locale);

    const ways = [
        {
            label: text.contact.ways.whatsappLabel,
            value: text.contact.ways.whatsappValue,
            href: profile.whatsapp,
            icon: <FaWhatsapp />,
        },
        {
            label: text.contact.ways.instagramLabel,
            value: text.contact.ways.instagramValue,
            href: profile.instagram,
            icon: <FaInstagram />,
        },
        {
            label: text.contact.ways.gitlabLabel,
            value: text.contact.ways.gitlabValue,
            href: profile.gitlab,
            icon: <FaGitlab />,
        },
        {
            label: text.contact.ways.emailLabel,
            value: profile.email,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
            icon: <FiMail />,
        },
    ];

    return (
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                {text.contact.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {text.contact.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
                {text.contact.description}
            </p>

            <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1fr]">
                <ContactForm text={text} />

                <div className="space-y-4">
                    {ways.map((way) => (
                        <a
                            key={way.label}
                            href={way.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary"
                        >
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground">
                                {way.icon}
                            </span>
                            <span>
                                <span className="block text-sm font-medium text-foreground">
                                    {way.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    {way.value}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
