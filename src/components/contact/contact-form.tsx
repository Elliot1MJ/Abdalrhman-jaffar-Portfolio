"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data/profile";
import type { MessageCatalog } from "@/lib/i18n/messages";

interface ContactFormProps {
    text: MessageCatalog;
}

function buildSchema(text: MessageCatalog) {
    return z.object({
        name: z
            .string()
            .min(2, text.contact.validation.nameMin)
            .max(40, text.contact.validation.nameMax),
        email: z.string().email(text.contact.validation.emailInvalid),
        message: z
            .string()
            .min(10, text.contact.validation.messageMin)
            .max(2000, text.contact.validation.messageMax),
    });
}

type ContactFormValues = z.infer<ReturnType<typeof buildSchema>>;

export function ContactForm({ text }: ContactFormProps) {
    const schema = buildSchema(text);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (values: ContactFormValues) => {
        const t = text.contact.emailTemplate;
        const subject = `${t.subjectPrefix} ${values.name}`;
        const body = [
            `${t.greeting} ${profile.shortName},`,
            "",
            values.message,
            "",
            `${t.myName}: ${values.name}`,
            `${t.myEmail}: ${values.email}`,
        ].join("\n");

        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label
                    htmlFor="name"
                    className="text-xs font-medium text-muted-foreground"
                >
                    {text.contact.fields.name}
                </label>
                <Input
                    id="name"
                    className="mt-1.5"
                    placeholder={text.contact.placeholders.name}
                    {...register("name")}
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="text-xs font-medium text-muted-foreground"
                >
                    {text.contact.fields.email}
                </label>
                <Input
                    id="email"
                    type="email"
                    className="mt-1.5"
                    placeholder={text.contact.placeholders.email}
                    {...register("email")}
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="text-xs font-medium text-muted-foreground"
                >
                    {text.contact.fields.message}
                </label>
                <Textarea
                    id="message"
                    className="mt-1.5"
                    rows={5}
                    placeholder={text.contact.placeholders.message}
                    {...register("message")}
                />
                {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                        {errors.message.message}
                    </p>
                )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? text.contact.submitting : text.contact.submit}
            </Button>
        </form>
    );
}
