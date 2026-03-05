import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import AppLoader from "./components/shared/AppLoader";
import { I18nProvider } from "./i18n/I18nContext";
import { enableInspectProtection } from "./lib/inspectProtection";
import router from "./routes";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./index.css";

enableInspectProtection();

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => undefined);
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
