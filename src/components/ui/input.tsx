import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type = "text", ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-xl border border-foreground/15 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
