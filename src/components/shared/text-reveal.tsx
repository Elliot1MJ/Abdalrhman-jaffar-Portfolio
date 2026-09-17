"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    MOTION_STAGGER,
    MOTION_VIEWPORT,
} from "@/lib/motion";

interface TextRevealProps {
    text: string;
    className?: string;
    as?: ElementType;
    delay?: number;
}

const word = {
    hidden: { opacity: 0, y: "0.4em" },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: MOTION_DURATION.deliberate,
            ease: MOTION_EASE_EMPHASIS,
        },
    },
};

/**
 * Staggered word-by-word heading reveal.
 *
 * Splits on whitespace only — never per character. Arabic is a cursive script:
 * wrapping individual letters in separate elements severs the joins and renders
 * words in disconnected, isolated letterforms. Word-level splitting is the only
 * form of this effect that is safe in both scripts.
 *
 * Each word keeps a normal space after it so text still copies and reads to
 * assistive tech as a sentence; the whole string is also exposed via aria-label
 * with the animated fragments hidden.
 */
export function TextReveal({
    text,
    className,
    as: Component = "h2",
    delay = 0,
}: TextRevealProps) {
    const shouldReduceMotion = useReducedMotion();
    const MotionComponent = m(Component);

    if (shouldReduceMotion) {
        return <Component className={className}>{text}</Component>;
    }

    const words = text.split(" ");

    return (
        <MotionComponent
            className={className}
            aria-label={text}
            initial="hidden"
            whileInView="show"
            viewport={MOTION_VIEWPORT}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: MOTION_STAGGER.tight,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {words.map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    aria-hidden
                    // inline-block is required for the y transform to apply,
                    // and overflow-hidden gives the words a mask to rise out of.
                    className="inline-block overflow-hidden align-bottom"
                >
                    <m.span variants={word} className="inline-block">
                        {item}
                        {index < words.length - 1 ? " " : ""}
                    </m.span>
                </span>
            ))}
        </MotionComponent>
    );
}
