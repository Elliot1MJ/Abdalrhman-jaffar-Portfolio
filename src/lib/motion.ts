/**
 * Timing for framer animations.
 *
 * These are the same numbers as `--duration-*` / `--ease-*` in `globals.css`,
 * which drive every CSS transition. Keep the two in sync: when they drift, the
 * hover (CSS) and the reveal (framer) on the same card run at visibly different
 * speeds, which is exactly the inconsistency this scale exists to prevent.
 */
export const MOTION_DURATION = {
    fast: 0.18,
    base: 0.32,
    slow: 0.5,
    deliberate: 0.75,
} as const;

export const MOTION_EASE_STANDARD = [0.25, 0.1, 0.25, 1] as const;
export const MOTION_EASE_EMPHASIS = [0.16, 1, 0.3, 1] as const;
/** Slight overshoot — use sparingly, for elements that "arrive". */
export const MOTION_EASE_ENTRANCE = [0.34, 1.26, 0.64, 1] as const;

export const MOTION_STAGGER = {
    tight: 0.05,
    base: 0.08,
    loose: 0.12,
} as const;

/** Shared viewport config so every scroll reveal triggers at the same point. */
export const MOTION_VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD },
    },
};

/**
 * Direction-aware horizontal reveal. RTL mirrors the travel so content always
 * enters from the side the reader is coming from.
 */
export const fadeIn = (dir: "ltr" | "rtl" = "ltr") => {
    const offset = dir === "rtl" ? -24 : 24;
    return {
        hidden: { opacity: 0, x: offset },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: MOTION_DURATION.base,
                ease: MOTION_EASE_STANDARD,
            },
        },
    };
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE_EMPHASIS,
        },
    },
};

export const staggerContainer = (stagger: number = MOTION_STAGGER.base) => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren: stagger,
        },
    },
});

/**
 * One hover behaviour for every card on the site.
 *
 * Cards previously split four ways — a spring with `{ y: -6, scale: 1.01 }` on
 * work/home/about, and tweens of `{ y: -3 }` or `{ y: -4 }` at 0.2s on
 * services/courses/contact. Same component role, visibly different response.
 *
 * A spring is the right choice here: it decelerates naturally and is
 * interruptible when the pointer leaves mid-flight, where a fixed-duration
 * tween snaps.
 */
export const CARD_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 24,
    mass: 0.6,
} as const;

export const CARD_HOVER = { y: -6, scale: 1.01 } as const;
