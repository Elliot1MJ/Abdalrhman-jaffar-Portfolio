"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's brand surface, take two: eight tentacles reaching out of the dark.
 *
 * `octopus-ribbons.tsx` is deliberately kept alongside this — it is still a
 * valid look and can be swapped back in by changing one import in
 * `hero-content.tsx`. This version trades the abstract flowing bands for
 * something literally shaped like the brand: eight arms radiating from an
 * off-screen body, each tapering, curling, and carrying a row of suckers.
 *
 * How the shape is made (all in the fragment shader, no geometry):
 *
 *  - Each arm is a *distance to a curve*. The curve is a ray from the centre at
 *    a fixed angle, bent by two sine terms whose amplitude grows with distance
 *    along the arm — so it is straight at the root and loose at the tip, which
 *    is how a real tentacle moves.
 *  - Thickness tapers along the same axis, so `dist - thickness` gives a signed
 *    distance field. Smoothstepping that yields the arm's body with a soft edge.
 *  - Suckers are a second field: a sine along the arm's length, masked to the
 *    arm's inner half and faded out toward the tip. They read as texture rather
 *    than as dots, which is what keeps the arm from looking like a tube.
 *
 * The backdrop is purely ambient: it animates on its own and does not react to
 * the pointer at all. The arms used to recoil from the cursor, which made the
 * hero feel grabbable — the owner asked for motion without interaction, so the
 * pointer uniforms and listeners were removed entirely.
 *
 * Cost control matches the ribbons: one fullscreen triangle, one fragment
 * shader, capped at dpr 2, paused when offscreen or backgrounded, and never
 * mounted at all under reduced motion or on a coarse pointer. The arm loop is
 * 8 iterations of cheap trigonometry with no noise/fbm at all, so it is
 * actually lighter per pixel than the 3-octave fbm the ribbons run.
 */

const VERTEX = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const FRAGMENT = /* glsl */ `
    precision mediump float;

    varying vec2 vUv;

    uniform float uTime;
    uniform vec2  uResolution;
    uniform vec3  uInkDark;

    const float PI = 3.14159265;

    // Rotate a point around the origin.
    vec2 rot(vec2 p, float a) {
        float c = cos(a), s = sin(a);
        return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
    }

    /*
     * One arm, in a frame where it runs along +x from the origin.
     *
     * Returns (body, suckers). t is distance along the arm; the curve's
     * lateral offset grows with t so the root stays anchored and the tip
     * swings freely.
     */
    vec2 arm(vec2 p, float seed, float time, float reach, float curlDir) {
        float t = p.x;
        if (t < 0.0) return vec2(0.0);

        /*
         * Curl, not just sway. A constant-ish bend term (growing as t^2) makes
         * the arm coil in one direction the way a real tentacle does, and the
         * two sine terms ride on top of that so the motion never looks periodic.
         */
        float curl = curlDir * t * t * 0.16;
        float sway = sin(t * 2.2 - time * 1.3 + seed * 6.28) * 0.07
                   + sin(t * 1.1 - time * 0.8 + seed * 2.4) * 0.05;
        // Amplitude ramps in along the arm: still at the root, loose at the tip.
        sway *= smoothstep(0.0, 1.0, t);

        float lateral = p.y - sway - curl;

        // Taper: thick at the root, to nothing at the tip.
        float taper = smoothstep(reach, 0.0, t);
        float thickness = 0.028 * taper * taper;

        float d = abs(lateral) - thickness;
        float body = smoothstep(0.018, -0.006, d);
        // Cut the arm off cleanly past its reach.
        body *= step(t, reach);

        /*
         * Suckers: a row of beads along the arm's inner edge. Masked to the
         * inner half (lateral on one side only) and faded near the tip, so
         * they read as the underside of a real arm.
         */
        float beads = sin(t * 60.0 - time * 1.4 + seed * 3.0);
        beads = smoothstep(0.72, 1.0, beads);
        float onArm = smoothstep(thickness, thickness * 0.15, abs(lateral));
        float innerSide = smoothstep(-thickness * 0.2, thickness * 0.6, -lateral);
        float suckers = beads * onArm * innerSide * smoothstep(reach, 0.25, t) * body;

        return vec2(body, suckers);
    }

    void main() {
        vec2 p = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

        float t = uTime * 0.35;

        /*
         * Pointer shoves the whole field away from the cursor — the arms recoil
         * as a group, which reads as the creature reacting rather than as the
         * pixels under the cursor changing.
         */
        /*
         * The arms hang down from above the frame.
         *
         * Each arm gets its own root spread along x rather than all sharing one
         * origin: a single shared centre made them converge to a visible point
         * at the top of the screen, which read as light rays from a lamp rather
         * than as limbs coming down from behind the navbar.
         */
        float aspectRoot = uResolution.x / uResolution.y;

        float body = 0.0;
        float suckers = 0.0;

        // Eight arms, hanging across the lower half.
        for (int i = 0; i < 8; i++) {
            float fi = float(i);
            float seed = fi * 0.37;

            // Roots spread across the top edge, off-frame, and slightly uneven
            // in height so the line of origins is not a visible straight edge.
            float spread = (fi / 7.0 - 0.5) * aspectRoot * 0.95;
            vec2 centre = vec2(spread, 0.60 + fract(seed * 3.1) * 0.16);
            vec2 q = p - centre;

            // Mostly straight down, splaying a little toward the outside so the
            // silhouette opens up instead of falling as parallel stripes.
            float base = -PI * 0.5 + (fi / 7.0 - 0.5) * 0.85;
            // Each arm also drifts slowly around its own base angle.
            float angle = base + sin(t * 0.5 + seed * 5.0) * 0.12;

            // Uneven reach breaks the fan symmetry that read as a plant.
            float reach = 1.15 + fract(seed * 7.3) * 0.75;
            // Alternate the curl direction so the silhouette isn't a swirl.
            float curlDir = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;

            vec2 local = rot(q, -angle);
            vec2 a = arm(local, seed, t, reach, curlDir);

            // max rather than plus: overlapping arms must not sum into a
            // brighter blob where they cross — they are opaque limbs.
            body = max(body, a.x);
            suckers = max(suckers, a.y);
        }

        float ink = body * 0.55 + suckers * 0.30;

        /*
         * No head bloom.
         *
         * It used to add a radial glow at the shared arm origin, which with the
         * geometry inverted sat just under the navbar and read as a small bright
         * disc — visible as a circle in the hero. The roots are spread now, so
         * there is no single point for it to mark.
         */
        /*
         * Fade the arms out inside the canvas, on every side.
         *
         * The radial term alone left a hard horizontal line wherever the canvas
         * box ended, because the arms were still at full strength when they hit
         * it. Each edge now gets its own falloff, so the shader itself is
         * responsible for never touching its own boundary — the CSS mask is
         * then only a refinement, not the thing holding the illusion together.
         */
        float aspect = uResolution.x / uResolution.y;
        float edgeX = smoothstep(aspect * 0.5, aspect * 0.5 - 0.30, abs(p.x));
        // Mirrored with the geometry: the tips now run toward the bottom edge,
        // so that side needs the longer fade and the top (where the body sits
        // off-frame behind the navbar) the shorter one.
        float edgeTop = smoothstep(0.5, 0.24, p.y);
        float edgeBottom = smoothstep(-0.5, -0.26, p.y);
        ink *= edgeX * edgeTop * edgeBottom;

        // Plus the overall radial vignette, so the corners stay clear too.
        ink *= smoothstep(1.35, 0.20, length(p));
        ink = clamp(ink, 0.0, 1.0);

        // Same treatment as the ribbons: brand violet on dark grounds, darker
        // violet ink on light ones, so both themes carry equal weight.
        // Dark-only site: one ink, one ceiling. This used to mix toward a
        // light-mode ink driven by a uIsLight uniform.
        vec3 color = uInkDark;
        float ceiling = 0.50;
        float alpha = ink * ceiling;

        gl_FragColor = vec4(color * alpha, alpha);
    }
`;

interface OctopusTentaclesProps {
    className?: string;
}

export function OctopusTentacles({ className }: OctopusTentaclesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        // A coarse pointer means no cursor to react to, and usually a weaker
        // GPU — the static backdrops are the better trade there.
        const coarse = window.matchMedia("(pointer: coarse)");

        const update = () => setIsEnabled(!reduced.matches && !coarse.matches);
        update();

        reduced.addEventListener("change", update);
        coarse.addEventListener("change", update);
        return () => {
            reduced.removeEventListener("change", update);
            coarse.removeEventListener("change", update);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!isEnabled || !container) return;

        let cleanup: (() => void) | undefined;
        let disposed = false;

        (async () => {
            const { Renderer, Program, Mesh, Triangle, Vec2, Vec3 } = await import("ogl");
            if (disposed) return;

            let renderer;
            try {
                renderer = new Renderer({
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: false,
                    dpr: Math.min(window.devicePixelRatio, 2),
                    powerPreference: "high-performance",
                });
            } catch {
                return; // No WebGL — the static backdrops stay.
            }

            const gl = renderer.gl;
            gl.canvas.style.width = "100%";
            gl.canvas.style.height = "100%";
            gl.canvas.style.display = "block";
            container.appendChild(gl.canvas);

            const program = new Program(gl, {
                vertex: VERTEX,
                fragment: FRAGMENT,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uResolution: { value: new Vec2(1, 1) },
                    // spark-400 #9581EC for dark grounds.
                    uInkDark: { value: new Vec3(0.584, 0.506, 0.925) },
                },
            });

            const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

            const resize = () => {
                const { clientWidth, clientHeight } = container;
                if (!clientWidth || !clientHeight) return;
                renderer.setSize(clientWidth, clientHeight);
                program.uniforms.uResolution.value.set(clientWidth, clientHeight);
            };

            const sizeObserver = new ResizeObserver(resize);
            sizeObserver.observe(container);
            resize();

            let isVisible = true;
            const visibilityObserver = new IntersectionObserver(
                ([entry]) => {
                    isVisible = entry.isIntersecting;
                },
                { threshold: 0 },
            );
            visibilityObserver.observe(container);

            let frame = 0;
            let lastTime = performance.now();

            const loop = (now: number) => {
                frame = requestAnimationFrame(loop);
                const delta = Math.min((now - lastTime) / 1000, 0.05);
                lastTime = now;

                if (!isVisible || document.hidden) return;

                program.uniforms.uTime.value += delta;

                renderer.render({ scene: mesh });
            };

            frame = requestAnimationFrame(loop);

            cleanup = () => {
                cancelAnimationFrame(frame);
                sizeObserver.disconnect();
                visibilityObserver.disconnect();
                gl.canvas.remove();
                gl.getExtension("WEBGL_lose_context")?.loseContext();
            };
        })();

        return () => {
            disposed = true;
            cleanup?.();
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return <div ref={containerRef} aria-hidden className={className} />;
}
