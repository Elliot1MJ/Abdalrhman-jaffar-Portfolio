"use client";

import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_STAGGER } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";

interface HeroContentProps {
    locale: Locale;
    text: MessageCatalog;
}

const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD },
    },
};

export function HeroContent({ locale, text }: HeroContentProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="show"
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: MOTION_STAGGER.base } },
            }}
        >
            <m.p
                variants={item}
                className="font-mono text-xs uppercase tracking-[0.2em] text-primary"
            >
                {text.hero.badge}
            </m.p>
            <m.h1
                variants={item}
                className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
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
                    <Link href={`/${locale}/projects`}>{text.hero.seeProjects}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href={`/${locale}/cv`}>{text.hero.downloadCV}</Link>
                </Button>
            </m.div>
            <m.p
                variants={item}
                className="mt-12 font-mono text-xs text-muted-foreground"
            >
                {text.hero.stack}
            </m.p>
        </m.div>
    );
}
