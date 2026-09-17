"use client";

import { m, useReducedMotion } from "framer-motion";
import { FiClock, FiMessageCircle, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/language-provider";
import { courses } from "@/lib/data/courses";
import { profile } from "@/lib/data/profile";
import { PageHeader } from "@/components/shared/page-header";
import {
    CARD_HOVER,
    CARD_SPRING,
    MOTION_STAGGER,
    MOTION_VIEWPORT,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
    const { text } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // Same pattern as /services: prefill WhatsApp rather than building a booking
    // backend the site doesn't need.
    //
    // This must build on `whatsappNumber`, not `profile.whatsapp` — the latter
    // is a `wa.me/message/...` short-link, which silently rejects a `?text=`
    // payload and answers "this link is no longer valid". That is exactly what
    // these buttons used to do.
    const buildWhatsappUrl = (courseName: string) => {
        const t = text.courses.whatsappTemplate;
        const message = `${t.intro}\n${t.courseLabel}: ${courseName}`;
        return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
            <PageHeader
                eyebrow={text.courses.eyebrow}
                title={text.courses.title}
                description={text.courses.description}
            />

            <m.div
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="show"
                viewport={MOTION_VIEWPORT}
                variants={staggerContainer(MOTION_STAGGER.loose)}
                className="mt-12 grid gap-6 lg:grid-cols-2"
            >
                {courses.map((course) => {
                    const copy = text.courses.items[course.slug];
                    if (!copy) return null;

                    return (
                        <m.article
                            key={course.slug}
                            variants={fadeUp}
                            whileHover={shouldReduceMotion ? undefined : CARD_HOVER}
                            transition={CARD_SPRING}
                            className={cn(
                                "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-7 transition-colors sm:p-8",
                                course.featured
                                    ? "border-primary/40 bg-primary/5 hover:border-primary/70"
                                    : "border-border bg-card/30 hover:border-primary/50",
                            )}
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                            />

                            <div className="relative flex flex-wrap items-center gap-3">
                                <span className="type-label rounded-full border border-border/70 px-3 py-1 font-mono text-muted-foreground">
                                    {text.courses.levels[course.level]}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <FiClock aria-hidden />
                                    {course.hours === null ? (
                                        text.courses.sessionUnit
                                    ) : (
                                        <>
                                            <span data-latin>{course.hours}</span>
                                            {text.courses.hoursUnit}
                                        </>
                                    )}
                                </span>
                            </div>

                            <div className="relative">
                                <h2 className="type-title text-foreground">
                                    {copy.name}
                                </h2>
                                <p className="mt-1.5 text-sm text-accent-text">
                                    {copy.tagline}
                                </p>
                            </div>

                            <p className="relative text-sm leading-relaxed text-muted-foreground">
                                {copy.description}
                            </p>

                            <div className="relative">
                                <p className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
                                    {text.courses.topicsLabel}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {course.stack.map((entry) => (
                                        <span
                                            key={entry}
                                            data-latin
                                            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                                        >
                                            {entry}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative mt-auto pt-2">
                                <a
                                    href={buildWhatsappUrl(copy.name)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                                        course.featured
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "border border-foreground/20 text-foreground hover:bg-foreground/5",
                                    )}
                                >
                                    <FiMessageCircle aria-hidden />
                                    {course.featured
                                        ? text.courses.bookConsultation
                                        : text.courses.enroll}
                                    <FiArrowUpRight
                                        aria-hidden
                                        className="transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100"
                                    />
                                </a>
                            </div>
                        </m.article>
                    );
                })}
            </m.div>
        </div>
    );
}
