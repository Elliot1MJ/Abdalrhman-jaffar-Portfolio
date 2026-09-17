"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's brand surface: flowing ink ribbons that drift and bend toward the
 * pointer. Replaces the earlier `octopus-field`, which had two real problems:
 *
 *  1. **It rebuilt the entire WebGL context on every theme toggle** — its effect
 *     listed `theme` as a dependency, so switching themes tore down the renderer,
 *     the program and the GL context and built them again. That is the "used
 *     wrongly" part. Here the theme is a *uniform*, updated in place by a
 *     `MutationObserver` on `data-theme`. The context is created exactly once.
 *  2. **It was invisible in light mode** — it drew pale violet fog at 0.16 alpha
 *     on a near-white ground. Here light mode draws *dark* ink instead, so the
 *     ribbons read with the same confidence in both themes.
 *
 * Ribbons instead of fog: distinct flowing bands have real silhouette, so they
 * survive being drawn faintly. The fog only read as a grey smear.
 *
 * Cost control: one fullscreen triangle, one fragment shader, 3 fbm octaves,
 * capped at dpr 2. Pauses entirely when offscreen or backgrounded, and never
 * mounts at all under reduced motion or on a coarse pointer.
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
    uniform vec2  uPointer;
    uniform float uPointerStrength;
    uniform float uIsLight;
    uniform vec3  uInkDark;
    uniform vec3  uInkLight;

    vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453123) * 2.0 - 1.0;
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
            mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
            mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
            u.y);
    }

    // Three octaves is enough for ribbons and a third cheaper than five.
    float fbm(vec2 p) {
        float total = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 3; i++) {
            total += noise(p) * amplitude;
            p *= 2.05;
            amplitude *= 0.5;
        }
        return total;
    }

    void main() {
        vec2 p = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

        float t = uTime * 0.05;

        // Pointer pushes the flow aside, like a hand through water.
        vec2 toPointer = p - uPointer;
        float d2 = dot(toPointer, toPointer);
        float pointerFalloff = exp(-d2 * 3.0) * uPointerStrength;
        p += normalize(toPointer + 1e-5) * pointerFalloff * 0.12;

        // One warp pass, then stack sine bands through it. The warp is what
        // stops the bands reading as plain stripes.
        vec2 warp = vec2(fbm(p * 1.9 + vec2(0.0, t)),
                         fbm(p * 1.9 + vec2(3.7, -t)));

        float ink = 0.0;
        for (int i = 0; i < 3; i++) {
            float fi = float(i);
            // Each ribbon runs at its own angle, speed and thickness.
            float angle = 0.7 + fi * 0.5;
            vec2 dir = vec2(cos(angle), sin(angle));
            float band = dot(p + warp * 0.55, dir) * 5.5 + t * (1.2 + fi * 0.45);
            // Sharpen the sine into a filament with a tight core. A high
            // exponent is what separates "ribbons" from "fog" — at low values
            // the bands overlap into an undifferentiated smear.
            float ribbon = 1.0 - abs(sin(band));
            ribbon = pow(ribbon, 11.0);
            ink += ribbon * (0.85 - fi * 0.16);
        }

        ink += pointerFalloff * 0.30;

        // Keep the edges clear so page text always wins.
        float radius = length(p);
        ink *= smoothstep(1.25, 0.15, radius);
        ink = clamp(ink, 0.0, 1.0);

        // Light mode uses dark ink on the light ground; dark mode uses the brand
        // violet. Both land at a comparable perceived weight, which is what the
        // old single-color version could not do.
        vec3 color = mix(uInkDark, uInkLight, uIsLight);
        float ceiling = mix(0.70, 0.42, uIsLight);
        float alpha = ink * ceiling;

        gl_FragColor = vec4(color * alpha, alpha);
    }
`;

interface OctopusRibbonsProps {
    className?: string;
}

export function OctopusRibbons({ className }: OctopusRibbonsProps) {
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

            const readIsLight = () =>
                document.documentElement.getAttribute("data-theme") === "light"
                    ? 1
                    : 0;

            const program = new Program(gl, {
                vertex: VERTEX,
                fragment: FRAGMENT,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uResolution: { value: new Vec2(1, 1) },
                    uPointer: { value: new Vec2(0, 0) },
                    uPointerStrength: { value: 0 },
                    uIsLight: { value: readIsLight() },
                    // spark-400 #9581EC for dark grounds.
                    uInkDark: { value: new Vec3(0.584, 0.506, 0.925) },
                    // spark-700 #4C39A0 for light grounds — dark enough to read
                    // against `white`, still unmistakably the brand violet.
                    uInkLight: { value: new Vec3(0.298, 0.224, 0.627) },
                },
            });

            const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

            /*
             * The whole point of the rewrite: the theme is a uniform that gets
             * written in place. No teardown, no context loss, no re-upload of
             * the program — toggling the theme costs one float assignment.
             */
            const themeObserver = new MutationObserver(() => {
                program.uniforms.uIsLight.value = readIsLight();
            });
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["data-theme"],
            });

            const resize = () => {
                const { clientWidth, clientHeight } = container;
                if (!clientWidth || !clientHeight) return;
                renderer.setSize(clientWidth, clientHeight);
                program.uniforms.uResolution.value.set(clientWidth, clientHeight);
            };

            const sizeObserver = new ResizeObserver(resize);
            sizeObserver.observe(container);
            resize();

            const target = { x: 0, y: 0, strength: 0 };
            const current = { x: 0, y: 0, strength: 0 };

            const onPointerMove = (event: PointerEvent) => {
                const rect = container.getBoundingClientRect();
                const nx = (event.clientX - rect.left) / rect.width;
                const ny = (event.clientY - rect.top) / rect.height;
                if (nx < 0 || nx > 1 || ny < 0 || ny > 1) {
                    target.strength = 0;
                    return;
                }
                target.x = (nx - 0.5) * (rect.width / rect.height);
                target.y = 1 - ny - 0.5;
                target.strength = 1;
            };

            const onPointerLeave = () => {
                target.strength = 0;
            };

            window.addEventListener("pointermove", onPointerMove, { passive: true });
            window.addEventListener("pointerleave", onPointerLeave, { passive: true });

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

                const ease = 1 - Math.pow(0.002, delta);
                current.x += (target.x - current.x) * ease;
                current.y += (target.y - current.y) * ease;
                current.strength += (target.strength - current.strength) * ease;

                program.uniforms.uTime.value += delta;
                program.uniforms.uPointer.value.set(current.x, current.y);
                program.uniforms.uPointerStrength.value = current.strength;

                renderer.render({ scene: mesh });
            };

            frame = requestAnimationFrame(loop);

            cleanup = () => {
                cancelAnimationFrame(frame);
                themeObserver.disconnect();
                sizeObserver.disconnect();
                visibilityObserver.disconnect();
                window.removeEventListener("pointermove", onPointerMove);
                window.removeEventListener("pointerleave", onPointerLeave);
                gl.canvas.remove();
                gl.getExtension("WEBGL_lose_context")?.loseContext();
            };
        })();

        return () => {
            disposed = true;
            cleanup?.();
        };
        // Deliberately NOT depending on theme — see the MutationObserver above.
    }, [isEnabled]);

    if (!isEnabled) return null;

    return <div ref={containerRef} aria-hidden className={className} />;
}
