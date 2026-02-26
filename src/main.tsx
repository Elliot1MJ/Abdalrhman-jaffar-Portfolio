import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import AppLoader from "./components/shared/AppLoader";
import router from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <LazyMotion features={domAnimation} strict>
            <Suspense fallback={<AppLoader />}>
                <RouterProvider router={router} />
            </Suspense>
        </LazyMotion>
    </StrictMode>
);
