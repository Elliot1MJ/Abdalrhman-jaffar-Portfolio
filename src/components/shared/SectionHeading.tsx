import { type ReactNode } from "react";
import { useI18n } from "../../i18n/useI18n";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    action?: ReactNode;
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
    action,
}: SectionHeadingProps) {
    const { isRtl } = useI18n();

    return (
        <div
            className={cn(
                "flex flex-col gap-3",
                align === "center" && "items-center text-center"
            )}
        >
            {eyebrow && (
                <span
                    className={cn(
                        "inline-flex w-fit rounded-full border border-foreground/15 bg-transparent px-3 py-1 text-muted-foreground",
                        isRtl
                            ? "text-sm"
                            : "text-[11px] uppercase tracking-[0.3em]",
                    )}
                >
                    {eyebrow}
                </span>
            )}
            <h2 className="font-display text-4xl leading-[0.95] text-foreground sm:text-5xl">
                {title}
            </h2>
            {description && (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                </p>
            )}
            {action}
        </div>
    );
}
