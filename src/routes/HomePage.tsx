import { FiArrowRight, FiDownload } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useI18n } from "../i18n/useI18n";
import { navigateToSection } from "../lib/sectionNavigation";

export default function HomePage() {
    const { text } = useI18n();

    return (
        <div className="space-y-16 sm:space-y-20">
            <MotionReveal>
                <section className="relative min-h-[80vh] flex flex-col justify-center gap-10 sm:gap-12 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-14">
                    {/* Right card (Image) -> FIRST on mobile, normal on lg */}
                    <Card className="order-first mx-auto w-full max-w-[22rem] overflow-hidden shadow-none sm:max-w-[24rem] lg:order-none lg:mx-0 lg:max-w-[26rem] lg:flex-shrink-0">
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
                    <div className="order-none w-full flex-1 space-y-6 max-lg:text-center">
                        <Badge className="mx-auto w-fit md:mx-0">
                            {text.hero.badge}
                        </Badge>

                        <h1 className="hero-title text-balance font-display text-4xl leading-[1.05] sm:text-5xl sm:leading-[1.05] md:text-6xl md:leading-[1.05] xl:text-7xl">
                            <span className="block">
                                {text.hero.headingLine1}
                            </span>
                            <span className="accent block">
                                {text.hero.headingLine2}
                            </span>
                            <span className="block">
                                {text.hero.headingLine3}
                            </span>
                        </h1>

                        <p className="mx-auto text-pretty text-sm leading-relaxed text-muted-foreground text-start max-lg:text-center">
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
                                React • Next.js • TypeScript • Tailwind •
                                Dashboards • Booking Systems
                            </span>
                        </div>
                    </div>
                </section>
            </MotionReveal>
        </div>
    );
}
