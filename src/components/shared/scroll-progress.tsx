"use client";

import { m, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A hairline reading-progress bar pinned under the header. Uses the brand
 * violet as a fill (not as text), which is what spark-500 is specified for.
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const shouldReduceMotion = useReducedMotion();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 30,
        restDelta: 0.001,
    });

    if (shouldReduceMotion) return null;

    return (
        <m.div
            aria-hidden
            style={{ scaleX }}
            // Tracks --nav-height-current, which the header updates when it
            // condenses; pinning to the static --nav-height left the bar
            // hanging in mid-air once the header shrank.
            className="fixed inset-x-0 top-(--nav-height-current) z-[61] h-0.5 origin-[0%] bg-primary transition-[top] duration-300 rtl:origin-[100%]"
        />
    );
}
