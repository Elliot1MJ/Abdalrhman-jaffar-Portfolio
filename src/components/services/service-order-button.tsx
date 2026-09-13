"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";

interface ServiceOrderButtonProps {
    serviceName: string;
}

export function ServiceOrderButton({ serviceName }: ServiceOrderButtonProps) {
    const { text } = useLanguage();
    const [details, setDetails] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const sendWhatsapp = () => {
        const t = text.services.whatsappTemplate;
        const message = [
            `${t.requestedServiceLabel}: ${serviceName}`,
            details ? `${t.customerRequestLabel}: ${details}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        const url = `${profile.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noreferrer");
    };

    if (!isOpen) {
        return (
            <Button variant="outline" onClick={() => setIsOpen(true)}>
                {text.services.orderCta}
            </Button>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                    text.services.whatsappTemplate.customerRequestPlaceholder
                }
                rows={3}
            />
            <Button onClick={sendWhatsapp}>{text.services.orderCta}</Button>
        </div>
    );
}
