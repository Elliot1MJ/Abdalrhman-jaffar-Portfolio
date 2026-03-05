import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { UI_MODE_SWITCH_ANIMATION_MS } from "../lib/motion";
import { ThemeContext, type ThemeContextValue, type Theme } from "./context";

const THEME_STORAGE_KEY = "theme";

const THEME_SWITCH_ANIMATION_MS = UI_MODE_SWITCH_ANIMATION_MS;

function resolveInitialTheme(): Theme {
    if (typeof window === "undefined") {
        return "dark";
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    const prefersLight = window.matchMedia?.(
        "(prefers-color-scheme: light)",
    ).matches;

    return prefersLight ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());
    const didMount = useRef(false);

    useLayoutEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("theme-light", theme === "light");
        root.classList.toggle("theme-dark", theme === "dark");
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);

        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        root.classList.remove("theme-transition");
        void root.offsetWidth;
        root.classList.add("theme-transition");

        const timeout = window.setTimeout(() => {
            root.classList.remove("theme-transition");
        }, THEME_SWITCH_ANIMATION_MS);

        return () => window.clearTimeout(timeout);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            setTheme,
            toggleTheme,
        }),
        [theme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
