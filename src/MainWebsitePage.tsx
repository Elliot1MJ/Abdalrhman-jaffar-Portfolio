import { useEffect } from "react";
import FooterSection from "./components/FooterSection";
import NavigationBar from "./components/NavigationBar";
// import { Separator } from "./components/ui/separator";
import ScrollToTopIndicator from "./components/shared/ScrollToTopIndicator";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import CVPage from "./routes/CVPage";
import HomePage from "./routes/HomePage";
import ProjectsPage from "./routes/ProjectsPage";
import { applySeoTags } from "./i18n/seo";
import { useI18n } from "./i18n/useI18n";

export default function MainWebsitePage() {
    const { text } = useI18n();

    useEffect(() => {
        applySeoTags(text);
    }, [text]);

    return (
        <div className="page-shell min-h-screen bg-background text-foreground">
            <div
                aria-hidden
                className="home-grid-bg pointer-events-none absolute inset-0 z-0"
            />
            <div className="relative z-10">
                <NavigationBar />
                <main className="mx-auto w-[90%] max-w-none px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
                    <div className="space-y-20 sm:space-y-24">
                        <section
                            id="home"
                            data-section="home"
                            aria-label={text.sectionAria.home}
                            className="section-block"
                        >
                            <HomePage />
                        </section>

                        <section
                            id="about"
                            data-section="about"
                            aria-label={text.sectionAria.about}
                            className="section-block"
                        >
                            <AboutPage />
                        </section>

                        {/* <Separator className="bg-border/70" /> */}

                        <section
                            id="projects"
                            data-section="projects"
                            aria-label={text.sectionAria.projects}
                            className="section-block"
                        >
                            <ProjectsPage />
                        </section>

                        {/* <Separator className="bg-border/70" /> */}

                        <section
                            id="cv"
                            data-section="cv"
                            aria-label={text.sectionAria.cv}
                            className="section-block"
                        >
                            <CVPage />
                        </section>

                        {/* <Separator className="bg-border/70" /> */}

                        <section
                            id="contact"
                            data-section="contact"
                            aria-label={text.sectionAria.contact}
                            className="section-block"
                        >
                            <ContactPage />
                        </section>
                    </div>
                </main>
                <ScrollToTopIndicator />
                <FooterSection />
            </div>
        </div>
    );
}
