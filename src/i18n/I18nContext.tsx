import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { I18nContext, type I18nContextValue } from "./context";
import { messages, type Language } from "./messages";
import { applySeoTags } from "./seo";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

function resolveInitialLanguage(): Language {
    if (typeof window === "undefined") {
        return "en";
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "ar" || storedLanguage === "en") {
        return storedLanguage;
    }

    return window.navigator.language.toLowerCase().startsWith("ar")
        ? "ar"
        : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(() =>
        resolveInitialLanguage(),
    );
    const didMount = useRef(false);

    const text = useMemo(() => messages[language], [language]);
    const isRtl = language === "ar";

    useLayoutEffect(() => {
        const root = document.documentElement;
        root.lang = language;
        root.dir = isRtl ? "rtl" : "ltr";
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        applySeoTags(text);

        if (didMount.current) {
            root.classList.remove("lang-transition");
            void root.offsetWidth;
            root.classList.add("lang-transition");
            const timeout = window.setTimeout(() => {
                root.classList.remove("lang-transition");
            }, 240);

            return () => window.clearTimeout(timeout);
        }

        didMount.current = true;
    }, [language, isRtl, text]);

    const toggleLanguage = useCallback(() => {
        setLanguage((previous) => (previous === "en" ? "ar" : "en"));
    }, []);

    const getProjectText = useCallback(
        (name: string, description: string) => {
            if (language !== "ar") {
                return { name, description };
            }

            const projectTranslation = text.projects.projectCopy[name];
            return {
                name: projectTranslation?.name ?? name,
                description: projectTranslation?.description ?? description,
            };
        },
        [language, text.projects.projectCopy],
    );

    const value = useMemo<I18nContextValue>(
        () => ({
            language,
            setLanguage,
            toggleLanguage,
            languageButtonLabel: language === "en" ? "AR" : "EN",
            isRtl,
            text,
            getProjectText,
        }),
        [getProjectText, isRtl, language, text, toggleLanguage],
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
