"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { skillGroups } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";
import { OctopusMark } from "@/components/shared/octopus-mark";
import myPic from "@/assets/images/myPic.jpg";
import { PageHeader } from "@/components/shared/page-header";
import { MotionReveal } from "@/components/shared/motion-reveal";
import {
    MOTION_VIEWPORT,
    fadeUp,
    staggerContainer,
} from "@/lib/motion";

const CV_PATH = "/documents/Abdalrhman_Jaffar's_CV.pdf";

export default function AboutPage() {
    const { text } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-8">
                <div className="min-w-0 flex-1">
                    <PageHeader
                        eyebrow={text.about.eyebrow}
                        title={text.about.title}
                    />
                </div>
                <MotionReveal className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border sm:h-24 sm:w-24">
                    <Image
                        src={myPic}
                        alt={text.profile.fullName}
                        fill
                        sizes="96px"
                        className="object-cover"
                        priority
                    />
                </MotionReveal>
            </div>

            <MotionReveal className="mt-14 grid gap-12 md:grid-cols-[2fr_1fr]">
                <div className="space-y-6 text-base leading-relaxed text-foreground">
                    <p className="text-lg leading-relaxed">
                        {text.about.paragraphOne}
                    </p>
                    <p className="text-muted-foreground">
                        {text.about.paragraphTwo}
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/30 p-6">
                    <h2 className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
                        {text.about.educationTitle}
                    </h2>
                    <p className="mt-3 text-sm font-medium text-foreground">
                        {text.education.degree}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        <span data-latin>{text.education.university}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {text.education.duration}
                    </p>
                </div>
            </MotionReveal>

            <section className="mt-14">
                <h2 className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    {text.about.principlesTitle}
                </h2>
                <m.div
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={MOTION_VIEWPORT}
                    variants={staggerContainer()}
                    className="mt-6 grid gap-8 sm:grid-cols-3"
                >
                    {skillGroups.map((group) => (
                        <m.div key={group.title} variants={fadeUp}>
                            {/*
                              * `data-latin` goes on an inner <span>, not on the
                              * <p>. The helper sets `direction: ltr`, so on a
                              * block element it also flips the whole line's
                              * alignment to the left inside an RTL page — which
                              * is what pushed these headings to the wrong side
                              * in Arabic. On an inline run it isolates the Latin
                              * glyphs without touching the block's direction.
                              */}
                            <p className="text-sm font-medium text-foreground">
                                <span data-latin>{group.title}</span>
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        data-latin
                                        className="rounded-full border border-border bg-card/20 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-card/50 hover:text-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </section>

            <MotionReveal className="mt-14 overflow-hidden rounded-2xl border border-border bg-card/40 p-8 sm:p-12">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <OctopusMark
                        alt={text.profile.shortName}
                        className="h-14 w-14 shrink-0"
                    />
                    <div>
                        <p className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                            <span data-latin>The Octopus</span>
                        </p>
                        <h2 className="type-title mt-2 text-foreground">
                            {text.about.brand.title}
                        </h2>
                    </div>
                </div>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {text.about.brand.description}
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                    {text.about.brand.pillars.map((pillar) => (
                        <div key={pillar.title}>
                            <p className="text-sm font-medium text-foreground">
                                {pillar.title}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </MotionReveal>

            {/* Resume — folded in from the old /cv route so the CV lives with
                the rest of the personal context instead of on its own page. */}
            <section id="resume" className="mt-20 scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="type-label font-mono uppercase tracking-[0.15em] text-accent-text">
                            {text.cv.eyebrow}
                        </h2>
                        <p className="type-title mt-3 text-foreground">
                            {text.cv.title}
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            {text.cv.description}
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <a href={CV_PATH} download>
                            <FiDownload aria-hidden />
                            {text.cv.downloadPDF}
                        </a>
                    </Button>
                </div>

                <p className="mt-6 text-xs text-muted-foreground sm:hidden">
                    {text.cv.mobilePreviewNotice}
                </p>

                <MotionReveal className="mt-8 hidden overflow-hidden rounded-2xl border border-border sm:block">
                    <iframe
                        src={CV_PATH}
                        title={text.cv.iframeTitle}
                        className="h-[80vh] w-full"
                    />
                </MotionReveal>
            </section>
        </div>
    );
}
