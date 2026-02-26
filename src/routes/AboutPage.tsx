import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Badge } from "../components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { education, profile, quickStats, values } from "../data/portfolio";

export default function AboutPage() {
    return (
        <div className="space-y-14">
            <MotionReveal>
                <section className="space-y-6">
                    <SectionHeading
                        eyebrow="About me"
                        title={`${profile.shortName}, ${profile.title}`}
                        description="Computer Science Engineering student focused on full-stack applications that feel fast and intuitive."
                    />

                    <Card className="border-white/10 bg-card/45">
                        <CardContent className="space-y-4 p-6 text-center leading-relaxed text-muted-foreground sm:text-base">
                            <p>
                                I am currently in my third year at Lattakia
                                University. My work centers on the JavaScript
                                and TypeScript ecosystem, especially React for
                                interfaces and Node.js for backend services.
                            </p>
                            <p>
                                I enjoy translating ideas into maintainable
                                products, with strong attention to architecture,
                                performance, and user experience.
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                                <p className="text-xs text-muted-foreground">
                                    {stat.detail}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="border-white/10 bg-card/45">
                        <CardHeader className="text-center">
                            <CardTitle>Education</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0 text-center">
                            <div className="space-y-1">
                                <p className="font-semibold-alt text-base">
                                    {education.degree}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {education.university}
                                </p>
                            </div>
                            <div className="grid gap-2 text-sm text-muted-foreground">
                                <p>
                                    <span className="font-semibold-alt text-foreground">
                                        Duration:
                                    </span>{" "}
                                    {education.duration}
                                </p>
                                <p>
                                    <span className="font-semibold-alt text-foreground">
                                        Status:
                                    </span>{" "}
                                    {education.status}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {education.coursework.map((item) => (
                                    <Badge key={item} variant="outline">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/10 bg-card/45">
                        <CardHeader className="text-center">
                            <CardTitle>Working principles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0 text-center">
                            {values.map((value) => (
                                <div key={value.title} className="space-y-1">
                                    <p className="font-semibold-alt text-foreground">
                                        {value.title}
                                    </p>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </section>
            </MotionReveal>
        </div>
    );
}
