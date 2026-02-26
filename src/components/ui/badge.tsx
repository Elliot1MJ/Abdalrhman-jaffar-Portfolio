import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-primary/15 text-primary border-primary/40",
    secondary: "bg-white/5 text-secondary-foreground border-white/10",
    outline: "bg-transparent text-muted-foreground border-white/10",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold-alt",
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
}
