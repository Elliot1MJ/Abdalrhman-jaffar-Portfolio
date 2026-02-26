import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrPage from "./components/ErrPage";

const MainWebsitePage = lazy(() => import("./MainWebsitePage"));
const HomePage = lazy(() => import("./routes/HomePage"));
const AboutPage = lazy(() => import("./routes/AboutPage"));
const ProjectsPage = lazy(() => import("./routes/ProjectsPage"));
const ContactPage = lazy(() => import("./routes/ContactPage"));
const CVPage = lazy(() => import("./routes/CVPage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainWebsitePage />,
        errorElement: <ErrPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "cv", element: <CVPage /> },
        ],
    },
]);

export default router;
