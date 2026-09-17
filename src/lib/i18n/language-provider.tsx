"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { defaultLocale, isRtl, type Locale } from "./config";
import { getMessages } from "./get-messages";
import type { MessageCatalog } from "./messages";

interface LanguageContextValue {
    locale: Locale;
    dir: "ltr" | "rtl";
    text: MessageCatalog;
    toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LOCALE_STORAGE_KEY = "locale";

export const LANGUAGE_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem("${LOCALE_STORAGE_KEY}");if(l==="ar"){document.documentElement.setAttribute("lang","ar");document.documentElement.setAttribute("dir","rtl");}}catch(e){}})();`;

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Always starts at the server-rendered default ("en") so the first client
    // render matches the server exactly; the stored preference (if any) is
    // applied in the effect below, right after mount.
    const [locale, setLocale] = useState<Locale>(defaultLocale);

    useEffect(() => {
        const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (stored === "ar") setLocale("ar");
    }, []);

    useEffect(() => {
        const dir = isRtl(locale) ? "rtl" : "ltr";
        document.documentElement.setAttribute("lang", locale);
        document.documentElement.setAttribute("dir", dir);
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }, [locale]);

    /*
     * The swap is immediate.
     *
     * This used to wait on a 160ms `setTimeout` before flipping state, so every
     * toggle felt like a lag between the click and the text changing — the
     * fade-out ran first and the new language only appeared after it finished.
     *
     * Now the state flips synchronously and the crossfade happens *around* the
     * new text: the attribute is set and cleared on the next frame, so the
     * content fades back in from an already-updated DOM. Perceived latency is
     * zero, and the transition still reads as deliberate rather than as a snap.
     *
     * The *button* itself stays completely static — an explicit brand
     * constraint (see HANDOFF "Header / controls"); only the page content
     * fades. Everything here is opacity-only and behind a reduced-motion guard,
     * so it costs nothing on the layout path.
     */
    const toggleLocale = useCallback(() => {
        const root = document.documentElement;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        setLocale((current) => (current === "ar" ? "en" : "ar"));

        if (prefersReducedMotion) return;

        root.setAttribute("data-locale-swapping", "");
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                root.removeAttribute("data-locale-swapping");
            });
        });
    }, []);

    const text = useMemo(() => getMessages(locale), [locale]);
    const dir = useMemo<"ltr" | "rtl">(
        () => (isRtl(locale) ? "rtl" : "ltr"),
        [locale],
    );

    const value = useMemo(
        () => ({ locale, dir, text, toggleLocale }),
        [locale, dir, text, toggleLocale],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
