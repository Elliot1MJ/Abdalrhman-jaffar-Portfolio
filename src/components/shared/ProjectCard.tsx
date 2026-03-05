import {
    memo,
    useEffect,
    useState,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import { m, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiInfo } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
    getProjectDetailsPath,
    type PortfolioProject,
} from "../../data/portfolio";
import { useI18n } from "../../i18n/useI18n";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    MOTION_EASE_STANDARD,
} from "../../lib/motion";
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

const PROJECT_FALLBACK_IMAGE = "/images/project-fallback.svg";
const loadedPrimaryImages = new Set<string>();

function ProjectCardComponent({ project }: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();
    const { getProjectText, text } = useI18n();
    const localized = getProjectText(
        project.name,
        project.description,
        project.codeSummary,
    );
    const categoryLabel = text.projects.categories[project.category];
    const primaryImage = project.image.trim();
    const [isPrimaryImageLoaded, setIsPrimaryImageLoaded] = useState(() =>
        Boolean(primaryImage && loadedPrimaryImages.has(primaryImage)),
    );
    const [isPrimaryImageError, setIsPrimaryImageError] = useState(false);
    const isFallbackDecorative = Boolean(primaryImage && !isPrimaryImageError);

    useEffect(() => {
        setIsPrimaryImageLoaded(
            Boolean(primaryImage && loadedPrimaryImages.has(primaryImage)),
        );
        setIsPrimaryImageError(false);
    }, [primaryImage]);

    const openProjectDetails = (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    ) => {
        const targetElement = event.target as HTMLElement;
        if (targetElement.closest("a, button")) {
            return;
        }

        navigate(getProjectDetailsPath(project.slug));
    };

    const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectDetails(event);
        }
    };

    return (
        <m.article
            layout
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50, scale: 0.97 }}
            whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{
                duration: shouldReduceMotion ? 0 : MOTION_DURATION.slow,
                ease: MOTION_EASE_EMPHASIS,
            }}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                          y: -8,
                          transition: {
                              duration: MOTION_DURATION.fast,
                              ease: MOTION_EASE_STANDARD,
                          },
                      }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={openProjectDetails}
            onKeyDown={handleCardKeyDown}
            role="link"
            tabIndex={0}
            aria-label={`${text.projects.actions.details}: ${localized.name}`}
            className="h-full cursor-pointer rounded-2xl focus-visible:outline-none"
        >
            <Card className="group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-secondary/40">
                    <img
                        src={PROJECT_FALLBACK_IMAGE}
                        alt={isFallbackDecorative ? "" : project.name}
                        aria-hidden={isFallbackDecorative ? true : undefined}
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {primaryImage && !isPrimaryImageError && (
                        <img
                            src={primaryImage}
                            alt={project.name}
                            loading="lazy"
                            fetchPriority="low"
                            decoding="async"
                            onLoad={() => {
                                loadedPrimaryImages.add(primaryImage);
                                setIsPrimaryImageLoaded(true);
                            }}
                            onError={() => {
                                setIsPrimaryImageError(true);
                                setIsPrimaryImageLoaded(false);
                            }}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                                isPrimaryImageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}
                    <Badge
                        variant="secondary"
                        className="absolute right-3 top-3 bg-background/90 text-[11px] uppercase tracking-[0.1em]"
                    >
                        {categoryLabel}
                    </Badge>
                </div>

                <CardHeader className="pb-3 text-center">
                    <CardTitle className="text-xl">{localized.name}</CardTitle>
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/80">
                        {project.timeline}
                    </p>
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

                <CardFooter className="mt-auto flex-col gap-2">
                    <Link
                        to={getProjectDetailsPath(project.slug)}
                        onClick={(event) => event.stopPropagation()}
                        className="w-full"
                    >
                        <Button className="w-full">
                            <FiInfo className="text-base" />
                            {text.projects.actions.details}
                        </Button>
                    </Link>

                    {(project.githubUrl || project.liveUrl) && (
                        <div className="flex w-full justify-center gap-2">
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
                        </div>
                    )}
                </CardFooter>
            </Card>
        </m.article>
    );
}

const ProjectCard = memo(ProjectCardComponent);

export default ProjectCard;
