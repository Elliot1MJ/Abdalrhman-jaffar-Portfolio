import { type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </m.div>
    );
}
