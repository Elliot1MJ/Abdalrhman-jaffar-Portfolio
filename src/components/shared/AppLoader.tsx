import { useI18n } from "../../i18n/useI18n";

const navPlaceholders = [1, 2, 3, 4];
const statPlaceholders = [1, 2, 3, 4];
const projectCardPlaceholders = [1, 2, 3, 4, 5, 6];
const galleryPlaceholders = [1, 2, 3, 4, 5, 6];

function SkeletonBlock({ className }: { className: string }) {
    return (
        <div
            className={`skeleton-shimmer rounded-xl border border-foreground/10 ${className}`}
        />
    );
}

function LoaderHeader({ isProjectDetails }: { isProjectDetails: boolean }) {
    return (
        <header className="fixed inset-x-0 top-0 z-30 border-b border-foreground/12 bg-background/72 backdrop-blur-xl">
            <div className="mx-auto flex w-[90%] max-w-none items-center justify-between px-4 py-4 sm:px-6">
                <SkeletonBlock className="h-10 w-40 rounded-full" />

                {!isProjectDetails && (
                    <div className="hidden items-center gap-3 md:flex">
                        {navPlaceholders.map((item) => (
                            <SkeletonBlock
                                key={`loader-nav-${item}`}
                                className="h-8 w-20 rounded-full"
                            />
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <SkeletonBlock className="h-9 w-9 rounded-full" />
                    <SkeletonBlock className="h-9 w-9 rounded-full" />
                    {isProjectDetails && (
                        <SkeletonBlock className="h-9 w-24 rounded-full" />
                    )}
                </div>
            </div>
        </header>
    );
}

function MainPageSkeleton() {
    return (
        <main className="mx-auto w-[90%] max-w-none space-y-20 px-4 pb-20 pt-28 sm:px-6 sm:space-y-24 sm:pt-28 lg:px-8">
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4 rounded-3xl border border-foreground/12 bg-card/55 p-6">
                    <SkeletonBlock className="h-4 w-28 rounded-full" />
                    <SkeletonBlock className="h-12 w-[78%] rounded-2xl" />
                    <SkeletonBlock className="h-12 w-[62%] rounded-2xl" />
                    <SkeletonBlock className="h-5 w-[92%] rounded-full" />
                    <SkeletonBlock className="h-5 w-[86%] rounded-full" />
                    <div className="flex flex-wrap gap-2 pt-2">
                        <SkeletonBlock className="h-9 w-32 rounded-full" />
                        <SkeletonBlock className="h-9 w-32 rounded-full" />
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {statPlaceholders.map((item) => (
                        <div
                            key={`loader-stat-${item}`}
                            className="space-y-3 rounded-2xl border border-foreground/12 bg-card/55 p-4"
                        >
                            <SkeletonBlock className="h-4 w-20 rounded-full" />
                            <SkeletonBlock className="h-8 w-[74%] rounded-xl" />
                            <SkeletonBlock className="h-4 w-[92%] rounded-full" />
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <SkeletonBlock className="h-10 w-52 rounded-2xl" />
                <div className="space-y-3 rounded-3xl border border-foreground/12 bg-card/55 p-6">
                    <SkeletonBlock className="h-5 w-[96%] rounded-full" />
                    <SkeletonBlock className="h-5 w-[92%] rounded-full" />
                    <SkeletonBlock className="h-5 w-[84%] rounded-full" />
                    <SkeletonBlock className="h-5 w-[66%] rounded-full" />
                </div>
            </section>

            <section className="space-y-4">
                <SkeletonBlock className="h-10 w-56 rounded-2xl" />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {projectCardPlaceholders.map((item) => (
                        <div
                            key={`loader-card-${item}`}
                            className="space-y-4 rounded-2xl border border-foreground/12 bg-card/55 p-4"
                        >
                            <SkeletonBlock className="aspect-[16/10] rounded-xl" />
                            <SkeletonBlock className="h-6 w-[72%] rounded-full" />
                            <SkeletonBlock className="h-4 w-[96%] rounded-full" />
                            <SkeletonBlock className="h-4 w-[88%] rounded-full" />
                            <div className="flex flex-wrap gap-2 pt-1">
                                <SkeletonBlock className="h-7 w-[4.5rem] rounded-full" />
                                <SkeletonBlock className="h-7 w-[4rem] rounded-full" />
                                <SkeletonBlock className="h-7 w-[5rem] rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <SkeletonBlock className="min-h-[240px] rounded-3xl" />
                <SkeletonBlock className="min-h-[240px] rounded-3xl" />
            </section>
        </main>
    );
}

function ProjectDetailsSkeleton() {
    return (
        <main className="mx-auto w-[90%] max-w-none space-y-8 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
            <SkeletonBlock className="h-16 w-[60%] rounded-2xl sm:h-20 sm:w-[52%]" />

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <SkeletonBlock className="min-h-[320px] rounded-3xl sm:min-h-[420px]" />

                <div className="space-y-4">
                    <div className="space-y-4 rounded-3xl border border-foreground/12 bg-card/55 p-5 sm:p-6">
                        <SkeletonBlock className="h-5 w-32 rounded-full" />
                        <SkeletonBlock className="h-4 w-[95%] rounded-full" />
                        <SkeletonBlock className="h-4 w-[92%] rounded-full" />
                        <SkeletonBlock className="h-4 w-[84%] rounded-full" />
                        <SkeletonBlock className="h-4 w-[88%] rounded-full" />
                    </div>

                    <div className="space-y-4 rounded-3xl border border-foreground/12 bg-card/55 p-5 sm:p-6">
                        <div className="flex flex-wrap gap-2">
                            <SkeletonBlock className="h-8 w-24 rounded-full" />
                            <SkeletonBlock className="h-8 w-24 rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <SkeletonBlock className="h-8 w-24 rounded-full" />
                            <SkeletonBlock className="h-8 w-20 rounded-full" />
                            <SkeletonBlock className="h-8 w-28 rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-2 border-t border-foreground/12 pt-4">
                            <SkeletonBlock className="h-10 w-24 rounded-xl" />
                            <SkeletonBlock className="h-10 w-28 rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <SkeletonBlock className="h-10 w-64 rounded-2xl" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryPlaceholders.map((item) => (
                        <SkeletonBlock
                            key={`loader-gallery-${item}`}
                            className="aspect-[16/10] rounded-2xl"
                        />
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <SkeletonBlock className="h-10 w-64 rounded-2xl" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryPlaceholders.map((item) => (
                        <SkeletonBlock
                            key={`loader-code-${item}`}
                            className="aspect-[16/10] rounded-2xl"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default function AppLoader() {
    const { text } = useI18n();
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "/";
    const isProjectDetails = pathname.startsWith("/projects/");

    return (
        <div className="page-shell min-h-screen bg-background text-foreground">
            <span className="sr-only">{text.loader.text}</span>

            <div
                aria-hidden
                className="home-grid-bg pointer-events-none absolute inset-0 z-0"
            />

            <div className="relative z-10">
                <LoaderHeader isProjectDetails={isProjectDetails} />
                {isProjectDetails ? <ProjectDetailsSkeleton /> : <MainPageSkeleton />}
            </div>
        </div>
    );
}
