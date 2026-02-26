import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Badge } from "../components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { cn } from "../lib/utils";
import { useI18n } from "../i18n/useI18n";

export default function AboutPage() {
    const { isRtl, text } = useI18n();

    return (
        <div className="space-y-14">
            <MotionReveal>
                <section className="space-y-6">
                    <SectionHeading
                        eyebrow={text.about.eyebrow}
                        title={text.about.title}
                        description={text.about.description}
                    />

                    <Card className="border-foreground/10 bg-card">
                        <CardContent className="space-y-4 p-6 text-center leading-relaxed text-muted-foreground sm:text-base">
                            <p>{text.about.paragraphOne}</p>
                            <p>{text.about.paragraphTwo}</p>
                            <p>{text.about.paragraphThree}</p>
                        </CardContent>
                    </Card>
                </section>
            </MotionReveal>

            <MotionReveal>
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {text.stats.map((stat) => (
                        <Card
                            key={`${stat.label}-${stat.value}`}
                            className="border-foreground/10 bg-card"
                        >
                            <CardContent className="space-y-2 p-5 text-center">
                                <p
                                    className={cn(
                                        "text-muted-foreground",
                                        isRtl
                                            ? "text-sm"
                                            : "text-xs uppercase tracking-[0.14em]",
                                    )}
                                >
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
                    <Card className="border-foreground/10 bg-card">
                        <CardHeader className="text-center">
                            <CardTitle>{text.about.educationTitle}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0 text-center">
                            <div className="space-y-1">
                                <p className="font-semibold-alt text-base">
                                    {text.education.degree}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {text.education.university}
                                </p>
                            </div>
                            <div className="grid gap-2 text-sm text-muted-foreground">
                                <p>
                                    <span className="font-semibold-alt text-foreground">
                                        {text.about.durationLabel}:
                                    </span>{" "}
                                    {text.education.duration}
                                </p>
                                <p>
                                    <span className="font-semibold-alt text-foreground">
                                        {text.about.statusLabel}:
                                    </span>{" "}
                                    {text.education.status}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {text.education.coursework.map((item) => (
                                    <Badge key={item} variant="outline">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-foreground/10 bg-card">
                        <CardHeader className="text-center">
                            <CardTitle>{text.about.principlesTitle}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0 text-center">
                            {text.values.map((value) => (
                                <div
                                    key={`${value.title}-${value.description}`}
                                    className="space-y-1"
                                >
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
