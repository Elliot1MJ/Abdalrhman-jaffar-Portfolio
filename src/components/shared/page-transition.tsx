"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { MOTION_EASE_EMPHASIS } from "@/lib/motion";

/**
 * Route transition.
 *
 * The previous version used `mode="wait"` with a 0.32s exit and a 0.32s enter,
 * so every navigation cost ~0.64s of dead time before the new page appeared —
 * which is what made it feel sluggish.
 *
 * This version:
 *  - exits fast (0.16s) and enters on a separate, slightly longer curve, with
 *    the two overlapping instead of strictly sequenced;
 *  - moves on `opacity` + a 0.4% `scale` rather than a 10px `y` shift, so the
 *    page settles into place instead of sliding past it;
 *  - keeps `initial={false}` so the first paint is never animated.
 *
 * `mode="popLayout"` lets the outgoing page leave the flow immediately, so the
 * incoming one is already painting while the old one fades.
 */
export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <m.div
                key={pathname}
                initial={{ opacity: 0, scale: 0.996 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.34, ease: MOTION_EASE_EMPHASIS },
                }}
                exit={{
                    opacity: 0,
                    scale: 0.998,
                    transition: { duration: 0.16, ease: "easeIn" },
                }}
                // Hint the compositor for the duration of the transition only.
                style={{ willChange: "opacity, transform" }}
            >
                {children}
            </m.div>
        </AnimatePresence>
    );
}
