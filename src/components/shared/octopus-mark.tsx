import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface OctopusMarkProps {
    className?: string;
    /** Which brand form to render. Geometry is identical across variants. */
    form?: "mark" | "lockup" | "stacked" | "made-with-octopus";
    alt?: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
}

/**
 * Brand artwork.
 *
 * This used to render *both* ink variants and let CSS pick one off
 * `data-theme`, because choosing the `src` from React state desynchronized on
 * first paint (the inline theme script set the attribute before hydration while
 * state still held the server default, painting the white-ink mark on a light
 * background).
 *
 * The site is dark-only now, so there is exactly one correct variant and none
 * of that applies: it renders the dark-ink file directly. If a light mode ever
 * comes back, restore the two-image approach rather than branching on state.
 */
export function OctopusMark({
    className,
    form = "mark",
    alt = "The Octopus",
    width,
    height,
    style,
}: OctopusMarkProps) {
    const base = form === "made-with-octopus" ? form : `octopus-${form}`;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`/brand/${base}-dark.svg`}
            alt={alt}
            width={width}
            height={height}
            style={style}
            className={cn(className)}
        />
    );
}
