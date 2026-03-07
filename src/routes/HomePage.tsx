import { m, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiDownload } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CardContent } from "../components/ui/card";
import { useI18n } from "../i18n/useI18n";
import { navigateToSection } from "../lib/sectionNavigation";

export default function HomePage() {
    const shouldReduceMotion = useReducedMotion();
    const { text } = useI18n();
    const glyphCube = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M4 8L12 4L20 8L12 12L4 8Z"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M4 12L12 16L20 12"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M4 16L12 20L20 16"
                stroke="currentColor"
                strokeWidth="1.7"
            />
        </svg>
    );

    const glyphTarget = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <circle
                cx="12"
                cy="12"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M12 3V6M12 18V21M3 12H6M18 12H21"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );

    const glyphPanel = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="3.4"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
    );

    const glyphHex = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M12 9.4V14.6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
            <circle cx="12" cy="17.4" r="1" fill="currentColor" />
        </svg>
    );

    const glyphAxis = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M4 12H20M12 4V20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="12"
                r="3.4"
                stroke="currentColor"
                strokeWidth="1.7"
            />
        </svg>
    );

    const glyphSpark = (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
                d="M12 3L14.1 8.4L19.5 10.5L14.1 12.6L12 18L9.9 12.6L4.5 10.5L9.9 8.4L12 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );

    const floatingPulses = [
        {
            className: "left-[4%] top-[8%] h-2.5 w-2.5 border-primary/45",
            duration: 3.2,
            delay: 0.2,
        },
        {
            className: "left-[14%] top-[22%] h-2.5 w-2.5 border-accent/45",
            duration: 3.8,
            delay: 0.6,
        },
        {
            className: "left-[31%] top-[12%] h-2 w-2 border-foreground/35",
            duration: 4.1,
            delay: 0.15,
        },
        {
            className: "left-[46%] top-[30%] h-2.5 w-2.5 border-primary/45",
            duration: 3.5,
            delay: 0.45,
        },
        {
            className: "left-[59%] top-[11%] h-3 w-3 border-accent/45",
            duration: 3.9,
            delay: 0.3,
        },
        {
            className: "left-[72%] top-[27%] h-2 w-2 border-foreground/35",
            duration: 4.4,
            delay: 0.65,
        },
        {
            className: "left-[86%] top-[14%] h-2.5 w-2.5 border-primary/45",
            duration: 3.6,
            delay: 0.25,
        },
        {
            className: "left-[9%] top-[52%] h-3 w-3 border-accent/45",
            duration: 3.8,
            delay: 0.6,
        },
        {
            className: "left-[24%] top-[46%] h-2 w-2 border-foreground/35",
            duration: 3.4,
            delay: 0.3,
        },
        {
            className: "left-[39%] top-[57%] h-3 w-3 border-primary/45",
            duration: 4.1,
            delay: 0.7,
        },
        {
            className: "left-[55%] top-[49%] h-2.5 w-2.5 border-accent/45",
            duration: 4.2,
            delay: 0.4,
        },
        {
            className: "left-[68%] top-[62%] h-2 w-2 border-foreground/35",
            duration: 4.4,
            delay: 0.9,
        },
        {
            className: "left-[81%] top-[54%] h-2.5 w-2.5 border-primary/45",
            duration: 3.7,
            delay: 0.35,
        },
        {
            className: "left-[92%] top-[43%] h-2 w-2 border-foreground/35",
            duration: 4.3,
            delay: 0.5,
        },
        {
            className: "left-[17%] top-[70%] h-2.5 w-2.5 border-accent/45",
            duration: 4,
            delay: 0.2,
        },
        {
            className: "left-[47%] top-[72%] h-3 w-3 border-primary/45",
            duration: 3.6,
            delay: 0.55,
        },
        {
            className: "left-[77%] top-[69%] h-2 w-2 border-foreground/35",
            duration: 4.4,
            delay: 0.9,
        },
        {
            className: "left-[6%] top-[33%] h-2 w-2 border-foreground/35",
            duration: 3.9,
            delay: 0.28,
        },
        {
            className: "left-[27%] top-[31%] h-2.5 w-2.5 border-primary/45",
            duration: 3.5,
            delay: 0.52,
        },
        {
            className: "left-[43%] top-[6%] h-2 w-2 border-accent/45",
            duration: 4.3,
            delay: 0.18,
        },
        {
            className: "left-[61%] top-[36%] h-2.5 w-2.5 border-primary/45",
            duration: 3.7,
            delay: 0.42,
        },
        {
            className: "left-[74%] top-[7%] h-2 w-2 border-foreground/35",
            duration: 4.1,
            delay: 0.31,
        },
        {
            className: "left-[88%] top-[31%] h-2.5 w-2.5 border-accent/45",
            duration: 3.8,
            delay: 0.61,
        },
        {
            className: "left-[34%] top-[76%] h-2 w-2 border-foreground/35",
            duration: 4.2,
            delay: 0.21,
        },
        {
            className: "left-[63%] top-[78%] h-2.5 w-2.5 border-primary/45",
            duration: 3.6,
            delay: 0.49,
        },
        {
            className: "left-[90%] top-[67%] h-2 w-2 border-accent/45",
            duration: 4.2,
            delay: 0.38,
        },
        {
            className: "left-[8%] top-[84%] h-2 w-2 border-foreground/35",
            duration: 4.1,
            delay: 0.26,
        },
        {
            className: "left-[36%] top-[86%] h-2.5 w-2.5 border-primary/45",
            duration: 3.8,
            delay: 0.43,
        },
        {
            className: "left-[65%] top-[83%] h-2 w-2 border-accent/45",
            duration: 4.3,
            delay: 0.34,
        },
        {
            className: "left-[92%] top-[85%] h-2.5 w-2.5 border-primary/45",
            duration: 3.7,
            delay: 0.57,
        },
    ];

    const floatingGlyphs = [
        {
            className: "left-[6%] top-[14%]",
            frameClassName:
                "h-11 w-11 text-primary/75 border-primary/35 bg-background/25",
            icon: glyphCube,
            animation: { y: [0, -10, 0], x: [0, 6, 0], rotate: [0, 4, 0] },
            duration: 8.2,
            delay: 0.2,
        },
        {
            className: "left-[18%] top-[34%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphTarget,
            animation: { y: [0, 9, 0], x: [0, -5, 0], rotate: [0, -6, 0] },
            duration: 9.4,
            delay: 0.5,
        },
        {
            className: "left-[34%] top-[10%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, -6, 0], x: [0, 2, 0], rotate: [0, 6, 0] },
            duration: 7.4,
            delay: 0.15,
        },
        {
            className: "left-[48%] top-[24%]",
            frameClassName:
                "h-12 w-12 text-accent/70 border-accent/35 bg-background/24",
            icon: glyphPanel,
            animation: { y: [0, -8, 0], x: [0, 4, 0], rotate: [0, 5, 0] },
            duration: 7.6,
            delay: 0.1,
        },
        {
            className: "left-[63%] top-[8%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphAxis,
            animation: { y: [0, -7, 0], x: [0, 3, 0], rotate: [0, 3, 0] },
            duration: 7.9,
            delay: 0.35,
        },
        {
            className: "left-[78%] top-[28%]",
            frameClassName:
                "h-11 w-11 text-accent/70 border-accent/35 bg-background/25",
            icon: glyphHex,
            animation: { y: [0, 9, 0], x: [0, -5, 0], rotate: [0, -6, 0] },
            duration: 8.8,
            delay: 0.25,
        },
        {
            className: "left-[90%] top-[18%]",
            frameClassName:
                "h-10 w-10 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphTarget,
            animation: { y: [0, -8, 0], x: [0, 4, 0], rotate: [0, 6, 0] },
            duration: 9.4,
            delay: 0.5,
        },
        {
            className: "left-[10%] top-[60%]",
            frameClassName:
                "h-12 w-12 text-primary/75 border-primary/35 bg-background/24",
            icon: glyphCube,
            animation: { y: [0, 11, 0], x: [0, -6, 0], rotate: [0, -4, 0] },
            duration: 10.2,
            delay: 0.3,
        },
        {
            className: "left-[25%] top-[54%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphHex,
            animation: { y: [0, 8, 0], x: [0, -4, 0], rotate: [0, -5, 0] },
            duration: 9.1,
            delay: 0.45,
        },
        {
            className: "left-[41%] top-[66%]",
            frameClassName:
                "h-11 w-11 text-primary/75 border-primary/35 bg-background/24",
            icon: glyphCube,
            animation: { y: [0, 10, 0], x: [0, -5, 0], rotate: [0, -4, 0] },
            duration: 9.8,
            delay: 0.35,
        },
        {
            className: "left-[56%] top-[50%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, -5, 0], x: [0, 2, 0], rotate: [0, 5, 0] },
            duration: 8.6,
            delay: 0.2,
        },
        {
            className: "left-[70%] top-[64%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphAxis,
            animation: { y: [0, -7, 0], x: [0, 0, 0], rotate: [0, 2, 0] },
            duration: 8.8,
            delay: 0.4,
        },
        {
            className: "left-[84%] top-[58%]",
            frameClassName:
                "h-10 w-10 text-primary/70 border-primary/35 bg-background/24",
            icon: glyphPanel,
            animation: { y: [0, 7, 0], x: [0, 0, 0], rotate: [0, -2, 0] },
            duration: 10.4,
            delay: 0.55,
        },
        {
            className: "left-[92%] top-[70%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphHex,
            animation: { y: [0, 7, 0], x: [0, -3, 0], rotate: [0, -4, 0] },
            duration: 9.2,
            delay: 0.3,
        },
        {
            className: "left-[14%] top-[8%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, -6, 0], x: [0, 3, 0], rotate: [0, 6, 0] },
            duration: 8.1,
            delay: 0.18,
        },
        {
            className: "left-[29%] top-[26%]",
            frameClassName:
                "h-8 w-8 text-foreground/65 border-foreground/25 bg-background/18",
            icon: glyphAxis,
            animation: { y: [0, 6, 0], x: [0, -3, 0], rotate: [0, -5, 0] },
            duration: 8.7,
            delay: 0.41,
        },
        {
            className: "left-[52%] top-[38%]",
            frameClassName:
                "h-9 w-9 text-primary/70 border-primary/35 bg-background/20",
            icon: glyphTarget,
            animation: { y: [0, -7, 0], x: [0, 2, 0], rotate: [0, 4, 0] },
            duration: 9.5,
            delay: 0.24,
        },
        {
            className: "left-[67%] top-[45%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, 5, 0], x: [0, -2, 0], rotate: [0, -6, 0] },
            duration: 8.2,
            delay: 0.37,
        },
        {
            className: "left-[80%] top-[73%]",
            frameClassName:
                "h-8 w-8 text-primary/70 border-primary/35 bg-background/18",
            icon: glyphPanel,
            animation: { y: [0, -6, 0], x: [0, 2, 0], rotate: [0, 3, 0] },
            duration: 9.1,
            delay: 0.46,
        },
        {
            className: "right-[3%] top-[52%]",
            frameClassName:
                "h-8 w-8 text-foreground/65 border-foreground/25 bg-background/18",
            icon: glyphAxis,
            animation: { y: [0, 6, 0], x: [0, -2, 0], rotate: [0, -4, 0] },
            duration: 8.9,
            delay: 0.29,
        },
        {
            className: "left-[22%] top-[82%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, -5, 0], x: [0, 3, 0], rotate: [0, 5, 0] },
            duration: 8.4,
            delay: 0.23,
        },
        {
            className: "left-[74%] top-[84%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphHex,
            animation: { y: [0, 6, 0], x: [0, -2, 0], rotate: [0, -4, 0] },
            duration: 8.8,
            delay: 0.39,
        },
    ];

    const floatingOrbs = [
        {
            className: "left-[5%] top-[5%] h-20 w-20 bg-primary/16",
            animation: { scale: [1, 1.26, 1], opacity: [0.12, 0.28, 0.12] },
            duration: 16,
            delay: 0.2,
        },
        {
            className: "left-[24%] top-[14%] h-14 w-14 bg-accent/14",
            animation: { scale: [1, 1.2, 1], opacity: [0.1, 0.24, 0.1] },
            duration: 14.5,
            delay: 0.55,
        },
        {
            className: "left-[42%] top-[4%] h-24 w-24 bg-primary/14",
            animation: { scale: [1, 1.22, 1], opacity: [0.1, 0.26, 0.1] },
            duration: 17.2,
            delay: 0.35,
        },
        {
            className: "left-[60%] top-[18%] h-16 w-16 bg-accent/16",
            animation: { scale: [1, 1.18, 1], opacity: [0.12, 0.24, 0.12] },
            duration: 15.7,
            delay: 0.4,
        },
        {
            className: "left-[79%] top-[7%] h-20 w-20 bg-primary/15",
            animation: { scale: [1, 1.24, 1], opacity: [0.1, 0.25, 0.1] },
            duration: 16.4,
            delay: 0.15,
        },
        {
            className: "left-[11%] top-[56%] h-16 w-16 bg-accent/14",
            animation: { scale: [1, 1.2, 1], opacity: [0.1, 0.24, 0.1] },
            duration: 15.9,
            delay: 0.48,
        },
        {
            className: "left-[47%] top-[62%] h-24 w-24 bg-primary/12",
            animation: { scale: [1, 1.22, 1], opacity: [0.09, 0.22, 0.09] },
            duration: 17.8,
            delay: 0.27,
        },
        {
            className:
                "left-[83%] top-[58%] h-[4.5rem] w-[4.5rem] bg-accent/16",
            animation: { scale: [1, 1.2, 1], opacity: [0.1, 0.24, 0.1] },
            duration: 16.1,
            delay: 0.42,
        },
        {
            className: "left-[28%] top-[80%] h-14 w-14 bg-primary/14",
            animation: { scale: [1, 1.2, 1], opacity: [0.1, 0.24, 0.1] },
            duration: 15.4,
            delay: 0.33,
        },
        {
            className: "left-[72%] top-[81%] h-16 w-16 bg-accent/14",
            animation: { scale: [1, 1.22, 1], opacity: [0.1, 0.23, 0.1] },
            duration: 16.3,
            delay: 0.47,
        },
    ];

    const floatingBeams = [
        {
            className: "left-[8%] top-[24%] w-24 rotate-[13deg]",
            gradientClassName: "from-transparent via-primary/55 to-transparent",
            animation: { opacity: [0.15, 0.55, 0.15], x: [0, 5, 0] },
            duration: 6.8,
            delay: 0.15,
        },
        {
            className: "left-[30%] top-[19%] w-20 rotate-[-11deg]",
            gradientClassName: "from-transparent via-accent/50 to-transparent",
            animation: { opacity: [0.12, 0.45, 0.12], x: [0, -4, 0] },
            duration: 7.5,
            delay: 0.35,
        },
        {
            className: "left-[54%] top-[33%] w-28 rotate-[17deg]",
            gradientClassName: "from-transparent via-primary/50 to-transparent",
            animation: { opacity: [0.12, 0.48, 0.12], x: [0, 6, 0] },
            duration: 7.1,
            delay: 0.2,
        },
        {
            className: "left-[77%] top-[22%] w-24 rotate-[-14deg]",
            gradientClassName: "from-transparent via-accent/55 to-transparent",
            animation: { opacity: [0.14, 0.52, 0.14], x: [0, -5, 0] },
            duration: 6.9,
            delay: 0.43,
        },
        {
            className: "left-[19%] top-[68%] w-24 rotate-[12deg]",
            gradientClassName: "from-transparent via-primary/48 to-transparent",
            animation: { opacity: [0.12, 0.46, 0.12], x: [0, 4, 0] },
            duration: 7.8,
            delay: 0.28,
        },
        {
            className: "left-[69%] top-[74%] w-28 rotate-[-10deg]",
            gradientClassName: "from-transparent via-accent/50 to-transparent",
            animation: { opacity: [0.12, 0.45, 0.12], x: [0, -4, 0] },
            duration: 7.4,
            delay: 0.5,
        },
        {
            className: "left-[43%] top-[84%] w-24 rotate-[9deg]",
            gradientClassName: "from-transparent via-primary/45 to-transparent",
            animation: { opacity: [0.11, 0.42, 0.11], x: [0, 3, 0] },
            duration: 7.6,
            delay: 0.31,
        },
    ];

    return (
        <div className="relative min-h-[80vh]">
            {/* grid bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[3vh] z-[0] hidden h-[82vh] md:block"
            >
                {floatingOrbs.map((orb, index) => (
                    <m.span
                        key={`${orb.className}-${index}`}
                        className={`absolute rounded-full blur-2xl ${orb.className}`}
                        animate={shouldReduceMotion ? undefined : orb.animation}
                        transition={
                            shouldReduceMotion
                                ? undefined
                                : {
                                      duration: orb.duration,
                                      delay: orb.delay,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                  }
                        }
                    />
                ))}

                {floatingPulses.map((pulse, index) => (
                    <m.span
                        key={`${pulse.className}-${index}`}
                        className={`absolute rounded-full border bg-transparent ${pulse.className}`}
                        animate={
                            shouldReduceMotion
                                ? undefined
                                : {
                                      scale: [1, 1.8, 1],
                                      opacity: [0.85, 0.2, 0.85],
                                  }
                        }
                        transition={
                            shouldReduceMotion
                                ? undefined
                                : {
                                      duration: pulse.duration,
                                      delay: pulse.delay,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                  }
                        }
                    />
                ))}

                {floatingGlyphs.map((glyph, index) => (
                    <m.div
                        key={`${glyph.className}-${index}`}
                        className={`absolute grid place-items-center rounded-2xl border backdrop-blur-[1px] ${glyph.frameClassName} ${glyph.className}`}
                        animate={
                            shouldReduceMotion ? undefined : glyph.animation
                        }
                        transition={
                            shouldReduceMotion
                                ? undefined
                                : {
                                      duration: glyph.duration,
                                      delay: glyph.delay,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                  }
                        }
                    >
                        {glyph.icon}
                    </m.div>
                ))}

                {floatingBeams.map((beam, index) => (
                    <m.span
                        key={`${beam.className}-${index}`}
                        className={`absolute h-[2px] bg-gradient-to-r ${beam.gradientClassName} ${beam.className}`}
                        animate={
                            shouldReduceMotion ? undefined : beam.animation
                        }
                        transition={
                            shouldReduceMotion
                                ? undefined
                                : {
                                      duration: beam.duration,
                                      delay: beam.delay,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                  }
                        }
                    />
                ))}
            </div>

            {/* main home page */}
            <MotionReveal>
                <section className="relative min-h-[85vh] max-md:min-h-auto w-full overflow-hidden flex flex-col justify-center gap-10 sm:gap-12 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-14">
                    {/* Right card (Image) -> FIRST on mobile, normal on lg */}
                    <div className="relative z-10 order-first mx-auto w-full max-w-[22rem] overflow-hidden shadow-none sm:max-w-[24rem] lg:order-none lg:mx-0 lg:max-w-[30rem] lg:flex-shrink-0">
                        <CardContent className="">
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-foreground/10 bg-secondary/30">
                                <img
                                    src="/images/hero.webp"
                                    alt={text.hero.imageAlt}
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    width={900}
                                    height={900}
                                    sizes="(max-width: 768px) 78vw, 420px"
                                    className="h-full w-full object-cover"
                                />

                                {/* Soft lighting */}
                                <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_10%_10%,rgba(147,51,234,0.45),transparent_60%)] mix-blend-soft-light opacity-80" />

                                {/* Footer overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 sm:p-5">
                                    <p className="font-semibold-alt text-sm sm:text-base">
                                        {text.profile.fullName}
                                    </p>
                                    <p className="text-xs text-muted-foreground sm:text-sm">
                                        {text.profile.title}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </div>

                    {/* Left content */}
                    <div className=" relative z-10 order-none w-full flex-1 space-y-6 max-lg:text-center">
                        <Badge className="mx-auto md:mx-0">
                            {text.hero.badge}
                        </Badge>

                        <h1 className="hero-title text-balance font-display text-4xl leading-[1.05] sm:text-5xl sm:leading-[1.05] md:text-6xl md:leading-[1.05] xl:text-7xl">
                            <span className="w-full block">
                                {text.hero.headingLine1}
                            </span>
                            <span className="w-full accent block ">
                                {text.hero.headingLine2}
                            </span>
                            {text.hero.headingLine3 ? (
                                <span className="block">
                                    {text.hero.headingLine3}
                                </span>
                            ) : null}
                        </h1>

                        <p className="mx-auto text-pretty text-xl leading-relaxed text-muted-foreground text-start max-lg:text-center">
                            {text.hero.summary}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap max-lg:justify-center">
                            <a href="#projects" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full rounded-full px-7 sm:w-auto"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigateToSection("projects");
                                    }}
                                >
                                    {text.hero.seeProjects}
                                    <FiArrowRight />
                                </Button>
                            </a>

                            <a href="#cv" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full rounded-full px-7 sm:w-auto"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigateToSection("cv");
                                    }}
                                >
                                    {text.hero.downloadCV}
                                    <FiDownload />
                                </Button>
                            </a>
                        </div>

                        <div className="pt-2 text-sm text-muted-foreground md:text-base">
                            <span className="opacity-80">
                                {text.hero.stack}
                            </span>
                        </div>
                    </div>
                </section>
            </MotionReveal>

            <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 hidden justify-center lg:flex">
                <m.button
                    type="button"
                    aria-label={`Scroll to ${text.sectionAria.about}`}
                    onClick={() => navigateToSection("about")}
                    className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/25 bg-background/70 text-foreground/85 backdrop-blur transition-colors hover:border-primary hover:text-primary"
                    animate={
                        shouldReduceMotion
                            ? undefined
                            : { y: [0, 6, 0], opacity: [0.62, 1, 0.62] }
                    }
                    transition={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  duration: 1.7,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                              }
                    }
                >
                    <FiChevronDown className="text-base" />
                </m.button>
            </div>
        </div>
    );
}
