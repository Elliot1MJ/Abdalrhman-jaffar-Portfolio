import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import ProjectCard from "../components/shared/ProjectCard";
import SectionHeading from "../components/shared/SectionHeading";
import { Tabs } from "../components/ui/tabs";
import { useI18n } from "../i18n/useI18n";
import {
    featuredProjects,
    projects,
} from "../data/portfolio";

type ProjectFilter = "featured" | "all";

export default function ProjectsPage() {
    const { text } = useI18n();
    const [filter, setFilter] = useState<ProjectFilter>("featured");
    const filterOptions: { label: string; value: ProjectFilter }[] = useMemo(
        () => [
            { label: text.projects.filters.featured, value: "featured" },
            { label: text.projects.filters.all, value: "all" },
        ],
        [text.projects.filters.all, text.projects.filters.featured],
    );

    const filteredProjects = useMemo(() => {
        if (filter === "featured") {
            return featuredProjects.slice(0, 3);
        }

        return projects;
    }, [filter]);

    return (
        <div className="space-y-9">
            <MotionReveal>
                <SectionHeading
                    eyebrow={text.projects.eyebrow}
                    title={text.projects.title}
                    description={text.projects.description}
                />
            </MotionReveal>

            <MotionReveal>
                <div className="flex justify-start">
                    <Tabs
                        value={filter}
                        onChange={setFilter}
                        options={filterOptions}
                        ariaLabel={text.projects.filtersAria}
                        icon={<FiFilter className="text-xs" />}
                    />
                </div>
            </MotionReveal>

            <m.section
                layout
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </m.section>
        </div>
    );
}
