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
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.98,
                filter: "blur(6px)",
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
            }}
            viewport={{ once, amount: 0.3 }}
            transition={{
                duration: 0.55,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </m.div>
    );
}
