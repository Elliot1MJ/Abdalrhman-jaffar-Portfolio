import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/data/portfolio";
import { ProjectDetails } from "@/components/projects/project-details";

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    return <ProjectDetails project={project} />;
}
