"use client";

import { m, useReducedMotion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaGitlab } from "react-icons/fa";
import { FiBriefcase, FiMail, FiArrowUpRight } from "react-icons/fi";
import { profile } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import {
    CARD_HOVER,
    CARD_SPRING,
    MOTION_STAGGER,
    MOTION_VIEWPORT,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";

export default function ContactPage() {
    const { text } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    /*
     * WhatsApp now uses the E.164 number so the link can carry a prefilled
     * message, matching the services and courses CTAs. The value column shows
     * the real handle/number rather than a generic "Direct message" label —
     * a contact list that doesn't show what it will open is not much use.
     */
    const ways = [
        {
            label: text.contact.ways.whatsappLabel,
            value: "+963 958 759 433",
            href: `https://wa.me/${profile.whatsappNumber}`,
            icon: <FaWhatsapp />,
        },
        {
            label: text.contact.ways.emailLabel,
            value: profile.email,
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
            icon: <FiMail />,
        },
        {
            label: text.contact.ways.instagramLabel,
            value: "@abdalrhman_jaffar",
            href: profile.instagram,
            icon: <FaInstagram />,
        },
        {
            label: text.contact.ways.gitlabLabel,
            value: "gitlab.com/dev.elliot.j",
            href: profile.gitlab,
            icon: <FaGitlab />,
        },
        {
            label: text.contact.ways.khamsatLabel,
            value: text.contact.ways.khamsatValue,
            href: profile.khamsat,
            icon: <FiBriefcase />,
        },
        {
            label: text.contact.ways.mostaqlLabel,
            value: text.contact.ways.mostaqlValue,
            href: profile.mostaql,
            icon: <FiBriefcase />,
        },
    ];

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
            <PageHeader
                eyebrow={text.contact.eyebrow}
                title={text.contact.title}
                description={text.contact.description}
            />

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Form */}
                <m.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={MOTION_VIEWPORT}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8"
                >
                    <ContactForm />
                </m.div>

                {/* Channels */}
                <div className="flex flex-col gap-6">
                    <m.div
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={MOTION_VIEWPORT}
                        variants={staggerContainer(MOTION_STAGGER.tight)}
                        className="grid gap-3 sm:grid-cols-2"
                    >
                        {ways.map((way) => (
                            <m.a
                                key={way.label}
                                variants={fadeUp}
                                whileHover={shouldReduceMotion ? undefined : CARD_HOVER}
                                transition={CARD_SPRING}
                                href={way.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-3 rounded-xl border border-border bg-card/20 p-4 transition-colors hover:border-primary/50"
                            >
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    {way.icon}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-medium text-foreground">
                                        {way.label}
                                    </span>
                                    <span
                                        className="block truncate text-xs text-muted-foreground"
                                        data-latin
                                    >
                                        {way.value}
                                    </span>
                                </span>
                                <FiArrowUpRight
                                    aria-hidden
                                    className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100"
                                />
                            </m.a>
                        ))}
                    </m.div>

                </div>
            </div>
        </div>
    );
}
