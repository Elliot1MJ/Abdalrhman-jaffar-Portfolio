import { createBrowserRouter } from "react-router-dom";
import MainWebsitePage from "./MainWebsitePage";
import HomePage from "./routes/HomePage";
import AboutPage from "./routes/AboutPage";
import ProjectsPage from "./routes/ProjectsPage";
import ContactPage from "./routes/ContactPage";
import CVPage from "./routes/CVPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainWebsitePage />,
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
