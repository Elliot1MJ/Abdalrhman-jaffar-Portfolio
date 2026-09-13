import { projects } from "@/lib/data/portfolio";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export default function ProjectsPage() {
    return <ProjectsGrid projects={projects} />;
}
