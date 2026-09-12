import Image from "next/image";
import { notFound } from "next/navigation";
import { skillGroups } from "@/lib/data/portfolio";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import myPic from "@/assets/images/myPic.jpg";

export default async function AboutPage({
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
            <div className="flex flex-wrap items-start justify-between gap-8">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                        {text.about.eyebrow}
                    </p>
                    <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        {text.about.title}
                    </h1>
                </div>
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border sm:h-24 sm:w-24">
                    <Image
                        src={myPic}
                        alt={text.profile.fullName}
                        fill
                        sizes="96px"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
                <div className="space-y-6 text-base leading-relaxed text-foreground">
                    <p>{text.about.paragraphOne}</p>
                    <p>{text.about.paragraphTwo}</p>
                    <p>{text.about.paragraphThree}</p>
                </div>

                <div className="space-y-10">
                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {text.about.educationTitle}
                        </h2>
                        <p className="mt-3 text-sm font-medium text-foreground">
                            {text.education.degree}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {text.education.university}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {text.education.duration}
                        </p>
                    </div>

                    <div>
                        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {text.about.principlesTitle}
                        </h2>
                        <ul className="mt-3 space-y-4">
                            {text.values.map((value) => (
                                <li key={value.title}>
                                    <p className="text-sm font-medium text-foreground">
                                        {value.title}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {value.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    Skills
                </h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-3">
                    {skillGroups.map((group) => (
                        <div key={group.title}>
                            <p className="text-sm font-medium text-foreground">
                                {group.title}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
