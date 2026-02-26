import { type ReactNode } from "react";
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
    return (
        <div
            className={cn(
                "flex flex-col gap-3",
                align === "center" && "items-center text-center"
            )}
        >
            {eyebrow && (
                <span className="inline-flex w-fit rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {eyebrow}
                </span>
            )}
            <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
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
