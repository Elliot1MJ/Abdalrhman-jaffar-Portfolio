import FooterSection from "./components/FooterSection";
import NavigationBar from "./components/NavigationBar";
import { Separator } from "./components/ui/separator";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import CVPage from "./routes/CVPage";
import HomePage from "./routes/HomePage";
import ProjectsPage from "./routes/ProjectsPage";

export default function MainWebsitePage() {
    return (
        <div className="page-shell min-h-screen bg-background text-foreground">
            <NavigationBar />
            <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
                <div className="space-y-20 sm:space-y-24">
                    <section
                        id="home"
                        data-section="home"
                        aria-label="Home"
                        className="section-block"
                    >
                        <HomePage />
                    </section>

                    <Separator className="bg-border/70" />

                    <section
                        id="about"
                        data-section="about"
                        aria-label="About"
                        className="section-block"
                    >
                        <AboutPage />
                    </section>

                    <Separator className="bg-border/70" />

                    <section
                        id="projects"
                        data-section="projects"
                        aria-label="Projects"
                        className="section-block"
                    >
                        <ProjectsPage />
                    </section>

                    <Separator className="bg-border/70" />

                    <section
                        id="cv"
                        data-section="cv"
                        aria-label="CV"
                        className="section-block"
                    >
                        <CVPage />
                    </section>

                    <Separator className="bg-border/70" />

                    <section
                        id="contact"
                        data-section="contact"
                        aria-label="Contact"
                        className="section-block"
                    >
                        <ContactPage />
                    </section>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
