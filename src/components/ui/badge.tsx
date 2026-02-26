import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-primary/20 text-primary border-primary/40",
    secondary: "bg-secondary text-secondary-foreground border-border/90",
    outline: "bg-transparent text-muted-foreground border-border/80",
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
