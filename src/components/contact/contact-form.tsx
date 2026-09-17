"use client";

import { AnimatePresence, m } from "framer-motion";
import { useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data/profile";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { MessageCatalog } from "@/lib/i18n/messages";
import { MOTION_DURATION, MOTION_EASE_STANDARD } from "@/lib/motion";

interface ContactFormValues {
    name: string;
    email: string;
    message: string;
}

/*
 * Validation is expressed with react-hook-form's own rules rather than a schema
 * library. The form has three fields and four constraints; zod +
 * @hookform/resolvers cost ~39KB of JS to express that, which was the single
 * largest chunk on the site. The messages still come from the catalog, so both
 * languages stay in sync.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Rules store the *key* of the message, not the translated string.
 *
 * react-hook-form freezes whatever `message` held at the moment validation ran,
 * so passing `text.contact.validation.nameMin` directly left the error frozen in
 * whichever language was active when the field was blurred — switching language
 * afterwards did not retranslate it. Resolving the key at render time keeps the
 * visible error in the current language.
 */
type ValidationKey = keyof MessageCatalog["contact"]["validation"];

function FieldMessage({
    id,
    error,
    validation,
}: {
    id: string;
    error?: FieldError;
    validation: MessageCatalog["contact"]["validation"];
}) {
    const key = error?.message as ValidationKey | undefined;

    return (
        <AnimatePresence initial={false}>
            {key ? (
                <m.p
                    key={key}
                    id={id}
                    role="alert"
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{
                        duration: MOTION_DURATION.fast,
                        ease: MOTION_EASE_STANDARD,
                    }}
                    className="mt-1 overflow-hidden text-xs text-destructive"
                >
                    {validation[key] ?? key}
                </m.p>
            ) : null}
        </AnimatePresence>
    );
}

export function ContactForm() {
    const { text } = useLanguage();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({ mode: "onBlur" });

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name", {
                        required: "nameMin",
                        minLength: {
                            value: 2,
                            message: "nameMin",
                        },
                        maxLength: {
                            value: 40,
                            message: "nameMax",
                        },
                    })}
                />
                <FieldMessage
                    id="name-error"
                    error={errors.name}
                    validation={text.contact.validation}
                />
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
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email", {
                        required: "emailInvalid",
                        pattern: {
                            value: EMAIL_PATTERN,
                            message: "emailInvalid",
                        },
                    })}
                />
                <FieldMessage
                    id="email-error"
                    error={errors.email}
                    validation={text.contact.validation}
                />
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
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message", {
                        required: "messageMin",
                        minLength: {
                            value: 10,
                            message: "messageMin",
                        },
                        maxLength: {
                            value: 2000,
                            message: "messageMax",
                        },
                    })}
                />
                <FieldMessage
                    id="message-error"
                    error={errors.message}
                    validation={text.contact.validation}
                />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? text.contact.submitting : text.contact.submit}
            </Button>
        </form>
    );
}
