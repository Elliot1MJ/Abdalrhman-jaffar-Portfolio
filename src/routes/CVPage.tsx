import { FiDownload, FiExternalLink } from "react-icons/fi";
import myCVPDF from "../assets/Abdalrhman_Jaffar's_CV.pdf";
import MotionReveal from "../components/shared/MotionReveal";
import SectionHeading from "../components/shared/SectionHeading";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function CVPage() {
    return (
        <div className="space-y-8">
            <MotionReveal>
                <SectionHeading
                    eyebrow="Resume"
                    title="Curriculum Vitae"
                    description="Open the PDF in a new tab or download it directly."
                />
            </MotionReveal>

            <MotionReveal>
                <Card className="border-border/70 bg-card/75">
                    <CardContent className="space-y-5 p-6 sm:p-7">
                        <div className="flex flex-wrap gap-3">
                            <a href={myCVPDF} target="_blank" rel="noreferrer">
                                <Button>
                                    <FiExternalLink />
                                    Open CV
                                </Button>
                            </a>
                            <a href={myCVPDF} download target="_blank" rel="noreferrer">
                                <Button variant="outline">
                                    <FiDownload />
                                    Download PDF
                                </Button>
                            </a>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-border/70 bg-secondary/30">
                            <iframe
                                title="Abdalrhman CV"
                                src={`${myCVPDF}#toolbar=0&view=FitH`}
                                loading="lazy"
                                className="hidden h-[700px] w-full md:block"
                            />
                            <div className="p-5 text-sm text-muted-foreground md:hidden">
                                CV preview is disabled on small screens for better performance.
                                Use the buttons above to open or download the PDF.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </MotionReveal>
        </div>
    );
}
