import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-primary/20 text-primary border-primary/40",
    secondary: "bg-secondary text-secondary-foreground border-foreground/10",
    outline: "bg-transparent text-muted-foreground border-foreground/15",
};

export function Badge({
    className,
    variant = "default",
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold-alt uppercase tracking-[0.22em]",
                variantStyles[variant],
                className,
            )}
            {...props}
        />
    );
}
