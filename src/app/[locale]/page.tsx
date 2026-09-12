import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { featuredProjects, quickStats } from "@/lib/data/portfolio";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { HeroContent } from "@/components/home/hero-content";
import { MotionReveal } from "@/components/shared/motion-reveal";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const text = getMessages(locale);

    return (
        <div>
            <section className="mx-auto flex min-h-[calc(100dvh-var(--nav-height))] max-w-6xl items-center px-5 py-16 sm:px-8">
                <HeroContent locale={locale} text={text} />
            </section>

            <section className="border-t border-border/70">
                <MotionReveal className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
                    {quickStats.map((stat) => (
                        <div key={stat.label}>
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                                {stat.label}
                            </p>
                            <p className="mt-2 text-lg font-medium text-foreground">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </MotionReveal>
            </section>

            <section className="border-t border-border/70">
                <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
                    <MotionReveal className="flex items-end justify-between gap-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            {text.nav.projects}
                        </h2>
                        <Link
                            href={`/${locale}/projects`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {text.hero.seeProjects}
                            <FiArrowUpRight />
                        </Link>
                    </MotionReveal>

                    <MotionReveal
                        delay={0.1}
                        className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
                    >
                        {featuredProjects.slice(0, 4).map((project) => (
                            <Link
                                key={project.slug}
                                href={`/${locale}/projects/${project.slug}`}
                                className="group flex flex-col justify-between gap-6 bg-background p-6 transition-colors hover:bg-card sm:p-8"
                            >
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                                        {project.category}
                                    </p>
                                    <h3 className="mt-3 text-xl font-medium text-foreground">
                                        {project.name}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                    <FiArrowUpRight className="text-base" />
                                </div>
                            </Link>
                        ))}
                    </MotionReveal>
                </div>
            </section>

            <section className="border-t border-border/70">
                <MotionReveal className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                        {text.about.eyebrow}
                    </p>
                    <p className="mt-4 max-w-2xl text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                        {text.about.paragraphOne}
                    </p>
                    <Link
                        href={`/${locale}/about`}
                        className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {text.about.title}
                        <FiArrowUpRight />
                    </Link>
                </MotionReveal>
            </section>
        </div>
    );
}
