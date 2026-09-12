import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { featuredProjects, quickStats } from "@/lib/data/portfolio";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { notFound } from "next/navigation";

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
            <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {text.hero.badge}
                </p>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                    {text.hero.headingLine1}
                </h1>
                <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {text.hero.summary}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Button asChild size="lg">
                        <Link href={`/${locale}/projects`}>
                            {text.hero.seeProjects}
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href={`/${locale}/cv`}>{text.hero.downloadCV}</Link>
                    </Button>
                </div>
                <p className="mt-12 font-mono text-xs text-muted-foreground">
                    {text.hero.stack}
                </p>
            </section>

            <section className="border-t border-border/70">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
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
                </div>
            </section>

            <section className="border-t border-border/70">
                <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
                    <div className="flex items-end justify-between gap-4">
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
                    </div>

                    <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
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
                    </div>
                </div>
            </section>

            <section className="border-t border-border/70">
                <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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
                </div>
            </section>
        </div>
    );
}
