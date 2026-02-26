import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import ProjectCard from "../components/shared/ProjectCard";
import SectionHeading from "../components/shared/SectionHeading";
import { Tabs } from "../components/ui/tabs";
import { projects, type PortfolioProject } from "../data/portfolio";

type ProjectFilter = "all" | PortfolioProject["category"];

const filterOptions: { label: string; value: ProjectFilter }[] = [
    { label: "All", value: "all" },
    { label: "JavaScript", value: "javascript" },
    { label: "React", value: "react" },
    { label: "Full Stack", value: "fullstack" },
];

export default function ProjectsPage() {
    const [filter, setFilter] = useState<ProjectFilter>("all");

    const filteredProjects = useMemo(() => {
        if (filter === "all") {
            return projects;
        }

        return projects.filter((project) => project.category === filter);
    }, [filter]);

    return (
        <div className="space-y-9">
            <MotionReveal>
                <SectionHeading
                    eyebrow="Portfolio"
                    title="Projects I shipped"
                    description="Filter by stack and explore live demos and source code. Each card is optimized with lazy image loading and lightweight motion."
                />
            </MotionReveal>

            <MotionReveal>
                <div className="flex justify-start">
                    <Tabs
                        value={filter}
                        onChange={setFilter}
                        options={filterOptions}
                        icon={<FiFilter className="text-xs" />}
                    />
                </div>
            </MotionReveal>

            <m.section layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </m.section>
        </div>
    );
}
