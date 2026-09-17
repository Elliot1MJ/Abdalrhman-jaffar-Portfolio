"use client";

import { m, useReducedMotion } from "framer-motion";
import { FiCheck, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/language-provider";
import { services } from "@/lib/data/services";
import { profile } from "@/lib/data/profile";
import { PageHeader } from "@/components/shared/page-header";
import { MotionReveal } from "@/components/shared/motion-reveal";
import {
    CARD_HOVER,
    CARD_SPRING,
    MOTION_STAGGER,
    MOTION_VIEWPORT,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";

export default function ServicesPage() {
    const { text } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // Prefilled WhatsApp order. Uses the E.164 number rather than the `wa.me`
    // short-link, because only the numeric form accepts a `?text=` payload.
    const buildOrderUrl = (serviceTitle: string) => {
        const t = text.services.whatsappTemplate;
        const message = `${t.intro}\n${t.serviceLabel}: ${serviceTitle}`;
        return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
            <PageHeader
                eyebrow={text.services.eyebrow}
                title={text.services.title}
                description={text.services.description}
            />

            <m.div
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="show"
                viewport={MOTION_VIEWPORT}
                variants={staggerContainer(MOTION_STAGGER.loose)}
                className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
                {text.services.cards.map((service, index) => {
                    const meta = services[index];

                    return (
                        <m.article
                            key={service.title}
                            variants={fadeUp}
                            whileHover={shouldReduceMotion ? undefined : CARD_HOVER}
                            transition={CARD_SPRING}
                            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-colors hover:border-primary/50"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                            />

                            <span className="type-label relative font-mono text-muted-foreground">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <h2 className="type-heading relative text-foreground">
                                {service.title}
                            </h2>

                            <p className="relative text-sm leading-relaxed text-muted-foreground">
                                {service.description}
                            </p>

                            <ul className="relative flex flex-col gap-2">
                                {service.capabilities.map((capability) => (
                                    <li
                                        key={capability}
                                        className="flex items-start gap-2 text-xs text-foreground/90"
                                    >
                                        <FiCheck
                                            aria-hidden
                                            className="mt-0.5 shrink-0 text-accent-text"
                                        />
                                        <span>{capability}</span>
                                    </li>
                                ))}
                            </ul>

                            {meta ? (
                                <div className="relative flex flex-wrap gap-1.5">
                                    {meta.stack.map((entry) => (
                                        <span
                                            key={entry}
                                            data-latin
                                            className="rounded-full border border-border/70 px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                                        >
                                            {entry}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            <a
                                href={buildOrderUrl(service.title)}
                                target="_blank"
                                rel="noreferrer"
                                className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <FiMessageCircle aria-hidden />
                                {text.services.orderCta}
                                <FiArrowUpRight
                                    aria-hidden
                                    className="transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100"
                                />
                            </a>
                        </m.article>
                    );
                })}
            </m.div>

            <MotionReveal
                delay={0.1}
                className="mt-14 rounded-2xl border border-border bg-card/40 p-8 sm:p-10"
            >
                <p className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                    {text.principles.eyebrow}
                </p>
                <h2 className="type-title mt-3 max-w-2xl text-foreground">
                    {text.principles.title}
                </h2>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {text.principles.items.map((principle) => (
                        <div key={principle.title} className="flex flex-col gap-2">
                            <span
                                className="font-mono text-xl font-semibold text-primary/40"
                                data-latin
                            >
                                {principle.index}
                            </span>
                            <h3 className="type-heading text-foreground">
                                {principle.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {principle.description}
                            </p>
                        </div>
                    ))}
                </div>
            </MotionReveal>
        </div>
    );
}
