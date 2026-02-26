import { memo } from "react";
import { m, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { PortfolioProject } from "../../data/portfolio";
import { useI18n } from "../../i18n/useI18n";
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
    const { getProjectText, text } = useI18n();
    const localized = getProjectText(project.name, project.description);
    const categoryLabel = text.projects.categories[project.category];

    return (
        <m.article
            layout
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50, scale: 0.97 }}
            whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                          y: -10,
                          scale: 1.02,
                          transition: { duration: 0.25 },
                      }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="h-full"
        >
            <Card className="group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-secondary/40">
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
                        {categoryLabel}
                    </Badge>
                </div>

                <CardHeader className="pb-3 text-center">
                    <CardTitle className="text-xl">{localized.name}</CardTitle>
                    <CardDescription className="leading-relaxed">
                        {localized.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap justify-center gap-2 pb-5">
                    {project.stack.map((item) => (
                        <Badge key={`${project.name}-${item}`} variant="outline">
                            {item}
                        </Badge>
                    ))}
                </CardContent>

                {(project.githubUrl || project.liveUrl) && (
                    <CardFooter className="mt-auto justify-center gap-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full"
                            >
                                <Button variant="outline" className="w-full">
                                    <FiGithub className="text-base" />
                                    {text.projects.actions.github}
                                </Button>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full"
                            >
                                <Button className="w-full">
                                    <FiExternalLink className="text-base" />
                                    {text.projects.actions.live}
                                </Button>
                            </a>
                        )}
                    </CardFooter>
                )}
            </Card>
        </m.article>
    );
}

const ProjectCard = memo(ProjectCardComponent);

export default ProjectCard;
