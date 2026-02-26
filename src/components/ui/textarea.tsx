import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                "flex min-h-[132px] w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/80 backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";

export { Textarea };
