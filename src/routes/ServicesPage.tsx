import { type SyntheticEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
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
import { useI18n } from "../i18n/useI18n";

const SERVICE_FALLBACK_IMAGE = "/images/project-fallback.svg";

export default function ServicesPage() {
    const { text } = useI18n();

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

    const handleImageFallback = (event: SyntheticEvent<HTMLImageElement>) => {
        const target = event.currentTarget;
        if (target.dataset.fallbackApplied === "true") {
            return;
        }

        target.dataset.fallbackApplied = "true";
        target.src = SERVICE_FALLBACK_IMAGE;
    };

    return (
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
                                <img
                                    src={serviceImageSrc}
                                    alt={service.imageAlt}
                                    loading="lazy"
                                    decoding="async"
                                    onError={handleImageFallback}
                                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                                />
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
                                        {text.services.orderCta}
                                        <FaWhatsapp className="text-base" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </MotionReveal>
                    );
                })}
            </section>
        </div>
    );
}
