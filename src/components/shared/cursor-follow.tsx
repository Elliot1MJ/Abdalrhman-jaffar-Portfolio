"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/**
 * A single ring that trails the real cursor.
 *
 * Design notes:
 *  - The native cursor stays visible; this only adds the trailing ring. An
 *    earlier version also drew a dot locked to the pointer, which just sat on
 *    top of the system cursor and read as a rendering artifact.
 *  - It does NOT use `mix-blend-mode: difference`. On the brand's near-black
 *    ground (#111114) difference-blending a white ring produces an almost-white
 *    result at low opacity, which was effectively invisible in dark mode. The
 *    ring now paints in the theme's own foreground color at full opacity
 *    instead, so it reads with equal confidence in both themes.
 *
 * Performance: position is driven by framer `MotionValue`s, so pointer updates
 * write straight to `transform` without a React render. Only `transform` and
 * `opacity` animate — both composited. Hover detection is one delegated
 * listener rather than one per element.
 *
 * Never mounts on coarse pointers or under reduced motion.
 */

const RING_SIZE = 28;

const INTERACTIVE_SELECTOR =
    'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

export function CursorFollow() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
    const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

        const update = () => setIsEnabled(fine.matches && !reduced.matches);
        update();

        fine.addEventListener("change", update);
        reduced.addEventListener("change", update);
        return () => {
            fine.removeEventListener("change", update);
            reduced.removeEventListener("change", update);
        };
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        const onMove = (event: PointerEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setIsVisible(true);
        };

        const onOver = (event: PointerEvent) => {
            const target = event.target as Element | null;
            setIsHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
        };

        const onLeave = () => setIsVisible(false);

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        document.addEventListener("pointerleave", onLeave);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerleave", onLeave);
        };
    }, [isEnabled, x, y]);

    if (!isEnabled) return null;

    return (
        <m.div
            aria-hidden
            style={{
                x: ringX,
                y: ringY,
                width: RING_SIZE,
                height: RING_SIZE,
                marginLeft: -RING_SIZE / 2,
                marginTop: -RING_SIZE / 2,
            }}
            animate={{
                scale: isHovering ? 1.9 : 1,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-none fixed top-0 left-0 z-[100] hidden rounded-full border-2 border-accent-text lg:block"
        />
    );
}
