import { m, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import error404Illustration from "../assets/images/error-404-space.svg";
import { useI18n } from "../i18n/useI18n";
import { MOTION_DURATION, MOTION_EASE_EMPHASIS } from "../lib/motion";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export default function ErrPage() {
    const shouldReduceMotion = useReducedMotion();
    const { isRtl, text } = useI18n();
    const BackIcon = isRtl ? FiArrowRight : FiArrowLeft;
    const desktopAlign = isRtl ? "lg:text-right" : "lg:text-left";

    return (
        <div className="page-shell h-screen overflow-hidden bg-background text-foreground">
            <div
                aria-hidden
                className="home-grid-bg pointer-events-none absolute inset-0 z-0"
            />

            <main className="relative z-10 mx-auto flex h-screen w-[92%] max-w-6xl items-center justify-center overflow-hidden px-3 py-4 sm:w-[90%] sm:px-6">
                <m.section
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{
                        duration: shouldReduceMotion ? 0 : MOTION_DURATION.base,
                        ease: MOTION_EASE_EMPHASIS,
                    }}
                    className="relative w-full max-h-[94vh] overflow-hidden rounded-[2rem] border border-foreground/14 p-4 shadow-[0_40px_90px_-60px_rgba(0,0,0,0.95)] sm:p-6 lg:p-8"
                    style={{
                        backgroundImage:
                            "radial-gradient(120% 90% at 50% -20%, hsl(var(--primary) / 0.2), transparent 56%), linear-gradient(160deg, hsl(var(--card) / 0.88) 0%, hsl(var(--background) / 0.92) 100%)",
                    }}
                >
                    <div className="mb-2 inline-flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-foreground/25 bg-background/70 text-xs font-semibold text-foreground">
                            {"</>"}
                        </span>
                        <span className="text-left leading-tight">
                            <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                                Portfolio
                            </span>
                            <span className="block text-xs font-semibold-alt text-foreground">
                                Abdalrhman
                            </span>
                        </span>
                    </div>

                    <div className="flex w-full flex-col items-center gap-4 p-2 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-7">
                        <div className="min-w-0 lg:flex-1">
                            <img
                                src={error404Illustration}
                                alt={`${text.error.code} illustration`}
                                loading="eager"
                                decoding="async"
                                className="mx-auto block h-auto w-full max-w-[300px] object-contain sm:max-w-[380px] lg:max-w-[560px]"
                            />
                        </div>

                        <div
                            className={cn(
                                "flex w-full flex-col items-center text-center lg:max-w-[44%] lg:items-start",
                                desktopAlign,
                            )}
                        >
                            <p className="text-xs font-semibold-alt uppercase tracking-[0.24em] text-muted-foreground sm:text-sm">
                                {text.error.code}
                            </p>
                            <h1 className="mt-1 font-display text-[clamp(4rem,13vw,8.5rem)] leading-[0.88] text-foreground">
                                404
                            </h1>
                            <h2 className="mt-2 font-display text-3xl leading-none sm:text-4xl">
                                {text.error.title}
                            </h2>
                            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                                {text.error.description}
                            </p>

                            <Link to="/" className="mt-5 inline-flex">
                                <Button
                                    size="lg"
                                    className="border border-foreground/20 bg-primary/85 shadow-[0_16px_28px_-18px_hsl(var(--primary)/0.8)] hover:bg-primary"
                                >
                                    <BackIcon />
                                    {text.error.backHome}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </m.section>
            </main>
        </div>
    );
}
