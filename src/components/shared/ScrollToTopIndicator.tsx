import { useEffect, useMemo, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useI18n } from "../../i18n/useI18n";
import { cn } from "../../lib/utils";

export default function ScrollToTopIndicator() {
    const { text } = useI18n();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const zigzagPath = useMemo(() => {
        const cx = 24;
        const cy = 24;
        const inner = 20;
        const outer = 20;
        const points = 20;
        let d = "";

        for (let i = 0; i < points; i += 1) {
            const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
            const radius = i % 2 === 0 ? outer : inner;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            d += `${i === 0 ? "M" : " L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
        }

        return `${d} Z`;
    }, []);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const scrollTop = window.scrollY;
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            const nextProgress = height > 0 ? scrollTop / height : 0;
            setProgress(nextProgress);
            setVisible(scrollTop > 320);
        };

        const onScroll = () => {
            if (frame) {
                return;
            }
            frame = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <button
            type="button"
            aria-label={text.scrollToTopAria}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
                "scroll-indicator",
                visible ? "scroll-indicator--show" : "scroll-indicator--hide",
            )}
        >
            <svg className="scroll-indicator__ring" viewBox="0 0 48 48">
                <path
                    className="scroll-indicator__track"
                    d={zigzagPath}
                    pathLength={100}
                />
                <path
                    className="scroll-indicator__progress"
                    d={zigzagPath}
                    pathLength={100}
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: 100 - 100 * progress,
                    }}
                />
            </svg>
            <FiArrowUp className="scroll-indicator__icon" />
        </button>
    );
}
