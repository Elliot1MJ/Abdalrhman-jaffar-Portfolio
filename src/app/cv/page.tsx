"use client";

import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-provider";
import { MotionReveal } from "@/components/shared/motion-reveal";

const CV_PATH = "/documents/Abdalrhman_Jaffar's_CV.pdf";

export default function CvPage() {
    const { text } = useLanguage();

    return (
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
            <MotionReveal className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                        {text.cv.eyebrow}
                    </p>
                    <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                        {text.cv.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground">
                        {text.cv.description}
                    </p>
                </div>
                <Button asChild size="lg">
                    <a href={CV_PATH} download>
                        <FiDownload />
                        {text.cv.downloadPDF}
                    </a>
                </Button>
            </MotionReveal>

            <p className="mt-6 text-xs text-muted-foreground sm:hidden">
                {text.cv.mobilePreviewNotice}
            </p>

            <MotionReveal
                delay={0.1}
                className="mt-10 hidden overflow-hidden rounded-2xl border border-border sm:block"
            >
                <iframe
                    src={CV_PATH}
                    title={text.cv.iframeTitle}
                    className="h-[80vh] w-full"
                />
            </MotionReveal>
        </div>
    );
}
