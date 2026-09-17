"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiPackage } from "react-icons/fi";
import { FaGitlab, FaNpm } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import {
    CARD_HOVER,
    CARD_SPRING,
    MOTION_DURATION,
    MOTION_EASE_STANDARD,
    MOTION_STAGGER,
} from "@/lib/motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import { getProjectText } from "@/lib/i18n/get-messages";
import type { PortfolioProject } from "@/lib/data/portfolio";
import type { Tool } from "@/lib/data/tools";

type WorkFilter = "featured" | "all" | "tools";

const WORK_FILTERS: WorkFilter[] = ["featured", "all", "tools"];

function parseFilter(value: string | null): WorkFilter {
    return WORK_FILTERS.includes(value as WorkFilter)
        ? (value as WorkFilter)
        : "featured";
}

interface WorkTabsProps {
    projects: PortfolioProject[];
    tools: Tool[];
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

/**
 * Projects and tools on one page. They were separate routes, but tools is a
 * single-item list — it never justified its own page, and splitting the work
 * across two nav entries made the site feel emptier than it is.
 */
export function WorkTabs({ projects, tools }: WorkTabsProps) {
    const { locale, text } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const shouldReduceMotion = useReducedMotion();

    /*
     * The tab is addressable as `?tab=tools`, so the subnav's "Tools" entry can
     * land on the right tab — it used to link at bare `/work` and always
     * dropped the visitor on "Featured". State is kept locally and synced from
     * the URL so switching tabs stays instant instead of waiting on a
     * navigation.
     */
    const [filter, setFilter] = useState<WorkFilter>(() =>
        parseFilter(searchParams.get("tab")),
    );

    const urlFilter = parseFilter(searchParams.get("tab"));
    useEffect(() => {
        setFilter(urlFilter);
    }, [urlFilter]);

    const selectFilter = (value: WorkFilter) => {
        setFilter(value);
        router.replace(value === "featured" ? "/work" : `/work?tab=${value}`, {
            scroll: false,
        });
    };

    const localizedProjects = useMemo(
        () =>
            projects.map((project) => ({
                ...project,
                ...getProjectText(
                    locale,
                    project.name,
                    project.description,
                    project.codeSummary,
                ),
            })),
        [projects, locale],
    );

    const visibleProjects =
        filter === "featured"
            ? localizedProjects.filter((project) => project.featured)
            : localizedProjects;

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8">
            <PageHeader
                eyebrow={text.work.eyebrow}
                title={text.work.title}
                description={text.work.description}
            />

            <div className="mt-10">
                <Tabs
                    value={filter}
                    onValueChange={(value) => selectFilter(value as WorkFilter)}
                >
                    <TabsList aria-label={text.work.filtersAria}>
                        <TabsTrigger value="featured">
                            {text.work.filters.featured}
                        </TabsTrigger>
                        <TabsTrigger value="all">
                            {text.work.filters.all}
                        </TabsTrigger>
                        <TabsTrigger value="tools">
                            {text.work.filters.tools}
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
                        className="mt-8 grid gap-6 sm:grid-cols-2"
                    >
                        {filter === "tools"
                            ? tools.map((tool) => (
                                  <m.article
                                      key={tool.slug}
                                      variants={item}
                                      whileHover={
                                          shouldReduceMotion
                                              ? undefined
                                              : CARD_HOVER
                                      }
                                      transition={CARD_SPRING}
                                      className="flex flex-col gap-4 rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-primary/50 sm:p-6"
                                  >
                                      <div className="flex items-center gap-3">
                                          <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground">
                                              <FiPackage />
                                          </span>
                                          <div>
                                              {/* Inline-only: `data-latin` on
                                                  the heading itself would flip
                                                  its alignment in RTL. */}
                                              <h2 className="type-heading text-foreground">
                                                  <span data-latin>
                                                      {tool.name}
                                                  </span>
                                              </h2>
                                              <p className="text-xs text-muted-foreground">
                                                  {tool.tagline}
                                              </p>
                                          </div>
                                      </div>

                                      <p className="text-sm leading-relaxed text-muted-foreground">
                                          {tool.description}
                                      </p>

                                      <div className="flex flex-wrap gap-2">
                                          {tool.stack.map((entry) => (
                                              <span
                                                  key={entry}
                                                  data-latin
                                                  className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground"
                                              >
                                                  {entry}
                                              </span>
                                          ))}
                                      </div>

                                      <div className="mt-auto flex flex-wrap gap-4 pt-2">
                                          {tool.npmUrl && (
                                              <a
                                                  href={tool.npmUrl}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent-text"
                                              >
                                                  <FaNpm />
                                                  {text.tools.viewOnNpm}
                                              </a>
                                          )}
                                          {tool.repoUrl && (
                                              <a
                                                  href={tool.repoUrl}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent-text"
                                              >
                                                  <FaGitlab />
                                                  {text.tools.viewRepo}
                                              </a>
                                          )}
                                      </div>
                                  </m.article>
                              ))
                            : visibleProjects.map((project) => (
                                  <m.div
                                      key={project.slug}
                                      variants={item}
                                      whileHover={
                                          shouldReduceMotion
                                              ? undefined
                                              : CARD_HOVER
                                      }
                                      transition={CARD_SPRING}
                                  >
                                      <Link
                                          href={`/projects/${project.slug}`}
                                          className="group flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/30 p-4 transition-colors hover:border-primary/50 sm:p-5"
                                      >
                                          <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-card">
                                              <Image
                                                  src={project.image}
                                                  alt={project.name}
                                                  fill
                                                  sizes="(min-width: 640px) 45vw, 90vw"
                                                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                              />
                                              <div
                                                  aria-hidden
                                                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                                              />
                                          </div>

                                          <div className="flex items-start justify-between gap-3">
                                              <div className="min-w-0">
                                                  <p className="type-label font-mono uppercase tracking-[0.15em] text-muted-foreground">
                                                      {
                                                          text.projects
                                                              .categories[
                                                              project.category
                                                          ]
                                                      }
                                                  </p>
                                                  <h2 className="type-heading mt-2 text-foreground">
                                                      {project.name}
                                                  </h2>
                                              </div>
                                              <FiArrowUpRight
                                                  aria-hidden
                                                  className="mt-1 shrink-0 text-lg text-muted-foreground transition-colors group-hover:text-accent-text rtl:-scale-x-100"
                                              />
                                          </div>

                                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                              {project.description}
                                          </p>

                                          <div className="mt-auto flex flex-wrap gap-2 pt-1">
                                              {project.stack
                                                  .slice(0, 3)
                                                  .map((tech) => (
                                                      <span
                                                          key={tech}
                                                          data-latin
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
        </div>
    );
}
