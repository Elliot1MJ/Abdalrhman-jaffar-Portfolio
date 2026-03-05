import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrPage from "./components/ErrPage";

const MainWebsitePage = lazy(() => import("./MainWebsitePage"));
const ProjectDetailsPage = lazy(() => import("./routes/ProjectDetailsPage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainWebsitePage />,
        errorElement: <ErrPage />,
    },
    {
        path: "/projects/:projectSlug",
        element: <ProjectDetailsPage />,
        errorElement: <ErrPage />,
    },
    {
        path: "*",
        element: <ErrPage />,
    },
]);

export default router;
