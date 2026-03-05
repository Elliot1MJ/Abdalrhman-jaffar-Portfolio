import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import AppLoader from "./components/shared/AppLoader";
import { I18nProvider } from "./i18n/I18nContext";
import router from "./routes";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./index.css";

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        if (import.meta.env.PROD) {
            navigator.serviceWorker.register("/sw.js").catch(() => undefined);
            return;
        }

        void (async () => {
            const registrations = await navigator.serviceWorker.getRegistrations();
            await Promise.all(
                registrations.map((registration) =>
                    registration.unregister().catch(() => false),
                ),
            );

            if ("caches" in window) {
                const cacheKeys = await caches.keys();
                await Promise.all(
                    cacheKeys.map((cacheKey) =>
                        caches.delete(cacheKey).catch(() => false),
                    ),
                );
            }
        })();
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <I18nProvider>
                <LazyMotion features={domAnimation} strict>
                    <Suspense fallback={<AppLoader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </LazyMotion>
            </I18nProvider>
        </ThemeProvider>
    </StrictMode>
);
