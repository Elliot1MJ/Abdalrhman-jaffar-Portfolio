import { m } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import myPic from "../assets/images/myPic.jpg";
import MotionReveal from "../components/shared/MotionReveal";
import ProjectCard from "../components/shared/ProjectCard";
import SectionHeading from "../components/shared/SectionHeading";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
    featuredProjects,
    profile,
    quickStats,
    skillGroups,
} from "../data/portfolio";

export default function HomePage() {
    return (
        <div className="space-y-16 sm:space-y-20">
            <MotionReveal>
                <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <div className="space-y-6">
                        <Badge>Available for freelance projects</Badge>
                        <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                            {profile.shortName}
                            <span className="text-primary"> builds fast</span>,
                            scalable web experiences.
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {profile.roleSummary} I focus on delivering maintainable code,
                            responsive interfaces, and measurable performance wins.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link to="/projects">
                                <Button size="lg" className="rounded-full px-7">
                                    See projects
                                    <FiArrowRight />
                                </Button>
                            </Link>
                            <Link to="/cv">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-7"
                                >
                                    Download CV
                                    <FiDownload />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Card className="overflow-hidden border-border/70 bg-card/75">
                        <CardContent className="p-4 sm:p-6">
                            <div className="relative aspect-square overflow-hidden rounded-xl border border-border/70 bg-secondary/40">
                                <img
                                    src={myPic}
                                    alt={profile.name}
                                    loading="eager"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                                    <p className="font-semibold-alt text-base">{profile.name}</p>
                                    <p className="text-xs text-muted-foreground">{profile.location}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickStats.map((stat) => (
                        <Card key={stat.label} className="border-border/70 bg-card/65">
                            <CardContent className="space-y-2 p-5">
                                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="font-display text-2xl text-primary">{stat.value}</p>
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {stat.detail}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="space-y-8">
                    <SectionHeading
                        eyebrow="Core skills"
                        title="Technical stack shaped for modern products"
                        description="I combine frontend polish with backend reliability so products feel fast and stable in real usage."
                    />

                    <div className="grid gap-4 md:grid-cols-3">
                        {skillGroups.map((group, index) => (
                            <m.div
                                key={group.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Card className="h-full border-border/70 bg-card/70">
                                    <CardContent className="space-y-4 p-5">
                                        <h3 className="font-semibold-alt text-lg text-foreground">
                                            {group.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {group.skills.map((skill) => (
                                                <Badge
                                                    key={`${group.title}-${skill}`}
                                                    variant="outline"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </m.div>
                        ))}
                    </div>
                </section>
            </MotionReveal>

            <Separator className="bg-border/70" />

            <MotionReveal>
                <section className="space-y-8">
                    <SectionHeading
                        eyebrow="Featured work"
                        title="Selected projects"
                        description="A quick look at shipped projects focused on usability, clean architecture, and delivery speed."
                        action={
                            <Link to="/projects" className="inline-flex">
                                <Button variant="outline" className="rounded-full">
                                    View all projects
                                    <FiArrowRight />
                                </Button>
                            </Link>
                        }
                    />

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.name} project={project} />
                        ))}
                    </div>
                </section>
            </MotionReveal>

            <MotionReveal>
                <Card className="border-primary/35 bg-gradient-to-r from-primary/15 via-accent/10 to-transparent">
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div className="space-y-2">
                            <p className="font-display text-2xl sm:text-3xl">Ready to build your next web product?</p>
                            <p className="text-sm text-muted-foreground">
                                I can help you ship a fast, polished website with production-grade code.
                            </p>
                        </div>
                        <Link to="/contact">
                            <Button size="lg" className="rounded-full px-8">
                                Start a project
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </MotionReveal>
        </div>
    );
}
