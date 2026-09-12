import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { ServiceOrderButton } from "@/components/services/service-order-button";

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) notFound();
    const locale: Locale = rawLocale;
    const text = getMessages(locale);

    return (
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                {text.services.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {text.services.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
                {text.services.description}
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {text.services.cards.map((service) => (
                    <div
                        key={service.title}
                        className="flex flex-col gap-4 bg-background p-6 sm:p-8"
                    >
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-card">
                            <Image
                                src={service.image}
                                alt={service.imageAlt}
                                fill
                                sizes="(min-width: 640px) 45vw, 90vw"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-foreground">
                                {service.title}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {service.description}
                            </p>
                            <p className="mt-3 text-xs text-muted-foreground/80">
                                {service.deliverable}
                            </p>
                        </div>
                        <ServiceOrderButton
                            serviceName={service.title}
                            text={text}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
