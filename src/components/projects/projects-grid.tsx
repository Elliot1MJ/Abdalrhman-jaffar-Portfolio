"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_STAGGER } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/config";
import type { MessageCatalog } from "@/lib/i18n/messages";
import type { PortfolioProject } from "@/lib/data/portfolio";

interface ProjectsGridProps {
    locale: Locale;
    text: MessageCatalog;
    projects: PortfolioProject[];
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: MOTION_STAGGER.tight } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD },
    },
};

export function ProjectsGrid({ locale, text, projects }: ProjectsGridProps) {
    const [filter, setFilter] = useState<"featured" | "all">("featured");
    const shouldReduceMotion = useReducedMotion();

    const visibleProjects =
        filter === "featured"
            ? projects.filter((project) => project.featured)
            : projects;

    return (
        <div className="mt-10">
            <Tabs
                value={filter}
                onValueChange={(value) => setFilter(value as "featured" | "all")}
            >
                <TabsList aria-label={text.projects.filtersAria}>
                    <TabsTrigger value="featured">
                        {text.projects.filters.featured}
                    </TabsTrigger>
                    <TabsTrigger value="all">
                        {text.projects.filters.all}
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <AnimatePresence mode="wait">
                <m.div
                    key={filter}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="show"
                    exit={shouldReduceMotion ? undefined : "hidden"}
                    variants={container}
                    className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
                >
                    {visibleProjects.map((project) => (
                        <m.div key={project.slug} variants={item}>
                            <Link
                                href={`/${locale}/projects/${project.slug}`}
                                className="group flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-card sm:p-8"
                            >
                                <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-card">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        sizes="(min-width: 640px) 45vw, 90vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                </div>
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                                        {text.projects.categories[project.category]}
                                    </p>
                                    <h2 className="mt-2 text-lg font-medium text-foreground">
                                        {project.name}
                                    </h2>
                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </m.div>
                    ))}
                </m.div>
            </AnimatePresence>
        </div>
    );
}
