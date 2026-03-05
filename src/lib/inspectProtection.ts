import error403Illustration from "../assets/images/403.svg";

const DEVTOOLS_EDGE_THRESHOLD = 150;
const DEVTOOLS_CHECK_INTERVAL_MS = 650;
const DEVTOOLS_HIT_LIMIT = 1;
const DEVTOOLS_DEBUGGER_LAG_MS = 130;
const BLOCKER_ID = "inspect-protection-overlay";
const BLOCKER_STYLE_ID = "inspect-protection-style";
const PROTECTION_FLAG = "__inspectProtectionEnabled__";

declare global {
    interface Window {
        [PROTECTION_FLAG]?: boolean;
    }
}

function isShortcutBlocked(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const ctrlOrMeta = event.ctrlKey || event.metaKey;

    if (event.key === "F12") {
        return true;
    }

    if (ctrlOrMeta && event.shiftKey && ["i", "j", "c"].includes(key)) {
        return true;
    }

    if (ctrlOrMeta && key === "u") {
        return true;
    }

    return false;
}

function isCoarsePointerDevice() {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function isDevToolsLikelyOpen() {
    const widthGap = window.outerWidth - window.innerWidth;
    const heightGap = window.outerHeight - window.innerHeight;

    return (
        widthGap > DEVTOOLS_EDGE_THRESHOLD ||
        heightGap > DEVTOOLS_EDGE_THRESHOLD
    );
}

function isDebuggerLagDetected() {
    const start = performance.now();

    try {
        Function("debugger")();
    } catch {
        return false;
    }

    return performance.now() - start > DEVTOOLS_DEBUGGER_LAG_MS;
}

function ensureProtectionStyles() {
    if (document.getElementById(BLOCKER_STYLE_ID)) {
        return;
    }

    const style = document.createElement("style");
    style.id = BLOCKER_STYLE_ID;
    style.textContent = `
        #${BLOCKER_ID} {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: grid;
            place-items: center;
            padding: 16px;
            overflow: hidden;
            color: #f4f4f5;
            font-family: "Space Grotesk", "Cairo", "Poppins", "Trebuchet MS", sans-serif;
            text-align: center;
            background:
                radial-gradient(100% 70% at 50% -15%, rgba(168, 85, 247, 0.2), transparent 60%),
                radial-gradient(65% 55% at 85% 105%, rgba(168, 85, 247, 0.14), transparent 70%),
                radial-gradient(55% 45% at 10% 95%, rgba(168, 85, 247, 0.1), transparent 70%),
                linear-gradient(180deg, #0b0b10 0%, #0a0a0f 46%, rgba(11, 11, 16, 0.98) 100%);
        }

        #${BLOCKER_ID}::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image:
                linear-gradient(to right, rgba(244, 244, 245, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(244, 244, 245, 0.08) 1px, transparent 1px);
            background-size: 56px 56px;
            opacity: 0.34;
        }

        #${BLOCKER_ID} .inspect-wrap {
            position: relative;
            width: min(92vw, 880px);
            max-height: 96vh;
            overflow: hidden;
        }

        #${BLOCKER_ID} .inspect-card {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(244, 244, 245, 0.14);
            border-radius: 32px;
            padding: clamp(20px, 4vw, 34px);
            background:
                radial-gradient(120% 90% at 50% -20%, rgba(168, 85, 247, 0.2), transparent 56%),
                linear-gradient(160deg, rgba(20, 20, 28, 0.88) 0%, rgba(10, 10, 16, 0.92) 100%);
            box-shadow:
                0 40px 90px -60px rgba(0, 0, 0, 0.95),
                inset 0 1px 0 rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(8px);
        }

        #${BLOCKER_ID} .inspect-brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        #${BLOCKER_ID} .inspect-brand-mark {
            width: 34px;
            height: 34px;
            border-radius: 999px;
            border: 1px solid rgba(244, 244, 245, 0.24);
            display: grid;
            place-items: center;
            background: rgba(11, 11, 16, 0.75);
            color: #f4f4f5;
            font-size: 14px;
            line-height: 1;
        }

        #${BLOCKER_ID} .inspect-brand-text {
            text-align: left;
            line-height: 1.05;
        }

        #${BLOCKER_ID} .inspect-brand-text span {
            display: block;
        }

        #${BLOCKER_ID} .inspect-brand-eyebrow {
            font-size: 10px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(212, 212, 216, 0.72);
        }

        #${BLOCKER_ID} .inspect-brand-name {
            margin-top: 3px;
            font-size: 13px;
            color: #f4f4f5;
            font-weight: 600;
        }

        #${BLOCKER_ID} .inspect-figure {
            width: min(74vw, 480px);
            margin-inline: auto;
            display: block;
            object-fit: contain;
            border: none;
            border-radius: 0;
            background: transparent;
            filter:
                hue-rotate(-22deg)
                saturate(1.22)
                contrast(1.06)
                brightness(0.94)
                drop-shadow(0 24px 38px rgba(92, 57, 186, 0.3));
        }

        #${BLOCKER_ID} .inspect-code {
            margin: 14px 0 8px;
            font-size: clamp(56px, 12vw, 110px);
            line-height: 0.9;
            letter-spacing: 0.04em;
            font-weight: 700;
            text-transform: uppercase;
            color: #f4f4f5;
        }

        #${BLOCKER_ID} .inspect-title {
            margin: 0;
            font-size: clamp(22px, 4vw, 44px);
            line-height: 1.1;
            font-weight: 700;
            color: #d4d4d8;
        }

        #${BLOCKER_ID} .inspect-hint {
            margin: 12px auto 0;
            max-width: 580px;
            font-size: clamp(13px, 2vw, 18px);
            line-height: 1.6;
            color: rgba(161, 161, 170, 0.95);
        }

        #${BLOCKER_ID} .inspect-actions {
            margin-top: 18px;
            display: flex;
            justify-content: center;
        }

        #${BLOCKER_ID} .inspect-btn {
            border: 1px solid rgba(244, 244, 245, 0.2);
            border-radius: 999px;
            padding: 10px 18px;
            font-size: 13px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            font-weight: 700;
            color: #f4f4f5;
            background: linear-gradient(135deg, rgba(168, 85, 247, 0.65) 0%, rgba(111, 43, 230, 0.7) 100%);
            box-shadow: 0 16px 28px -18px rgba(168, 85, 247, 0.8);
            cursor: pointer;
            transition: transform 140ms ease, filter 140ms ease;
        }

        #${BLOCKER_ID} .inspect-btn:hover {
            transform: translateY(-1px);
            filter: brightness(1.06);
        }

        #${BLOCKER_ID} .inspect-btn:active {
            transform: translateY(0);
        }

        #${BLOCKER_ID} .inspect-alert {
            margin: 12px 0 0;
            font-size: 12px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(212, 212, 216, 0.76);
        }
    `;

    document.head.appendChild(style);
}

function mountProtectionOverlay() {
    if (document.getElementById(BLOCKER_ID)) {
        return;
    }

    ensureProtectionStyles();

    const isArabic =
        document.documentElement.lang.startsWith("ar") ||
        document.documentElement.dir === "rtl";
    const copy = isArabic
        ? {
              eyebrow: "تنبيه أمني",
              title: "تم حظر الوصول",
              hint: "تم اكتشاف فتح أدوات المطوّر، لذلك تم إيقاف عرض الصفحة لحماية محتوى الموقع وملفاته. أغلق أدوات المطوّر ثم أعد تحميل الصفحة من المتصفح.",
              action: "أغلقت أدوات المطوّر",
          }
        : {
              eyebrow: "Security Notice",
              title: "Access Blocked",
              hint: "Developer tools were detected, so page rendering was paused to protect this website's source and assets. Close DevTools, then reload from your browser.",
              action: "I Closed DevTools",
          };

    const overlay = document.createElement("div");
    overlay.id = BLOCKER_ID;
    overlay.setAttribute("role", "alert");
    overlay.innerHTML = `
        <main class="inspect-wrap" aria-live="assertive">
            <section class="inspect-card">
                <div class="inspect-brand">
                    <span class="inspect-brand-mark">&lt;/&gt;</span>
                    <span class="inspect-brand-text">
                        <span class="inspect-brand-eyebrow">Portfolio</span>
                        <span class="inspect-brand-name">Abdalrhman</span>
                    </span>
                </div>

                <img
                    class="inspect-figure"
                    src="${error403Illustration}"
                    alt="Access blocked illustration"
                />

                <p class="inspect-alert">${copy.eyebrow}</p>
                <h1 class="inspect-code">403</h1>
                <p class="inspect-title">${copy.title}</p>
                <p class="inspect-hint">
                    ${copy.hint}
                </p>
                <div class="inspect-actions">
                    <button class="inspect-btn" type="button" data-action="reload">
                        ${copy.action}
                    </button>
                </div>
            </section>
        </main>
    `;
    overlay.addEventListener("click", (event) => {
        const element = event.target as HTMLElement;
        if (element.closest('[data-action="reload"]')) {
            window.location.reload();
        }
    });

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.appendChild(overlay);
}

export function enableInspectProtection() {
    if (typeof window === "undefined") {
        return;
    }

    if (window[PROTECTION_FLAG]) {
        return;
    }
    window[PROTECTION_FLAG] = true;

    const preventContextMenu = (event: Event) => {
        event.preventDefault();
    };

    const preventShortcuts = (event: KeyboardEvent) => {
        if (!isShortcutBlocked(event)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
    };

    window.addEventListener("contextmenu", preventContextMenu);
    window.addEventListener("keydown", preventShortcuts, true);
    document.addEventListener("keydown", preventShortcuts, true);

    let suspiciousHits = 0;
    const checkDevTools = () => {
        if (isCoarsePointerDevice()) {
            return;
        }

        const openedByLayout = isDevToolsLikelyOpen();
        const openedByDebugger = isDebuggerLagDetected();

        if (openedByLayout || openedByDebugger) {
            suspiciousHits += 1;
            if (suspiciousHits >= DEVTOOLS_HIT_LIMIT) {
                mountProtectionOverlay();
            }
            return;
        }

        suspiciousHits = 0;
    };

    checkDevTools();
    const intervalId = window.setInterval(
        checkDevTools,
        DEVTOOLS_CHECK_INTERVAL_MS,
    );
    window.addEventListener("resize", checkDevTools, { passive: true });
    window.addEventListener("focus", checkDevTools, { passive: true });

    window.addEventListener(
        "beforeunload",
        () => {
            window.clearInterval(intervalId);
            window.removeEventListener("contextmenu", preventContextMenu);
            window.removeEventListener("keydown", preventShortcuts, true);
            document.removeEventListener("keydown", preventShortcuts, true);
            window.removeEventListener("resize", checkDevTools);
            window.removeEventListener("focus", checkDevTools);
        },
        { once: true },
    );
}
