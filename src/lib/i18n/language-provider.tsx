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

    const toggleLocale = useCallback(() => {
        setLocale((current) => (current === "ar" ? "en" : "ar"));
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
