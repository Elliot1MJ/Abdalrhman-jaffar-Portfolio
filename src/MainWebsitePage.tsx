import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FooterSection from "./components/FooterSection";
import NavigationBar from "./components/NavigationBar";

export default function MainWebsitePage() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    return (
        <div className="page-shell min-h-screen bg-background text-foreground">
            <NavigationBar />
            <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-12 lg:px-8">
                <Outlet />
            </main>
            <FooterSection />
        </div>
    );
}
