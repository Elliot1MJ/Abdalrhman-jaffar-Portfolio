export const MOTION_DURATION = {
    fast: 0.18,
    base: 0.32,
    slow: 0.5,
} as const;

export const MOTION_EASE_STANDARD = [0.22, 1, 0.36, 1] as const;
export const MOTION_EASE_EMPHASIS = [0.16, 1, 0.3, 1] as const;

export const MOTION_STAGGER = {
    tight: 0.05,
    base: 0.08,
} as const;

export const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD },
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
