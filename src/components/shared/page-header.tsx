"use client";

import { m, useReducedMotion } from "framer-motion";
import { TextReveal } from "@/components/shared/text-reveal";
import {
    MOTION_DURATION,
    MOTION_EASE_STANDARD,
    MOTION_VIEWPORT,
} from "@/lib/motion";

interface PageHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
}

/**
 * The shared masthead for every interior page. Previously each page hand-rolled
 * this same eyebrow/title/description stack with slightly different classes;
 * centralizing it keeps the type scale and rhythm identical site-wide.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
    const shouldReduceMotion = useReducedMotion();

    const fade = {
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: MOTION_DURATION.base,
                ease: MOTION_EASE_STANDARD,
            },
        },
    };

    return (
        <header className="relative">
            <m.p
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="show"
                viewport={MOTION_VIEWPORT}
                variants={fade}
                className="type-label font-mono uppercase tracking-[0.15em] text-accent-text"
            >
                {eyebrow}
            </m.p>

            <TextReveal
                as="h1"
                text={title}
                delay={0.05}
                className="type-display mt-4 max-w-3xl text-foreground"
            />

            {description ? (
                <m.p
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={MOTION_VIEWPORT}
                    variants={fade}
                    transition={{ delay: 0.1 }}
                    className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
                >
                    {description}
                </m.p>
            ) : null}

            {/* Hairline rule in the brand violet — a fill use, which is AA-safe. */}
            <m.div
                aria-hidden
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={MOTION_VIEWPORT}
                transition={{
                    duration: MOTION_DURATION.deliberate,
                    ease: MOTION_EASE_STANDARD,
                    delay: 0.15,
                }}
                className="mt-10 h-px w-full origin-[0%] bg-linear-to-r from-primary/70 to-transparent rtl:origin-[100%] rtl:bg-linear-to-l"
            />
        </header>
    );
}
