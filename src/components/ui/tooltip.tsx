"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { MOTION_EASE_EMPHASIS } from "@/lib/motion";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipTrigger = TooltipPrimitive.Trigger;

/*
 * The animation is framer-driven, not CSS.
 *
 * This used to be `data-[state=delayed-open]:animate-tooltip-in` against a
 * hand-written `.animate-tooltip-in` keyframe rule in globals.css. That silently
 * did nothing: Tailwind v4 only emits a variant for a utility it knows about,
 * and `animate-tooltip-in` is not one of its utilities, so the variant selector
 * was never generated at all. The bare class *was* present in the built
 * stylesheet, which is why inspecting it suggested the CSS was fine — verified
 * against the live DOM, the element carried the class string and still computed
 * `animation-name: none`.
 *
 * Driving it from framer removes the dependency on Tailwind emitting anything,
 * and `forceMount` + AnimatePresence is what lets the exit actually run — Radix
 * unmounts the content the instant it closes otherwise.
 */
const Tooltip = ({
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>) => {
    const [open, setOpen] = React.useState(defaultOpen ?? false);
    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : open;

    const handleOpenChange = React.useCallback(
        (next: boolean) => {
            if (!isControlled) setOpen(next);
            onOpenChange?.(next);
        },
        [isControlled, onOpenChange],
    );

    return (
        <TooltipPrimitive.Root
            {...props}
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <TooltipOpenContext.Provider value={isOpen}>
                {children}
            </TooltipOpenContext.Provider>
        </TooltipPrimitive.Root>
    );
};

const TooltipOpenContext = React.createContext(false);

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, children, ...props }, ref) => {
    const isOpen = React.useContext(TooltipOpenContext);
    const reduceMotion = useReducedMotion();

    return (
        <AnimatePresence>
            {isOpen ? (
                <TooltipPrimitive.Portal forceMount>
                    <TooltipPrimitive.Content
                        ref={ref}
                        sideOffset={sideOffset}
                        asChild
                        // Above the fixed header (z-[60]), which used to clip it.
                        className={cn("z-[90]", className)}
                        {...props}
                    >
                        <m.div
                            initial={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.92, y: 4 }
                            }
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.96, y: 3 }
                            }
                            transition={{
                                duration: reduceMotion ? 0 : 0.18,
                                ease: MOTION_EASE_EMPHASIS,
                            }}
                            // Scaling from the edge nearest the trigger reads as the
                            // tooltip growing out of the button rather than appearing
                            // on top of it. Radix publishes the resolved side here.
                            style={{
                                transformOrigin:
                                    "var(--radix-tooltip-content-transform-origin, center)",
                            }}
                            className="overflow-hidden rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-md"
                        >
                            {children}
                        </m.div>
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            ) : null}
        </AnimatePresence>
    );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
