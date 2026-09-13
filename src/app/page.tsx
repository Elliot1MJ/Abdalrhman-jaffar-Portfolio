import { featuredProjects } from "@/lib/data/portfolio";
import { HeroContent } from "@/components/home/hero-content";
import { HomeStaticSections } from "@/components/home/home-static-sections";

export default function HomePage() {
    return (
        <div>
            <section className="mx-auto flex min-h-[calc(100dvh-var(--nav-height))] max-w-[1440px] items-center px-5 py-16 sm:px-8">
                <HeroContent />
            </section>

            <HomeStaticSections featuredProjects={featuredProjects} />
        </div>
    );
}
