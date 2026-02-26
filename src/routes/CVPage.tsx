import { useRef } from "react";
import { useInView } from "framer-motion";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import myCVPDF from "../assets/Abdalrhman_Jaffar's_CV.pdf";
import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useI18n } from "../i18n/useI18n";

export default function CVPage() {
    const { text } = useI18n();
    const previewRef = useRef<HTMLDivElement>(null);
    const shouldLoadPreview = useInView(previewRef, {
        once: true,
        margin: "0px 0px 240px 0px",
    });

    return (
        <div className="space-y-8">
            <MotionReveal>
                <SectionHeading
                    eyebrow={text.cv.eyebrow}
                    title={text.cv.title}
                    description={text.cv.description}
                />
            </MotionReveal>

            <MotionReveal>
                <Card className="border-foreground/10 bg-card">
                    <CardContent className="space-y-5 p-6 text-center sm:p-7">
                        <div className="flex flex-wrap justify-center gap-3">
                            <a href={myCVPDF} target="_blank" rel="noreferrer">
                                <Button>
                                    <FiExternalLink />
                                    {text.cv.openCV}
                                </Button>
                            </a>
                            <a
                                href={myCVPDF}
                                download
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button variant="outline">
                                    <FiDownload />
                                    {text.cv.downloadPDF}
                                </Button>
                            </a>
                        </div>

                        <div
                            ref={previewRef}
                            className="overflow-hidden rounded-2xl border border-foreground/10 bg-secondary/30"
                        >
                            <iframe
                                title={text.cv.iframeTitle}
                                src={
                                    shouldLoadPreview
                                        ? `${myCVPDF}#toolbar=0&view=FitH`
                                        : undefined
                                }
                                loading="lazy"
                                className="cv-scroll hidden h-[700px] w-full md:block"
                            />
                            <div className="p-5 text-sm text-muted-foreground md:hidden">
                                {text.cv.mobilePreviewNotice}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </MotionReveal>
        </div>
    );
}
