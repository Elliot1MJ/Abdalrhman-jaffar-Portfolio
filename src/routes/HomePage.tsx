import { FiArrowRight, FiDownload } from "react-icons/fi";
import myPic from "../assets/images/myPic.jpg";
import MotionReveal from "../components/shared/MotionReveal";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { profile, quickStats } from "../data/portfolio";

export default function HomePage() {
    return (
        <div className="space-y-16 sm:space-y-20">
            <MotionReveal>
                <section className="flex items-center max-md:flex-col-reverse max-md:gap-10 lg:items-center">
                    <div className="space-y-6 max-md:text-center">
                        <Badge>Available for freelance projects</Badge>
                        <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                            {profile.shortName}
                            <span className="text-primary"> builds fast</span>,
                            scalable web experiences.
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {profile.roleSummary} I focus on delivering
                            maintainable code, responsive interfaces, and
                            measurable performance wins.
                        </p>

                        <div className="flex flex-wrap gap-3 max-md:justify-center">
                            <a href="#projects">
                                <Button size="lg" className="rounded-full px-7">
                                    See projects
                                    <FiArrowRight />
                                </Button>
                            </a>
                            <a href="#cv">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-7"
                                >
                                    Download CV
                                    <FiDownload />
                                </Button>
                            </a>
                        </div>
                    </div>

                    <Card className="overflow-hidden border-white/10 bg-card/45">
                        <CardContent className="p-4 sm:p-6">
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-secondary/30">
                                <img
                                    src={myPic}
                                    alt={profile.name}
                                    loading="eager"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                                    <p className="font-semibold-alt text-base">
                                        {profile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {profile.location}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickStats.map((stat) => (
                        <Card
                            key={stat.label}
                            className="border-white/10 bg-card/40"
                        >
                            <CardContent className="space-y-2 p-5 text-center">
                                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="font-display text-2xl text-primary">
                                    {stat.value}
                                </p>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {stat.detail}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </MotionReveal>
        </div>
    );
}
