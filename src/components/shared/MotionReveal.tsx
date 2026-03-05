import { type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
    MOTION_DURATION,
    MOTION_EASE_EMPHASIS,
    SECTION_REVEAL_ENTER,
    SECTION_REVEAL_INITIAL,
} from "../../lib/motion";
import { cn } from "../../lib/utils";

interface MotionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    once?: boolean;
}

export default function MotionReveal({
    children,
    className,
    delay = 0,
    once = true,
}: MotionRevealProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <m.div
            className={cn(className)}
            initial={SECTION_REVEAL_INITIAL}
            whileInView={SECTION_REVEAL_ENTER}
            viewport={{ once, amount: 0.3 }}
            transition={{
                duration: MOTION_DURATION.slow,
                delay,
                ease: MOTION_EASE_EMPHASIS,
            }}
        >
            {children}
        </m.div>
    );
}
