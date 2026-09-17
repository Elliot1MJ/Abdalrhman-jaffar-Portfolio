"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { m, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    MOTION_EASE_STANDARD,
    MOTION_STAGGER,
} from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import { OctopusMark } from "@/components/shared/octopus-mark";

/*
 * Client-only and lazily fetched: the WebGL renderer must never reach the
 * server bundle, and it should not delay first paint of the headline.
 *
 * TO SWAP BACK TO THE RIBBONS: change the import path below to
 * `octopus-ribbons` and the property to `.OctopusRibbons`. That component is
 * still in the tree and unmodified — nothing else needs to change.
 */
const HeroCanvas = dynamic(
    () =>
        import("@/components/shared/octopus-tentacles").then(
            (m) => m.OctopusTentacles,
        ),
    { ssr: false },
);

const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: MOTION_DURATION.base,
            ease: MOTION_EASE_STANDARD,
        },
    },
};

const markVariant = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE_EMPHASIS,
        },
    },
};

export function HeroContent() {
    const { text, locale } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

    // The brand name is always Latin and never transliterated (spec §0), so it
    // is isolated from the surrounding RTL run.
    const isArabic = locale === "ar";

    return (
        <div className="relative w-full">
            {/*
             * Full-bleed canvas inside a max-width layout.
             *
             * The section is `max-w-[1440px]` with `overflow-hidden`, so an
             * `-inset-x` percentage could only ever bleed to the container,
             * not the screen. The canvas breaks out to the viewport with
             * `w-screen` + a half-viewport translate, which stays centred at
             * any width without depending on the container's own margins.
             * Only the canvas does this — the text grid keeps the container.
             *
             * The mask is an ellipse centred high: opaque through the middle
             * where the arms hang, fading to nothing before it reaches any
             * edge of the (much larger) canvas. It is centred at 22% now that
             * the body sits off the top of the frame rather than the bottom.
             */}
            <HeroCanvas className="pointer-events-none absolute start-1/2 -top-40 -bottom-[45%] -z-10 w-screen -translate-x-1/2 rtl:translate-x-1/2 [mask-image:radial-gradient(85%_75%_at_50%_22%,#000_18%,transparent_92%)] [-webkit-mask-image:radial-gradient(85%_75%_at_50%_22%,#000_18%,transparent_92%)]" />

            <div className="flex w-full flex-col justify-center gap-10 sm:gap-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
                <m.div
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: MOTION_STAGGER.base,
                            },
                        },
                    }}
                    className="order-2 lg:order-1"
                >
                    <m.p
                        variants={item}
                        className="type-label font-mono uppercase tracking-[0.2em] text-accent-text"
                    >
                        {isArabic ? (
                            <>
                                {text.profile.fullName} —{" "}
                                <span data-latin>The Octopus</span>
                            </>
                        ) : (
                            text.hero.badge
                        )}
                    </m.p>

                    <m.h1
                        variants={item}
                        className="type-display mt-4 text-balance text-foreground sm:mt-6"
                    >
                        {text.hero.headingLine1}
                    </m.h1>

                    <m.p
                        variants={item}
                        className="mt-4 max-w-xl whitespace-pre-line leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
                    >
                        {text.hero.summary}
                    </m.p>

                    <m.div
                        variants={item}
                        /*
                         * Full-width stacked buttons on phones: at 390px the
                         * two pills wrapped into a ragged two-line block with
                         * unequal widths, which is most of what made the hero
                         * read as stiff.
                         */
                        className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group w-full sm:w-auto"
                        >
                            <Link href="/work">
                                {text.hero.seeProjects}
                                <FiArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            <Link href="/contact">{text.hero.downloadCV}</Link>
                        </Button>
                    </m.div>

                    {/*
                      * `data-latin` sits on the inner <span>, never on the <p>.
                      * The helper sets `direction: ltr` to isolate the Latin
                      * run; on a block element that also flips the line's
                      * alignment to the left inside an RTL page, which left this
                      * stack line hanging on the wrong side in Arabic.
                      */}
                    <m.p
                        variants={item}
                        className="mt-8 border-t border-border/60 pt-6 font-mono text-xs text-muted-foreground sm:mt-12"
                    >
                        <span data-latin>{text.hero.stack}</span>
                    </m.p>
                </m.div>

                <m.div
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="show"
                    variants={markVariant}
                    className="relative order-1 flex w-full items-center justify-center lg:order-2 lg:mx-0 lg:ms-auto lg:aspect-4/5 lg:max-w-sm"
                >
                    {/* A soft violet bloom behind the mark, so on phones it
                        reads as a deliberate focal point rather than a logo
                        dropped into empty space. */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute h-48 w-48 rounded-full bg-primary/15 blur-3xl sm:h-56 sm:w-56 lg:h-72 lg:w-72"
                    />
                    <OctopusMark
                        alt={text.profile.shortName}
                        className="relative w-40 opacity-90 sm:w-48 lg:w-full lg:max-w-md lg:opacity-100"
                    />
                </m.div>
            </div>
        </div>
    );
}
