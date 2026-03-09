import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiSend } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { profile } from "../data/portfolio";
import { useI18n } from "../i18n/useI18n";

type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

export default function ContactPage() {
    const { text } = useI18n();

    const schema = useMemo(
        () =>
            z.object({
                name: z
                    .string()
                    .trim()
                    .min(2, { message: text.contact.validation.nameMin })
                    .max(40, { message: text.contact.validation.nameMax }),
                email: z
                    .string()
                    .trim()
                    .email({ message: text.contact.validation.emailInvalid }),
                message: z
                    .string()
                    .trim()
                    .min(10, { message: text.contact.validation.messageMin })
                    .max(1000, { message: text.contact.validation.messageMax }),
            }),
        [text.contact.validation],
    );

    const contactWays = useMemo(
        () => [
            {
                label: text.contact.ways.whatsappLabel,
                value: text.contact.ways.whatsappValue,
                href: profile.whatsapp,
                icon: <FaWhatsapp />,
            },
            {
                label: text.contact.ways.instagramLabel,
                value: text.contact.ways.instagramValue,
                href: profile.instagram,
                icon: <FaInstagram />,
            },
            {
                label: text.contact.ways.emailLabel,
                value: profile.email,
                href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    profile.email,
                )}`,
                icon: <FiMail />,
            },
        ],
        [
            text.contact.ways.emailLabel,
            text.contact.ways.gitlabLabel,
            text.contact.ways.gitlabValue,
            text.contact.ways.instagramLabel,
            text.contact.ways.instagramValue,
            text.contact.ways.whatsappLabel,
            text.contact.ways.whatsappValue,
        ],
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: ContactFormData) => {
        const subject = encodeURIComponent(
            `${text.contact.emailTemplate.subjectPrefix} ${data.name}`,
        );
        const body = encodeURIComponent(
            [
                `${text.contact.emailTemplate.greeting} ${text.profile.shortName},`,
                "",
                `${text.contact.emailTemplate.myName}: ${data.name}`,
                `${text.contact.emailTemplate.myEmail}: ${data.email}`,
                "",
                data.message,
            ].join("\n"),
        );

        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            profile.email,
        )}&su=${subject}&body=${body}`;
        const opened = window.open(gmailLink, "_blank", "noopener,noreferrer");
        if (!opened) {
            window.location.href = gmailLink;
        }
        reset();
    };

    return (
        <div className="space-y-10">
            <MotionReveal>
                <SectionHeading
                    eyebrow={text.contact.eyebrow}
                    title={text.contact.title}
                    description={text.contact.description}
                />
            </MotionReveal>

            <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <MotionReveal>
                    <Card className="border-foreground/10 bg-card">
                        <CardContent className="p-6 sm:p-7">
                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="space-y-2 flex flex-col items-start gap-0.5">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-semibold-alt"
                                    >
                                        {text.contact.fields.name}
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder={
                                            text.contact.placeholders.name
                                        }
                                        autoComplete="name"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 flex flex-col items-start gap-0.5">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-semibold-alt"
                                    >
                                        {text.contact.fields.email}
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={
                                            text.contact.placeholders.email
                                        }
                                        autoComplete="email"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 flex flex-col items-start gap-0.5">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-semibold-alt"
                                    >
                                        {text.contact.fields.message}
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder={
                                            text.contact.placeholders.message
                                        }
                                        {...register("message")}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-destructive">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    <FiSend />
                                    {isSubmitting
                                        ? text.contact.submitting
                                        : text.contact.submit}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </MotionReveal>

                <MotionReveal>
                    <div className="flex flex-col gap-2">
                        {contactWays.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Card className="border-foreground/10 bg-card transition-colors hover:border-primary/35">
                                    <CardContent className="flex items-start gap-2">
                                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-semibold-alt">
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {item.value}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </MotionReveal>
            </section>
        </div>
    );
}
