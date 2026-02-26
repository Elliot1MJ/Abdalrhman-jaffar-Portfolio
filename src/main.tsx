import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { I18nProvider } from "./i18n/I18nContext";
import { ThemeProvider } from "./theme/ThemeProvider";
import MainWebsitePage from "./MainWebsitePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <I18nProvider>
                <LazyMotion features={domAnimation} strict>
                    <MainWebsitePage />
                </LazyMotion>
            </I18nProvider>
        </ThemeProvider>
    </StrictMode>
);
