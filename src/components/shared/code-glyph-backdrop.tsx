const GLYPHS = [
    "<>",
    "{}",
    "=>",
    ";",
    "()",
    "[]",
    "//",
    "&&",
    "==",
    "#!",
    "</>",
    "::",
];

interface GlyphSpec {
    glyph: string;
    top: string;
    left: string;
    size: number;
    rotate: number;
    opacity: number;
}

function seededGlyphs(count: number, seedStart: number): GlyphSpec[] {
    let seed = seedStart;
    const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    return Array.from({ length: count }, (_, index) => ({
        glyph: GLYPHS[index % GLYPHS.length],
        top: `${(random() * 97 + 1).toFixed(2)}%`,
        left: `${(random() * 96 + 2).toFixed(2)}%`,
        size: Math.round(random() * 22 + 14),
        rotate: Math.round(random() * 30 - 15),
        opacity: Number((random() * 0.05 + 0.035).toFixed(3)),
    }));
}

interface CodeGlyphBackdropProps {
    count?: number;
    seed?: number;
}

export function CodeGlyphBackdrop({
    count = 40,
    seed = 42,
}: CodeGlyphBackdropProps = {}) {
    const glyphSpecs = seededGlyphs(count, seed);

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {glyphSpecs.map((spec, index) => (
                <span
                    key={index}
                    className="absolute font-mono font-semibold text-foreground select-none"
                    style={{
                        top: spec.top,
                        left: spec.left,
                        fontSize: `${spec.size}px`,
                        opacity: spec.opacity,
                        transform: `rotate(${spec.rotate}deg)`,
                    }}
                >
                    {spec.glyph}
                </span>
            ))}
        </div>
    );
}
