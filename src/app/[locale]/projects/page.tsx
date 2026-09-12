import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages, getProjectText } from "@/lib/i18n/get-messages";
import { projects } from "@/lib/data/portfolio";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const text = getMessages(locale);

    const localizedProjects = projects.map((project) => ({
        ...project,
        ...getProjectText(
            locale,
            project.name,
            project.description,
            project.codeSummary,
        ),
    }));

    return (
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                {text.projects.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {text.projects.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
                {text.projects.description}
            </p>

            <ProjectsGrid
                locale={locale}
                text={text}
                projects={localizedProjects}
            />
        </div>
    );
}
