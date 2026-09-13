"use client";

import { FiPackage } from "react-icons/fi";
import { FaGitlab, FaNpm } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/language-provider";
import { tools } from "@/lib/data/tools";
import { MotionReveal } from "@/components/shared/motion-reveal";

export default function ToolsPage() {
    const { text } = useLanguage();

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
            <MotionReveal>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                    {text.tools.eyebrow}
                </p>
                <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {text.tools.title}
                </h1>
                <p className="mt-4 max-w-xl text-base text-muted-foreground">
                    {text.tools.description}
                </p>
            </MotionReveal>

            <MotionReveal
                delay={0.1}
                className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
            >
                {tools.map((tool) => (
                    <div
                        key={tool.slug}
                        className="flex flex-col gap-4 bg-background p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground">
                                <FiPackage />
                            </span>
                            <div>
                                <h2 className="text-lg font-medium text-foreground">
                                    {tool.name}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {tool.tagline}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {tool.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {tool.stack.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-wrap gap-4 pt-2">
                            {tool.npmUrl && (
                                <a
                                    href={tool.npmUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
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
                                    className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
                                >
                                    <FaGitlab />
                                    {text.tools.viewRepo}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </MotionReveal>
        </div>
    );
}
