"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_STAGGER } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";
import myPic from "@/assets/images/myPic.jpg";

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

const photoVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE_STANDARD },
    },
};

export function HeroContent({ locale, text }: HeroContentProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
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
                        <Link href={`/${locale}/projects`}>
                            {text.hero.seeProjects}
                        </Link>
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

            <m.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="show"
                variants={photoVariant}
                className="relative mx-auto aspect-4/5 w-full max-w-sm"
            >
                <div className="absolute inset-0 rounded-4xl bg-primary/10 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-4xl border border-border">
                    <Image
                        src={myPic}
                        alt={text.profile.fullName}
                        fill
                        sizes="(min-width: 1024px) 380px, 70vw"
                        className="object-cover grayscale-15"
                        priority
                    />
                </div>
            </m.div>
        </div>
    );
}
