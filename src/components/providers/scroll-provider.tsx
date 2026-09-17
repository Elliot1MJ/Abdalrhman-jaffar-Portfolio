"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Smooth scrolling, loaded lazily and client-side only.
 *
 * Two things this must not break:
 *  - `prefers-reduced-motion`. Hijacking scroll is exactly the kind of motion
 *    that triggers vestibular discomfort, so the whole library is skipped.
 *  - Anchor/`scroll-behavior: smooth` interplay. Lenis drives scrolling itself,
 *    so the CSS rule is disabled while it is active and restored on teardown.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (motionQuery.matches) return;

        let cleanup: (() => void) | undefined;
        let disposed = false;

        (async () => {
            const Lenis = (await import("lenis")).default;
            if (disposed) return;

            const lenis = new Lenis({
                duration: 1.05,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                // Touch devices already have native momentum; overriding it
                // feels worse than leaving it alone.
                syncTouch: false,
            });

            const root = document.documentElement;
            const previousScrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = "auto";

            let frame = 0;
            const raf = (time: number) => {
                lenis.raf(time);
                frame = requestAnimationFrame(raf);
            };
            frame = requestAnimationFrame(raf);

            cleanup = () => {
                cancelAnimationFrame(frame);
                lenis.destroy();
                root.style.scrollBehavior = previousScrollBehavior;
            };
        })();

        return () => {
            disposed = true;
            cleanup?.();
        };
    }, []);

    return <>{children}</>;
}
