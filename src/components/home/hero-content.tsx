"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_STAGGER } from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import { useTheme } from "@/components/providers/theme-provider";

const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD },
    },
};

const photoVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE_STANDARD },
    },
};

export function HeroContent() {
    const { text } = useLanguage();
    const { theme } = useTheme();
    const shouldReduceMotion = useReducedMotion();

    const logoSrc =
        theme === "light"
            ? "/brand/octopus-mark-light.svg"
            : "/brand/octopus-mark-dark.svg";

    return (
        <div className="flex w-full flex-col justify-center gap-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <m.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: MOTION_STAGGER.base } },
                }}
                className="order-1"
            >
                <m.p
                    variants={item}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
                >
                    {text.hero.badge}
                </m.p>
                <m.h1
                    variants={item}
                    className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
                >
                    {text.hero.headingLine1}
                </m.h1>
                <m.p
                    variants={item}
                    className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                    {text.hero.summary}
                </m.p>
                <m.div
                    variants={item}
                    className="mt-10 flex flex-wrap items-center gap-3"
                >
                    <Button asChild size="lg">
                        <Link href="/projects">{text.hero.seeProjects}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/cv">{text.hero.downloadCV}</Link>
                    </Button>
                </m.div>
                <m.p
                    variants={item}
                    className="mt-12 font-mono text-xs text-muted-foreground"
                >
                    {text.hero.stack}
                </m.p>
            </m.div>

            <m.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="show"
                variants={photoVariant}
                className="relative order-2 mx-auto flex w-full items-center justify-center lg:aspect-4/5 lg:max-w-sm lg:ms-auto lg:mx-0"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={logoSrc}
                    alt={text.profile.shortName}
                    className="w-32 opacity-90 sm:w-40 lg:w-full lg:max-w-md lg:opacity-100"
                />
            </m.div>
        </div>
    );
}
