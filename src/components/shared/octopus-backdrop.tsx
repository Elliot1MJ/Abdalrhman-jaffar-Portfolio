"use client";

import { useTheme } from "@/components/providers/theme-provider";

interface MarkSpec {
    top: string;
    left: string;
    size: number;
    rotate: number;
    opacity: number;
    flip: boolean;
}

function seededMarks(count: number, seedStart: number): MarkSpec[] {
    let seed = seedStart;
    const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    return Array.from({ length: count }, () => ({
        top: `${(random() * 90 + 4).toFixed(2)}%`,
        left: `${(random() * 88 + 4).toFixed(2)}%`,
        size: Math.round(random() * 140 + 90),
        rotate: Math.round(random() * 40 - 20),
        opacity: Number((random() * 0.025 + 0.02).toFixed(3)),
        flip: random() > 0.5,
    }));
}

interface OctopusBackdropProps {
    count?: number;
    seed?: number;
}

export function OctopusBackdrop({
    count = 3,
    seed = 7,
}: OctopusBackdropProps = {}) {
    const { theme } = useTheme();
    const markSpecs = seededMarks(count, seed);

    const logoSrc =
        theme === "light"
            ? "/brand/octopus-mark-light.svg"
            : "/brand/octopus-mark-dark.svg";

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            {markSpecs.map((spec, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={index}
                    src={logoSrc}
                    alt=""
                    className="absolute select-none"
                    style={{
                        top: spec.top,
                        left: spec.left,
                        width: `${spec.size}px`,
                        opacity: spec.opacity,
                        transform: `rotate(${spec.rotate}deg) scaleX(${spec.flip ? -1 : 1})`,
                    }}
                />
            ))}
        </div>
    );
}
