import { memo } from "react";
import { m, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { PortfolioProject } from "../../data/portfolio";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface ProjectCardProps {
    project: PortfolioProject;
}

function ProjectCardComponent({ project }: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <m.article
            layout
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={
                shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
            }
            className="h-full"
        >
            <Card className="group flex h-full flex-col overflow-hidden border-white/10 bg-card/45">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-secondary/30">
                    <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3 bg-background/90 text-[11px] uppercase tracking-[0.1em]"
                    >
                        {project.category}
                    </Badge>
                </div>

                <CardHeader className="pb-3 text-center">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="leading-relaxed">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap justify-center gap-2 pb-5">
                    {project.stack.map((item) => (
                        <Badge key={`${project.name}-${item}`} variant="outline">
                            {item}
                        </Badge>
                    ))}
                </CardContent>

                <CardFooter className="mt-auto justify-center gap-2">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                    >
                        <Button variant="outline" className="w-full">
                            <FiGithub className="text-base" />
                            GitHub
                        </Button>
                    </a>
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                    >
                        <Button className="w-full">
                            <FiExternalLink className="text-base" />
                            Live
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </m.article>
    );
}

const ProjectCard = memo(ProjectCardComponent);

export default ProjectCard;
