import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type PointerEvent,
    type WheelEvent,
} from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
    FiChevronLeft,
    FiChevronRight,
    FiExternalLink,
    FiGithub,
    FiMinus,
    FiPlus,
    FiX,
} from "react-icons/fi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import FooterSection from "../components/FooterSection";
import NavigationBar from "../components/NavigationBar";
import ScrollToTopIndicator from "../components/shared/ScrollToTopIndicator";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { getProjectBySlug } from "../data/portfolio";
import { applyProjectSeoTags, applySeoTags } from "../i18n/seo";
import { useI18n } from "../i18n/useI18n";

type GalleryKind = "main" | "project" | "code";
const PREVIEW_MIN_ZOOM = 1;
const PREVIEW_MAX_ZOOM = 3;
const PREVIEW_ZOOM_STEP = 0.25;
const PREVIEW_FLIP_OFFSET = 110;
const PREVIEW_FLIP_ROTATION = 1.4;

function clampPreviewZoom(value: number) {
    return Math.min(PREVIEW_MAX_ZOOM, Math.max(PREVIEW_MIN_ZOOM, value));
}

export default function ProjectDetailsPage() {
    const shouldReduceMotion = useReducedMotion();
    const navigate = useNavigate();
    const { projectSlug } = useParams<{ projectSlug: string }>();
    const { getProjectText, isRtl, text } = useI18n();
    const project = useMemo(
        () => (projectSlug ? getProjectBySlug(projectSlug) : undefined),
        [projectSlug],
    );
    const localized = useMemo(
        () =>
            project
                ? getProjectText(
                      project.name,
                      project.description,
                      project.codeSummary,
                  )
                : null,
        [getProjectText, project],
    );
    const [previewState, setPreviewState] = useState<{
        kind: GalleryKind;
        index: number;
    } | null>(null);
    const [previewDirection, setPreviewDirection] = useState(0);
    const [previewZoom, setPreviewZoom] = useState(PREVIEW_MIN_ZOOM);
    const [previewPan, setPreviewPan] = useState({ x: 0, y: 0 });
    const [isPreviewDragging, setIsPreviewDragging] = useState(false);
    const [previewNaturalSize, setPreviewNaturalSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const previewViewportRef = useRef<HTMLDivElement | null>(null);
    const previewDragRef = useRef<{
        pointerId: number;
        startX: number;
        startY: number;
        panX: number;
        panY: number;
    } | null>(null);
    const projectGalleryImages = project ? project.gallery : [];
    const codeGalleryImages =
        project && project.codeGallery.length
            ? project.codeGallery
            : projectGalleryImages;
    const mainPreviewImages = project ? [project.image] : [];
    const previewImages =
        previewState?.kind === "main"
            ? mainPreviewImages
            : previewState?.kind === "code"
            ? codeGalleryImages
            : projectGalleryImages;
    const isPreviewOpen = previewState !== null;

    const clampPreviewPan = useCallback(
        (x: number, y: number) => {
            if (!previewNaturalSize || !previewViewportRef.current) {
                return { x: 0, y: 0 };
            }

            const viewportWidth = previewViewportRef.current.clientWidth;
            const viewportHeight = previewViewportRef.current.clientHeight;
            if (!viewportWidth || !viewportHeight) {
                return { x: 0, y: 0 };
            }

            const baseContainScale = Math.min(
                viewportWidth / previewNaturalSize.width,
                viewportHeight / previewNaturalSize.height,
            );
            const fittedWidth = previewNaturalSize.width * baseContainScale;
            const fittedHeight = previewNaturalSize.height * baseContainScale;
            const zoomedWidth = fittedWidth * previewZoom;
            const zoomedHeight = fittedHeight * previewZoom;

            const maxX = Math.max((zoomedWidth - viewportWidth) / 2, 0);
            const maxY = Math.max((zoomedHeight - viewportHeight) / 2, 0);

            return {
                x: Math.min(maxX, Math.max(-maxX, x)),
                y: Math.min(maxY, Math.max(-maxY, y)),
            };
        },
        [previewNaturalSize, previewZoom],
    );

    const closePreview = () => {
        setPreviewState(null);
    };

    const openPreview = (kind: GalleryKind, index: number) => {
        setPreviewDirection(0);
        setPreviewState({ kind, index });
    };

    const showPreviousPreviewImage = () => {
        if (!previewImages.length) {
            return;
        }

        setPreviewDirection(-1);
        setPreviewState((current) => {
            if (!current) {
                return null;
            }
            return {
                ...current,
                index:
                    (current.index - 1 + previewImages.length) %
                    previewImages.length,
            };
        });
    };

    const showNextPreviewImage = () => {
        if (!previewImages.length) {
            return;
        }

        setPreviewDirection(1);
        setPreviewState((current) => {
            if (!current) {
                return null;
            }
            return {
                ...current,
                index: (current.index + 1) % previewImages.length,
            };
        });
    };

    const zoomInPreview = () => {
        setPreviewZoom((current) =>
            clampPreviewZoom(current + PREVIEW_ZOOM_STEP),
        );
    };

    const zoomOutPreview = () => {
        setPreviewZoom((current) =>
            clampPreviewZoom(current - PREVIEW_ZOOM_STEP),
        );
    };

    const handlePreviewWheel = (event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.deltaY < 0) {
            zoomInPreview();
            return;
        }

        zoomOutPreview();
    };

    const handlePreviewPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (previewZoom <= PREVIEW_MIN_ZOOM) {
            return;
        }

        event.preventDefault();
        const target = event.currentTarget;
        target.setPointerCapture(event.pointerId);
        previewDragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            panX: previewPan.x,
            panY: previewPan.y,
        };
        setIsPreviewDragging(true);
    };

    const handlePreviewPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!previewDragRef.current) {
            return;
        }

        const movementX = event.clientX - previewDragRef.current.startX;
        const movementY = event.clientY - previewDragRef.current.startY;
        const nextPan = clampPreviewPan(
            previewDragRef.current.panX + movementX,
            previewDragRef.current.panY + movementY,
        );
        setPreviewPan(nextPan);
    };

    const endPreviewPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
        if (!previewDragRef.current) {
            return;
        }

        const dragPointerId = previewDragRef.current.pointerId;
        previewDragRef.current = null;
        setIsPreviewDragging(false);
        if (event.currentTarget.hasPointerCapture(dragPointerId)) {
            event.currentTarget.releasePointerCapture(dragPointerId);
        }
    };

    useEffect(() => {
        setPreviewState(null);
        setPreviewDirection(0);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [project?.slug]);

    useEffect(() => {
        if (!isPreviewOpen) {
            return;
        }

        setPreviewZoom(PREVIEW_MIN_ZOOM);
        setPreviewPan({ x: 0, y: 0 });
        setIsPreviewDragging(false);
        setPreviewNaturalSize(null);
        previewDragRef.current = null;
    }, [isPreviewOpen, previewState?.kind, previewState?.index]);

    useEffect(() => {
        if (!isPreviewOpen) {
            return;
        }

        setPreviewPan((currentPan) => {
            const clampedPan = clampPreviewPan(currentPan.x, currentPan.y);
            if (
                clampedPan.x === currentPan.x &&
                clampedPan.y === currentPan.y
            ) {
                return currentPan;
            }

            return clampedPan;
        });
    }, [clampPreviewPan, isPreviewOpen, previewNaturalSize, previewZoom]);

    useEffect(() => {
        if (!isPreviewOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPreviewState(null);
                return;
            }

            if (previewImages.length <= 1) {
                return;
            }

            if (event.key === "ArrowRight") {
                setPreviewDirection(1);
                setPreviewState((current) => {
                    if (!current) {
                        return current;
                    }
                    return {
                        ...current,
                        index: (current.index + 1) % previewImages.length,
                    };
                });
                return;
            }

            if (event.key === "ArrowLeft") {
                setPreviewDirection(-1);
                setPreviewState((current) => {
                    if (!current) {
                        return current;
                    }
                    return {
                        ...current,
                        index:
                            (current.index - 1 + previewImages.length) %
                            previewImages.length,
                    };
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPreviewOpen, previewImages.length]);

    useEffect(() => {
        if (!project || !localized) {
            return;
        }

        const projectPath = `/projects/${project.slug}`;
        const projectUrl =
            typeof window === "undefined"
                ? projectPath
                : new URL(projectPath, window.location.origin).toString();
        const projectImage =
            typeof window === "undefined"
                ? project.image
                : new URL(project.image, window.location.origin).toString();
        const description =
            `${localized.description} ${localized.codeSummary}`.trim();
        const keywordList = [
            localized.name,
            project.name,
            project.category,
            ...project.stack,
            "Frontend Developer",
            "Portfolio Project",
        ];
        const projectSchema: Record<string, unknown> = {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: localized.name,
            headline: localized.name,
            description,
            inLanguage: isRtl ? "ar" : "en",
            author: {
                "@type": "Person",
                name: "Abdalrhman Mohammed Jaffar",
            },
            url: projectUrl,
            image: projectImage,
            genre: project.category,
            keywords: keywordList,
        };
        const sameAs = [project.liveUrl, project.githubUrl].filter(Boolean);
        if (sameAs.length) {
            projectSchema.sameAs = sameAs;
        }

        applyProjectSeoTags({
            title: `${localized.name} | ${text.profile.shortName}`,
            description,
            keywords: keywordList.join(", "),
            locale: text.seo.locale,
            localeAlternate: text.seo.localeAlternate,
            image: project.image,
            url: projectPath,
            ogTitle: `${localized.name} - ${text.profile.shortName}`,
            ogDescription: localized.description,
            schema: projectSchema,
        });

        return () => {
            applySeoTags(text);
        };
    }, [isRtl, localized, project, text]);

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate("/#projects");
    };

    if (!project) {
        return <Navigate to="/" replace />;
    }

    if (!localized) {
        return <Navigate to="/" replace />;
    }
    const categoryLabel = text.projects.categories[project.category];
    const isCodePreview = previewState?.kind === "code";
    const activePreviewIndex = previewState?.index ?? 0;
    const activePreviewImage = previewImages[activePreviewIndex];
    const hasSplitProductionSections = project.productionSections.length > 1;
    let sectionStartIndex = 0;
    const productionSectionBlocks = project.productionSections.map((section) => {
        const nextSection = {
            ...section,
            startIndex: sectionStartIndex,
        };
        sectionStartIndex += section.images.length;
        return nextSection;
    });
    const previewAnimationVariants = {
        enter: (direction: number) => ({
            opacity: 0,
            x:
                direction === 0
                    ? 0
                    : direction > 0
                      ? PREVIEW_FLIP_OFFSET
                      : -PREVIEW_FLIP_OFFSET,
            scale: 0.96,
            rotate:
                direction === 0
                    ? 0
                    : direction > 0
                      ? -PREVIEW_FLIP_ROTATION
                      : PREVIEW_FLIP_ROTATION,
            filter: "blur(8px)",
        }),
        center: { opacity: 1, x: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
        exit: (direction: number) => ({
            opacity: 0,
            x:
                direction === 0
                    ? 0
                    : direction > 0
                      ? -PREVIEW_FLIP_OFFSET
                      : PREVIEW_FLIP_OFFSET,
            scale: 0.96,
            rotate:
                direction === 0
                    ? 0
                    : direction > 0
                      ? PREVIEW_FLIP_ROTATION
                      : -PREVIEW_FLIP_ROTATION,
            filter: "blur(8px)",
        }),
    };
    const projectOverviewLine = isRtl
        ? `تم تنفيذ هذا المشروع خلال الفترة ${project.timeline} باستخدام ${project.stack.join("، ")} مع التركيز على تنظيم بنية الواجهة وسهولة التوسّع.`
        : `This project was delivered during ${project.timeline} using ${project.stack.join(", ")} with a focus on scalable structure and maintainable frontend architecture.`;

    return (
        <div className="page-shell min-h-screen bg-background text-foreground">
            <div
                aria-hidden
                className="home-grid-bg pointer-events-none absolute inset-0 z-0"
            />

            <div className="relative z-10">
                <NavigationBar mode="details" onBack={goBack} />

                <m.main
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
                    className="mx-auto w-[90%] max-w-none space-y-8 px-4 pb-16 pt-6 sm:px-6 sm:pt-8"
                >
                    <div className="text-4xl font-display leading-tight text-foreground sm:text-5xl lg:text-6xl">
                        {localized.name}
                    </div>
                    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <Card className="overflow-hidden border-foreground/15 bg-card/50">
                            <button
                                type="button"
                                onClick={() => openPreview("main", 0)}
                                aria-label={`${text.projects.details.openImage} 1`}
                                className="group block h-full w-full"
                            >
                                <img
                                    src={project.image}
                                    alt={localized.name}
                                    loading="eager"
                                    decoding="async"
                                    className="h-full max-h-[560px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </button>
                        </Card>

                        <div className="space-y-4">
                            <Card className="border-foreground/15 bg-card/60">
                                <CardContent className="space-y-4 p-5 sm:p-6">
                                    <h2 className="font-semibold-alt text-lg uppercase tracking-[0.12em] text-foreground">
                                        {text.projects.details.aboutTitle}
                                    </h2>
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {localized.description}
                                    </p>
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {localized.codeSummary}
                                    </p>
                                    <p className="text-sm leading-relaxed text-muted-foreground/90 sm:text-base">
                                        {projectOverviewLine}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-foreground/15 bg-card/60">
                                <CardContent className="space-y-4 p-5 sm:p-6">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">
                                            {project.timeline}
                                        </Badge>
                                        <Badge variant="outline">
                                            {categoryLabel}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((item) => (
                                            <Badge
                                                key={`${project.slug}-${item}`}
                                                variant="outline"
                                            >
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>

                                    {(project.githubUrl || project.liveUrl) && (
                                        <div className="space-y-3 border-t border-foreground/12 pt-4">
                                            <h3 className="text-xs font-semibold-alt uppercase tracking-[0.2em] text-muted-foreground">
                                                {
                                                    text.projects.details
                                                        .linksTitle
                                                }
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex"
                                                    >
                                                        <Button>
                                                            <FiExternalLink className="text-base" />
                                                            {
                                                                text.projects
                                                                    .actions
                                                                    .live
                                                            }
                                                        </Button>
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex"
                                                    >
                                                        <Button variant="outline">
                                                            <FiGithub className="text-base" />
                                                            {
                                                                text.projects
                                                                    .actions
                                                                    .github
                                                            }
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-foreground sm:text-4xl">
                            {text.projects.details.galleryTitle}
                        </h2>

                        {hasSplitProductionSections ? (
                            <div className="space-y-6">
                                {productionSectionBlocks.map((section) => (
                                    <div
                                        key={`${project.slug}-${section.key}`}
                                        className="space-y-3"
                                    >
                                        <h3 className="font-semibold-alt text-sm uppercase tracking-[0.14em] text-muted-foreground">
                                            {section.title}
                                        </h3>
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {section.images.map((image, index) => (
                                                <button
                                                    key={`${project.slug}-${section.key}-${index}`}
                                                    type="button"
                                                    onClick={() =>
                                                        openPreview(
                                                            "project",
                                                            section.startIndex +
                                                                index,
                                                        )
                                                    }
                                                    aria-label={`${text.projects.details.openImage} ${section.startIndex + index + 1}`}
                                                    className="group aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/15 bg-card/50 transition hover:border-primary/60"
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${text.projects.details.imageAlt} ${section.startIndex + index + 1}`}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {projectGalleryImages.map((image, index) => (
                                    <button
                                        key={`${project.slug}-gallery-${index}`}
                                        type="button"
                                        onClick={() =>
                                            openPreview("project", index)
                                        }
                                        aria-label={`${text.projects.details.openImage} ${index + 1}`}
                                        className="group aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/15 bg-card/50 transition hover:border-primary/60"
                                    >
                                        <img
                                            src={image}
                                            alt={`${text.projects.details.imageAlt} ${index + 1}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <h3 className="font-display text-3xl uppercase tracking-[0.08em] text-foreground sm:text-4xl">
                            {text.projects.details.codeGalleryTitle}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {codeGalleryImages.map((image, index) => (
                                <button
                                    key={`${project.slug}-code-gallery-${index}`}
                                    type="button"
                                    onClick={() => openPreview("code", index)}
                                    aria-label={`${text.projects.details.openImage} ${index + 1}`}
                                    className="group aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/15 bg-card/50 transition hover:border-primary/60"
                                >
                                    <img
                                        src={image}
                                        alt={`${text.projects.details.imageAlt} ${index + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                </button>
                            ))}
                        </div>
                    </section>
                </m.main>

                <ScrollToTopIndicator />
                <FooterSection />
            </div>

            <AnimatePresence>
                {isPreviewOpen && activePreviewImage && (
                    <>
                        <m.div
                            initial={
                                shouldReduceMotion ? false : { opacity: 0 }
                            }
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.2,
                            }}
                            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                            onClick={closePreview}
                        />
                        <m.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${localized.name} ${
                                isCodePreview
                                    ? text.projects.details.codeGalleryTitle
                                    : text.projects.details.galleryTitle
                            }`}
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 20, scale: 0.98 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: 0, y: 20, scale: 0.98 }
                            }
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.22,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="fixed inset-0 z-[100] grid place-items-center p-4"
                        >
                            <div
                                className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-foreground/20 bg-background shadow-[0_40px_80px_-36px_rgba(0,0,0,0.9)]"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-foreground/20 bg-background/85 p-1.5 backdrop-blur">
                                    <button
                                        type="button"
                                        onClick={zoomOutPreview}
                                        disabled={
                                            previewZoom <= PREVIEW_MIN_ZOOM
                                        }
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:border-primary/70 disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Zoom out image"
                                    >
                                        <FiMinus className="text-sm" />
                                    </button>
                                    <span className="min-w-12 text-center text-xs font-semibold-alt uppercase tracking-[0.12em] text-foreground">
                                        {Math.round(previewZoom * 100)}%
                                    </span>
                                    <button
                                        type="button"
                                        onClick={zoomInPreview}
                                        disabled={
                                            previewZoom >= PREVIEW_MAX_ZOOM
                                        }
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:border-primary/70 disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Zoom in image"
                                    >
                                        <FiPlus className="text-sm" />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={closePreview}
                                    className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground transition hover:border-primary/70"
                                    aria-label={
                                        text.projects.details.closePreview
                                    }
                                >
                                    <FiX className="text-lg" />
                                </button>

                                <button
                                    type="button"
                                    onClick={showPreviousPreviewImage}
                                    disabled={previewImages.length <= 1}
                                    className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground transition hover:border-primary/70 disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label={
                                        text.projects.details.previousImage
                                    }
                                >
                                    <FiChevronLeft className="text-lg" />
                                </button>

                                <button
                                    type="button"
                                    onClick={showNextPreviewImage}
                                    disabled={previewImages.length <= 1}
                                    className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground transition hover:border-primary/70 disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label={text.projects.details.nextImage}
                                >
                                    <FiChevronRight className="text-lg" />
                                </button>

                                <div
                                    ref={previewViewportRef}
                                    className={`max-h-[82vh] overflow-hidden bg-background ${
                                        previewZoom > PREVIEW_MIN_ZOOM
                                            ? isPreviewDragging
                                                ? "cursor-grabbing"
                                                : "cursor-grab"
                                            : "cursor-default"
                                    }`}
                                    onWheel={handlePreviewWheel}
                                    onPointerDown={handlePreviewPointerDown}
                                    onPointerMove={handlePreviewPointerMove}
                                    onPointerUp={endPreviewPointerDrag}
                                    onPointerCancel={endPreviewPointerDrag}
                                    style={{
                                        touchAction:
                                            previewZoom > PREVIEW_MIN_ZOOM
                                                ? "none"
                                                : "auto",
                                    }}
                                >
                                    <AnimatePresence
                                        initial={false}
                                        mode="wait"
                                        custom={previewDirection}
                                    >
                                        <m.div
                                            key={`${previewState?.kind ?? "project"}-${activePreviewIndex}-${activePreviewImage}`}
                                            custom={previewDirection}
                                            variants={previewAnimationVariants}
                                            initial={
                                                shouldReduceMotion
                                                    ? false
                                                    : "enter"
                                            }
                                            animate="center"
                                            exit={
                                                shouldReduceMotion
                                                    ? undefined
                                                    : "exit"
                                            }
                                            transition={{
                                                x: shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          type: "spring",
                                                          stiffness: 270,
                                                          damping: 30,
                                                          mass: 0.8,
                                                      },
                                                opacity: shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          duration: 0.22,
                                                          ease: [0.22, 1, 0.36, 1],
                                                      },
                                                scale: shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          duration: 0.22,
                                                          ease: [0.22, 1, 0.36, 1],
                                                      },
                                                rotate: shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          duration: 0.22,
                                                          ease: [0.22, 1, 0.36, 1],
                                                      },
                                                filter: shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : {
                                                          duration: 0.2,
                                                          ease: [0.22, 1, 0.36, 1],
                                                      },
                                            }}
                                            className="mx-auto flex max-h-[82vh] w-full items-center justify-center will-change-transform"
                                        >
                                            <img
                                                src={activePreviewImage}
                                                alt={`${text.projects.details.imageAlt} ${activePreviewIndex + 1}`}
                                                loading="eager"
                                                decoding="async"
                                                onLoad={(event) => {
                                                    setPreviewNaturalSize({
                                                        width: event
                                                            .currentTarget
                                                            .naturalWidth,
                                                        height: event
                                                            .currentTarget
                                                            .naturalHeight,
                                                    });
                                                }}
                                                draggable={false}
                                                className="mx-auto block h-auto max-h-[82vh] w-auto max-w-full select-none object-contain transition-transform duration-150"
                                                style={{
                                                    transform: `translate3d(${previewPan.x}px, ${previewPan.y}px, 0) scale(${previewZoom})`,
                                                    transformOrigin:
                                                        "center center",
                                                }}
                                            />
                                        </m.div>
                                    </AnimatePresence>
                                </div>

                                <div className="border-t border-foreground/15 px-4 py-3 text-center text-xs font-semibold-alt uppercase tracking-[0.18em] text-muted-foreground">
                                    {activePreviewIndex + 1} /{" "}
                                    {previewImages.length}
                                </div>
                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
