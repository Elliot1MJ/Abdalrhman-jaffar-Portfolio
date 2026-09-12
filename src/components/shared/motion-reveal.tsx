"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface MotionRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <m.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay }}
        >
            {children}
        </m.div>
    );
}
