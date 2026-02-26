import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaWhatsapp } from "react-icons/fa";
import { FiGithub, FiMail, FiSend } from "react-icons/fi";
import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { profile } from "../data/portfolio";

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters." })
        .max(40, { message: "Name must be under 40 characters." }),
    email: z
        .string()
        .trim()
        .email({ message: "Please enter a valid email address." }),
    message: z
        .string()
        .trim()
        .min(10, { message: "Message must contain at least 10 characters." })
        .max(1000, { message: "Message is too long." }),
});

type ContactFormData = z.infer<typeof schema>;

const contactWays = [
    {
        label: "Email",
        value: profile.email,
        href: `mailto:${profile.email}`,
        icon: <FiMail />,
    },
    {
        label: "WhatsApp",
        value: "Quick chat",
        href: profile.whatsapp,
        icon: <FaWhatsapp />,
    },
    {
        label: "GitHub",
        value: "@Elliot1MJ",
        href: profile.github,
        icon: <FiGithub />,
    },
] as const;

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: ContactFormData) => {
        const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
        const body = encodeURIComponent(
            [
                `Hi ${profile.shortName},`,
                "",
                `My name: ${data.name}`,
                `My email: ${data.email}`,
                "",
                data.message,
            ].join("\n"),
        );

        const mailtoLink = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, "_blank", "noopener,noreferrer");
        reset();
    };

    return (
        <div className="space-y-10">
            <MotionReveal>
                <SectionHeading
                    eyebrow="Contact"
                    title="Let us build your next project"
                    description="Tell me what you are building, timeline, and goals. I will reply with a clear execution plan."
                />
            </MotionReveal>

            <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <MotionReveal>
                    <Card className="border-white/10 bg-card/45">
                        <CardContent className="p-6 sm:p-7">
                            <form
                                className="space-y-5"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-semibold-alt"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        placeholder="Your name"
                                        autoComplete="name"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-semibold-alt"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-semibold-alt"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Share your project goals, deadline, and required features."
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
                                        ? "Preparing email..."
                                        : "Send message"}
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
                                <Card className="border-white/10 bg-card/40 transition-colors hover:border-primary/35">
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
