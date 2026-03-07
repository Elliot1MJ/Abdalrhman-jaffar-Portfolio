import {
    Suspense,
    lazy,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import FooterSection from "./components/FooterSection";
import NavigationBar from "./components/NavigationBar";
// import { Separator } from "./components/ui/separator";
import ScrollToTopIndicator from "./components/shared/ScrollToTopIndicator";
import HomePage from "./routes/HomePage";
import { applySeoTags } from "./i18n/seo";
import { useI18n } from "./i18n/useI18n";

const AboutPage = lazy(() => import("./routes/AboutPage"));
const ServicesPage = lazy(() => import("./routes/ServicesPage"));
const ProjectsPage = lazy(() => import("./routes/ProjectsPage"));
const CVPage = lazy(() => import("./routes/CVPage"));
const ContactPage = lazy(() => import("./routes/ContactPage"));

interface DeferredSectionProps {
    id: "home" | "about" | "services" | "projects" | "cv" | "contact";
    ariaLabel: string;
    eager?: boolean;
    children: ReactNode;
}

function SectionSkeleton() {
    return (
        <div className="rounded-2xl border border-foreground/12 bg-secondary/25 p-4 sm:p-5">
            <div className="skeleton-shimmer h-6 w-40 rounded-full" />
            <div className="mt-4 space-y-2.5">
                <div className="skeleton-shimmer h-4 w-11/12 rounded-full" />
                <div className="skeleton-shimmer h-4 w-9/12 rounded-full" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="skeleton-shimmer h-44 rounded-xl" />
                <div className="skeleton-shimmer h-44 rounded-xl" />
            </div>
        </div>
    );
}

function DeferredSection({
    id,
    ariaLabel,
    eager = false,
    children,
}: DeferredSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [shouldRender, setShouldRender] = useState(eager);

    useEffect(() => {
        if (shouldRender) {
            return;
        }

        const sectionElement = sectionRef.current;
        if (!sectionElement) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setShouldRender(true);
                        observer.disconnect();
                        return;
                    }
                }
            },
            {
                root: null,
                rootMargin: "420px 0px",
                threshold: 0.01,
            },
        );

        observer.observe(sectionElement);

        return () => {
            observer.disconnect();
        };
    }, [shouldRender]);

    return (
        <section
            ref={sectionRef}
            id={id}
            data-section={id}
            aria-label={ariaLabel}
            className="section-block"
        >
            {shouldRender ? children : <SectionSkeleton />}
        </section>
    );
}

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
                        <DeferredSection
                            id="home"
                            ariaLabel={text.sectionAria.home}
                            eager
                        >
                            <HomePage />
                        </DeferredSection>

                        <DeferredSection
                            id="about"
                            ariaLabel={text.sectionAria.about}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <AboutPage />
                            </Suspense>
                        </DeferredSection>

                        <DeferredSection
                            id="services"
                            ariaLabel={text.sectionAria.services}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <ServicesPage />
                            </Suspense>
                        </DeferredSection>

                        {/* <Separator className="bg-border/70" /> */}

                        <DeferredSection
                            id="projects"
                            ariaLabel={text.sectionAria.projects}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <ProjectsPage />
                            </Suspense>
                        </DeferredSection>

                        {/* <Separator className="bg-border/70" /> */}

                        <DeferredSection id="cv" ariaLabel={text.sectionAria.cv}>
                            <Suspense fallback={<SectionSkeleton />}>
                                <CVPage />
                            </Suspense>
                        </DeferredSection>

                        {/* <Separator className="bg-border/70" /> */}

                        <DeferredSection
                            id="contact"
                            ariaLabel={text.sectionAria.contact}
                        >
                            <Suspense fallback={<SectionSkeleton />}>
                                <ContactPage />
                            </Suspense>
                        </DeferredSection>
                    </div>
                </main>
                <ScrollToTopIndicator />
                <FooterSection />
            </div>
        </div>
    );
}
