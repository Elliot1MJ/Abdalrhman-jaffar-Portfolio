import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState, type SyntheticEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { profile } from "../data/portfolio";
import {
    MOTION_DURATION,
    MOTION_EASE_STANDARD,
} from "../lib/motion";
import { useI18n } from "../i18n/useI18n";

const SERVICE_FALLBACK_IMAGE = "/images/project-fallback.svg";

export default function ServicesPage() {
    const shouldReduceMotion = useReducedMotion();
    const { text } = useI18n();
    const [previewImage, setPreviewImage] = useState<{
        src: string;
        alt: string;
        title: string;
    } | null>(null);

    const isPreviewOpen = previewImage !== null;

    const openWhatsapp = (service: (typeof text.services.cards)[number]) => {
        const message = [
            text.services.whatsappTemplate.intro,
            `${text.services.whatsappTemplate.serviceLabel}: ${service.title}`,
            `${text.services.whatsappTemplate.descriptionLabel}: ${service.description}`,
            `${text.services.whatsappTemplate.deliverableLabel}: ${service.deliverable}`,
            "",
            text.services.whatsappTemplate.closing,
        ].join("\n");
        const separator = profile.whatsapp.includes("?") ? "&" : "?";
        const whatsappUrl = `${profile.whatsapp}${separator}text=${encodeURIComponent(message)}`;
        const opened = window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer",
        );

        if (!opened) {
            window.location.href = whatsappUrl;
        }
    };

    const openPreview = (service: (typeof text.services.cards)[number]) => {
        const previewSource =
            service.image.trim().length > 0
                ? service.image
                : SERVICE_FALLBACK_IMAGE;
        setPreviewImage({
            src: previewSource,
            alt: service.imageAlt,
            title: service.title,
        });
    };

    const closePreview = () => {
        setPreviewImage(null);
    };

    const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
        const target = event.currentTarget;
        if (target.dataset.fallbackApplied === "true") {
            return;
        }

        target.dataset.fallbackApplied = "true";
        target.src = SERVICE_FALLBACK_IMAGE;
    };

    useEffect(() => {
        if (!isPreviewOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closePreview();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isPreviewOpen]);

    return (
        <>
            <div className="space-y-10">
                <MotionReveal>
                    <SectionHeading
                        eyebrow={text.services.eyebrow}
                        title={text.services.title}
                        description={text.services.description}
                    />
                </MotionReveal>

                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {text.services.cards.map((service) => {
                        const serviceImageSrc =
                            service.image.trim().length > 0
                                ? service.image
                                : SERVICE_FALLBACK_IMAGE;

                        return (
                            <MotionReveal key={service.title}>
                                <Card className="group flex h-full flex-col overflow-hidden border-foreground/10 bg-card">
                                    <button
                                        type="button"
                                        onClick={() => openPreview(service)}
                                        aria-label={`${text.services.openImage}: ${service.title}`}
                                        className="block w-full border-b border-foreground/10 bg-secondary/20"
                                    >
                                        <img
                                            src={serviceImageSrc}
                                            alt={service.imageAlt}
                                            loading="lazy"
                                            decoding="async"
                                            onError={handleImageFallback}
                                            className="aspect-[16/10] w-full object-contain bg-black/5 transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    </button>
                                    <CardHeader className="space-y-2">
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardDescription className="leading-relaxed">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-xs text-muted-foreground">
                                            {service.deliverable}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="mt-auto">
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => openWhatsapp(service)}
                                            aria-label={`${text.services.orderCta}: ${service.title}`}
                                        >
                                            <FaWhatsapp className="text-base" />
                                            {text.services.orderCta}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </MotionReveal>
                        );
                    })}
                </section>
            </div>

            <AnimatePresence>
                {isPreviewOpen && previewImage && (
                    <>
                        <m.div
                            initial={
                                shouldReduceMotion ? false : { opacity: 0 }
                            }
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: shouldReduceMotion
                                    ? 0
                                    : MOTION_DURATION.fast,
                                ease: MOTION_EASE_STANDARD,
                            }}
                            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                            onClick={closePreview}
                        />
                        <m.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={previewImage.title}
                            initial={
                                shouldReduceMotion
                                    ? false
                                    : { opacity: 0, y: 14, scale: 0.98 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                                shouldReduceMotion
                                    ? undefined
                                    : { opacity: 0, y: 14, scale: 0.98 }
                            }
                            transition={{
                                duration: shouldReduceMotion
                                    ? 0
                                    : MOTION_DURATION.base,
                                ease: MOTION_EASE_STANDARD,
                            }}
                            className="fixed inset-0 z-[100] grid place-items-center p-4"
                            onClick={closePreview}
                        >
                            <div
                                className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-foreground/20 bg-background shadow-[0_40px_80px_-36px_rgba(0,0,0,0.9)]"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <button
                                    type="button"
                                    onClick={closePreview}
                                    aria-label={text.services.closePreview}
                                    className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground backdrop-blur transition hover:border-primary/70"
                                >
                                    <FiX />
                                </button>
                                <img
                                    src={previewImage.src}
                                    alt={previewImage.alt}
                                    loading="eager"
                                    decoding="async"
                                    onError={handleImageFallback}
                                    className="max-h-[85vh] w-full bg-black/5 object-contain"
                                />
                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
