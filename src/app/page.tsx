import { featuredProjects } from "@/lib/data/portfolio";
import { HeroContent } from "@/components/home/hero-content";
import { HomeStaticSections } from "@/components/home/home-static-sections";

export default function HomePage() {
    return (
        <div>
            {/*
              * Full-height only from `lg` up. On phones the viewport is short
              * enough that reserving the whole screen for the hero just pushed
              * the rest of the page below an empty gap; here the hero is sized
              * by its own content.
              */}
            {/*
              * No `overflow-hidden` here: the hero canvas is deliberately
              * full-bleed (`w-screen`) and this container is capped at 1440px,
              * so clipping here would crop it straight back to the container.
              * The shader fades its own arms out on all four edges and the
              * wrapper carries a radial mask, so nothing needs the clip —
              * `body` already has `overflow-x: hidden` for the RTL scrollbar.
              */}
            <section className="relative mx-auto flex max-w-[1440px] items-center px-5 py-12 sm:px-8 lg:min-h-[calc(100dvh-var(--nav-height))]">
                <HeroContent />
            </section>

            <HomeStaticSections featuredProjects={featuredProjects} />
        </div>
    );
}
