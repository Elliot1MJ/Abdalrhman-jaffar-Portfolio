import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/lib/data/portfolio";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getMessages, getProjectText } from "@/lib/i18n/get-messages";
import { MotionReveal } from "@/components/shared/motion-reveal";

export function generateStaticParams() {
    return locales.flatMap((locale) =>
        projects.map((project) => ({ locale, slug: project.slug })),
    );
}

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const text = getMessages(locale);

    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const localized = getProjectText(
        locale,
        project.name,
        project.description,
        project.codeSummary,
    );

    return (
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <FiArrowLeft />
                {text.projects.details.back}
            </Link>

            <MotionReveal>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                    {text.projects.categories[project.category]}
                </p>
                <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {localized.name}
                </h1>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                    {project.timeline}
                </p>
            </MotionReveal>

            <MotionReveal
                delay={0.1}
                className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border"
            >
                <Image
                    src={project.image}
                    alt={localized.name}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                    priority
                />
            </MotionReveal>

            <MotionReveal delay={0.15} className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr]">
                <div>
                    <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {text.projects.details.aboutTitle}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-foreground">
                        {localized.description}
                    </p>
                    <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {localized.codeSummary}
                    </p>
                </div>

                <div>
                    <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {text.projects.details.linksTitle}
                    </h2>
                    <div className="mt-4 flex flex-col gap-3">
                        {project.liveUrl && (
                            <Button asChild variant="outline">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FiExternalLink />
                                    {text.projects.actions.live}
                                </a>
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button asChild variant="outline">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FiGithub />
                                    {text.projects.actions.github}
                                </a>
                            </Button>
                        )}
                    </div>

                    <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Stack
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </MotionReveal>

            {project.productionSections.map((section, index) => (
                <MotionReveal
                    key={section.key}
                    delay={Math.min(index * 0.05, 0.2)}
                    className="mt-16"
                >
                    <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {section.title}
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {section.images.map((image) => (
                            <div
                                key={image}
                                className="relative aspect-video overflow-hidden rounded-xl border border-border"
                            >
                                <Image
                                    src={image}
                                    alt={`${localized.name} ${section.title}`}
                                    fill
                                    sizes="(min-width: 640px) 45vw, 90vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </MotionReveal>
            ))}
        </div>
    );
}
