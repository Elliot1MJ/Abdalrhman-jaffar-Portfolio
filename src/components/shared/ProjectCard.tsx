import {
    useCallback,
    memo,
    useEffect,
    useRef,
    useState,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
    type WheelEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiMinus, FiPlus, FiX } from "react-icons/fi";
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

const PROJECT_FALLBACK_IMAGE = "/images/project-fallback.svg";
const PREVIEW_MIN_ZOOM = 1;
const PREVIEW_MAX_ZOOM = 3;
const PREVIEW_ZOOM_STEP = 0.25;
const loadedPrimaryImages = new Set<string>();

function clampPreviewZoom(value: number) {
    return Math.min(PREVIEW_MAX_ZOOM, Math.max(PREVIEW_MIN_ZOOM, value));
}

function ProjectCardComponent({ project }: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();
    const { getProjectText, text } = useI18n();
    const localized = getProjectText(project.name, project.description);
    const categoryLabel = text.projects.categories[project.category];
    const primaryImage = project.image.trim();
    const [isPrimaryImageLoaded, setIsPrimaryImageLoaded] = useState(() =>
        Boolean(primaryImage && loadedPrimaryImages.has(primaryImage)),
    );
    const [isPrimaryImageError, setIsPrimaryImageError] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
    const isFallbackDecorative = Boolean(primaryImage && !isPrimaryImageError);
    const previewImageSrc =
        primaryImage && !isPrimaryImageError ? primaryImage : PROJECT_FALLBACK_IMAGE;
    const previewLabel = `${localized.name} image preview`;

    useEffect(() => {
        setIsPrimaryImageLoaded(
            Boolean(primaryImage && loadedPrimaryImages.has(primaryImage)),
        );
        setIsPrimaryImageError(false);
    }, [primaryImage]);

    useEffect(() => {
        if (!isPreviewOpen) {
            return;
        }

        setPreviewZoom(PREVIEW_MIN_ZOOM);
        setPreviewPan({ x: 0, y: 0 });
        setPreviewNaturalSize(null);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsPreviewOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isPreviewOpen]);

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

    const openPreview = (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    ) => {
        const targetElement = event.target as HTMLElement;
        if (targetElement.closest("a, button")) {
            return;
        }

        setIsPreviewOpen(true);
    };

    const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPreview(event);
        }
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

    return (
        <>
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
                              transition: { duration: 0.25 },
                          }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                onClick={openPreview}
                onKeyDown={handleCardKeyDown}
                role="button"
                tabIndex={0}
                aria-label={previewLabel}
                className="h-full cursor-pointer rounded-2xl focus-visible:outline-none"
            >
                <Card className="group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-secondary/40">
                        <img
                            src={PROJECT_FALLBACK_IMAGE}
                            alt={isFallbackDecorative ? "" : project.name}
                            aria-hidden={isFallbackDecorative ? true : undefined}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {primaryImage && !isPrimaryImageError && (
                            <img
                                src={primaryImage}
                                alt={project.name}
                                loading="lazy"
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

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isPreviewOpen && (
                            <>
                                <m.div
                                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                                    className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                                    onClick={() => setIsPreviewOpen(false)}
                                />
                                <m.div
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label={previewLabel}
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
                                            onClick={() => setIsPreviewOpen(false)}
                                            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground transition hover:border-primary/70"
                                            aria-label="Close image preview"
                                        >
                                            <FiX className="text-lg" />
                                        </button>
                                        <div
                                            ref={previewViewportRef}
                                            className={`max-h-[85vh] overflow-hidden bg-background ${
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
                                            <img
                                                src={previewImageSrc}
                                                alt={project.name}
                                                loading="eager"
                                                decoding="async"
                                                onLoad={(event) => {
                                                    setPreviewNaturalSize({
                                                        width:
                                                            event.currentTarget
                                                                .naturalWidth,
                                                        height:
                                                            event.currentTarget
                                                                .naturalHeight,
                                                    });
                                                }}
                                                draggable={false}
                                                className="mx-auto block h-auto max-h-[85vh] w-auto max-w-full select-none object-contain transition-transform duration-150"
                                                style={{
                                                    transform: `translate3d(${previewPan.x}px, ${previewPan.y}px, 0) scale(${previewZoom})`,
                                                    transformOrigin:
                                                        "center center",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </m.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </>
    );
}

const ProjectCard = memo(ProjectCardComponent);

export default ProjectCard;
