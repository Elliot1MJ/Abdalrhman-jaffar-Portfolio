"use client";

import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import type { PortfolioProject } from "@/lib/data/portfolio";
import { useLanguage } from "@/lib/i18n/language-provider";
import { TextReveal } from "@/components/shared/text-reveal";
import { Button } from "@/components/ui/button";
import {
    CARD_HOVER,
    CARD_SPRING,
    MOTION_STAGGER,
    MOTION_VIEWPORT,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";

interface HomeStaticSectionsProps {
    featuredProjects: PortfolioProject[];
}


const SECTION = "border-t border-border/70 py-20 sm:py-24";
const INNER = "mx-auto w-full max-w-[1440px] px-5 sm:px-8";

export function HomeStaticSections({
    featuredProjects,
}: HomeStaticSectionsProps) {
    const { text } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    return (
        <>
            {/* Work */}
            <section className={SECTION}>
                <div className={INNER}>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                                {text.work.eyebrow}
                            </p>
                            <TextReveal
                                as="h2"
                                text={text.projects.title}
                                className="type-title mt-3 text-foreground"
                            />
                        </div>
                        <Link
                            href="/work"
                            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {text.work.filters.all}
                            <FiArrowUpRight
                                aria-hidden
                                className="transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100"
                            />
                        </Link>
                    </div>

                    <m.div
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={MOTION_VIEWPORT}
                        variants={staggerContainer()}
                        className="mt-8 grid gap-5 sm:grid-cols-2"
                    >
                        {featuredProjects.slice(0, 2).map((project) => (
                            <m.div
                                key={project.slug}
                                variants={fadeUp}
                                whileHover={
                                    shouldReduceMotion ? undefined : CARD_HOVER
                                }
                                transition={CARD_SPRING}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/30 p-4 transition-colors hover:border-primary/50 sm:p-5"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-card">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            sizes="(min-width: 640px) 45vw, 90vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                        />
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                                        />
                                    </div>

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
                                                {text.projects.categories[project.category]}
                                            </p>
                                            <h3 className="type-heading mt-1.5 text-foreground">
                                                {project.name}
                                            </h3>
                                        </div>
                                        <FiArrowUpRight
                                            aria-hidden
                                            className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-text rtl:-scale-x-100"
                                        />
                                    </div>
                                </Link>
                            </m.div>
                        ))}
                    </m.div>
                </div>
            </section>

            {/* Services */}
            <section className={SECTION}>
                <div className={INNER}>
                    <p className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                        {text.services.eyebrow}
                    </p>
                    <TextReveal
                        as="h2"
                        text={text.services.title}
                        className="type-title mt-3 max-w-2xl text-foreground"
                    />
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {text.services.description}
                    </p>

                    <m.div
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={MOTION_VIEWPORT}
                        variants={staggerContainer(MOTION_STAGGER.tight)}
                        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {text.services.cards.map((service, index) => (
                            <m.div
                                key={service.title}
                                variants={fadeUp}
                                whileHover={
                                    shouldReduceMotion ? undefined : CARD_HOVER
                                }
                                transition={CARD_SPRING}
                                className="rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-primary/50"
                            >
                                <span
                                    className="type-label font-mono text-muted-foreground"
                                    data-latin
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="type-heading mt-3 text-foreground">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {service.description}
                                </p>
                            </m.div>
                        ))}
                    </m.div>

                    <div className="mt-8">
                        <Button asChild size="lg" variant="outline" className="group">
                            <Link href="/services">
                                {text.services.orderCta}
                                <FiArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Courses */}
            <section className={SECTION}>
                <div className={INNER}>
                    <p className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                        {text.courses.eyebrow}
                    </p>
                    <TextReveal
                        as="h2"
                        text={text.courses.title}
                        className="type-title mt-3 max-w-2xl text-foreground"
                    />
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {text.courses.description}
                    </p>

                    <m.div
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={MOTION_VIEWPORT}
                        variants={staggerContainer(MOTION_STAGGER.tight)}
                        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {Object.entries(text.courses.items).map(([slug, course]) => (
                            <m.div
                                key={slug}
                                variants={fadeUp}
                                whileHover={
                                    shouldReduceMotion ? undefined : CARD_HOVER
                                }
                                transition={CARD_SPRING}
                                className="rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-primary/50"
                            >
                                <h3 className="type-heading text-foreground">
                                    {course.name}
                                </h3>
                                <p className="mt-1.5 text-sm text-accent-text">
                                    {course.tagline}
                                </p>
                            </m.div>
                        ))}
                    </m.div>

                    <div className="mt-8">
                        <Button asChild size="lg" variant="outline" className="group">
                            <Link href="/courses">
                                {text.nav.courses}
                                <FiArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

        </>
    );
}
