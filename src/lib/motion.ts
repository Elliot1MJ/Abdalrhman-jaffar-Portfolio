export const MOTION_EASE_STANDARD: [number, number, number, number] = [
    0.22,
    1,
    0.36,
    1,
];

export const MOTION_EASE_EMPHASIS: [number, number, number, number] = [
    0.16,
    1,
    0.3,
    1,
];

export const MOTION_DURATION = {
    micro: 0.16,
    fast: 0.24,
    base: 0.34,
    medium: 0.46,
    slow: 0.6,
} as const;

export const MOTION_STAGGER = {
    tight: 0.06,
    base: 0.09,
} as const;

export const MOTION_SPRING_GENTLE = {
    type: "spring" as const,
    stiffness: 270,
    damping: 30,
    mass: 0.8,
};

export const SECTION_REVEAL_INITIAL = {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(4px)",
};

export const SECTION_REVEAL_ENTER = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
};

export const UI_MODE_SWITCH_ANIMATION_MS = 380;
