import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import MainWebsitePage from "./MainWebsitePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <LazyMotion features={domAnimation} strict>
            <MainWebsitePage />
        </LazyMotion>
    </StrictMode>
);
