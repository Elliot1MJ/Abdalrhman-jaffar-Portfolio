import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant =
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
    default:
        "bg-primary/90 text-primary-foreground shadow-[0_16px_40px_-22px_rgba(14,165,233,0.75)] hover:bg-primary focus-visible:ring-ring",
    secondary:
        "bg-secondary/80 text-secondary-foreground hover:bg-secondary/70 focus-visible:ring-ring",
    outline:
        "border border-white/15 bg-white/5 text-foreground hover:bg-white/10 focus-visible:ring-ring",
    ghost:
        "text-foreground hover:bg-white/5 focus-visible:ring-ring",
    link: "text-primary underline-offset-4 hover:underline focus-visible:ring-ring",
    destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive",
};

const sizeStyles: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-lg px-6 text-base",
    icon: "h-10 w-10",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, type = "button", variant = "default", size = "default", ...props },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(
                    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold-alt transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
