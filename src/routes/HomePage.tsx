import { m, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
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
            className: "left-[12%] top-[17%] h-2.5 w-2.5 border-primary/45",
            duration: 3.2,
            delay: 0.2,
        },
        {
            className: "left-[18%] bottom-[14%] h-3 w-3 border-accent/45",
            duration: 3.8,
            delay: 0.6,
        },
        {
            className: "right-[14%] top-[20%] h-2.5 w-2.5 border-primary/45",
            duration: 3.4,
            delay: 0.3,
        },
        {
            className: "right-[20%] bottom-[12%] h-3 w-3 border-accent/45",
            duration: 4.1,
            delay: 0.7,
        },
        {
            className:
                "left-1/2 top-[12%] h-2 w-2 -translate-x-1/2 border-foreground/35",
            duration: 4.2,
            delay: 0.4,
        },
        {
            className:
                "left-1/2 bottom-[10%] h-2 w-2 -translate-x-1/2 border-foreground/35",
            duration: 4.4,
            delay: 0.9,
        },
    ];

    const floatingGlyphs = [
        {
            className: "left-[3%] top-[9%]",
            frameClassName:
                "h-11 w-11 text-primary/75 border-primary/35 bg-background/25",
            icon: glyphCube,
            animation: { y: [0, -10, 0], x: [0, 6, 0], rotate: [0, 4, 0] },
            duration: 8.2,
            delay: 0.2,
        },
        {
            className: "left-[10%] top-[30%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphTarget,
            animation: { y: [0, 9, 0], x: [0, -5, 0], rotate: [0, -6, 0] },
            duration: 9.4,
            delay: 0.5,
        },
        {
            className: "left-[6%] bottom-[27%]",
            frameClassName:
                "h-12 w-12 text-accent/70 border-accent/35 bg-background/24",
            icon: glyphPanel,
            animation: { y: [0, -8, 0], x: [0, 4, 0], rotate: [0, 5, 0] },
            duration: 7.6,
            delay: 0.1,
        },
        {
            className: "left-[17%] bottom-[9%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphAxis,
            animation: { y: [0, -7, 0], x: [0, 3, 0], rotate: [0, 3, 0] },
            duration: 7.9,
            delay: 0.35,
        },
        {
            className: "right-[4%] top-[10%]",
            frameClassName:
                "h-11 w-11 text-accent/70 border-accent/35 bg-background/25",
            icon: glyphHex,
            animation: { y: [0, 9, 0], x: [0, -5, 0], rotate: [0, -6, 0] },
            duration: 8.8,
            delay: 0.25,
        },
        {
            className: "right-[11%] top-[31%]",
            frameClassName:
                "h-10 w-10 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphTarget,
            animation: { y: [0, -8, 0], x: [0, 4, 0], rotate: [0, 6, 0] },
            duration: 9.4,
            delay: 0.5,
        },
        {
            className: "right-[7%] bottom-[25%]",
            frameClassName:
                "h-12 w-12 text-primary/75 border-primary/35 bg-background/24",
            icon: glyphCube,
            animation: { y: [0, 11, 0], x: [0, -6, 0], rotate: [0, -4, 0] },
            duration: 10.2,
            delay: 0.3,
        },
        {
            className: "right-[16%] bottom-[8%]",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphHex,
            animation: { y: [0, 8, 0], x: [0, -4, 0], rotate: [0, -5, 0] },
            duration: 9.1,
            delay: 0.45,
        },
        {
            className: "left-1/2 top-[6%] -translate-x-1/2",
            frameClassName:
                "h-9 w-9 text-foreground/65 border-foreground/25 bg-background/20",
            icon: glyphAxis,
            animation: { y: [0, -7, 0], x: [0, 0, 0], rotate: [0, 2, 0] },
            duration: 8.8,
            delay: 0.4,
        },
        {
            className: "left-1/2 bottom-[7%] -translate-x-1/2",
            frameClassName:
                "h-10 w-10 text-primary/70 border-primary/35 bg-background/24",
            icon: glyphPanel,
            animation: { y: [0, 7, 0], x: [0, 0, 0], rotate: [0, -2, 0] },
            duration: 10.4,
            delay: 0.55,
        },
        {
            className: "left-[29%] top-[8%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, -6, 0], x: [0, 2, 0], rotate: [0, 6, 0] },
            duration: 7.4,
            delay: 0.15,
        },
        {
            className: "right-[29%] bottom-[7%]",
            frameClassName:
                "h-8 w-8 text-accent/70 border-accent/35 bg-background/18",
            icon: glyphSpark,
            animation: { y: [0, 6, 0], x: [0, -2, 0], rotate: [0, -6, 0] },
            duration: 10.2,
            delay: 0.25,
        },
    ];

    return (
        <div className="space-y-16 sm:space-y-20 ">
            {/* grid bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[0] hidden md:block"
            >
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
            </div>

            {/* main home page */}
            <MotionReveal>
                <section className="relative min-h-[80vh] max-md:min-h-auto w-full overflow-hidden flex flex-col justify-center gap-10 sm:gap-12 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-14">
                    {/* Right card (Image) -> FIRST on mobile, normal on lg */}
                    <Card className="relative z-10 order-first mx-auto w-full max-w-[22rem] overflow-hidden shadow-none sm:max-w-[24rem] lg:order-none lg:mx-0 lg:max-w-[26rem] lg:flex-shrink-0">
                        <CardContent className="p-4 sm:p-6">
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
                                    <p className="text-[11px] text-muted-foreground sm:text-xs">
                                        {text.profile.title}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Left content */}
                    <div className="relative z-10 order-none w-full flex-1 space-y-6 max-lg:text-center">
                        <Badge className="mx-auto w-fit md:mx-0">
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

                        <p className="mx-auto whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground text-start max-lg:text-center">
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

                        <div className="pt-2 text-xs text-muted-foreground md:text-sm">
                            <span className="opacity-80">
                                {text.hero.stack}
                            </span>
                        </div>
                    </div>
                </section>
            </MotionReveal>
        </div>
    );
}
