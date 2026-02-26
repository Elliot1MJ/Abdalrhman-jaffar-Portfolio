import { FiArrowLeft } from "react-icons/fi";
import { useI18n } from "../i18n/useI18n";
import { navigateToSection } from "../lib/sectionNavigation";
import { Button } from "./ui/button";

export default function ErrPage() {
    const { text } = useI18n();

    return (
        <div className="page-shell flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-foreground/10 bg-card p-8 text-center shadow-2xl">
                <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                    {text.error.code}
                </p>
                <h1 className="mt-3 font-display text-4xl sm:text-5xl">
                    {text.error.title}
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {text.error.description}
                </p>
                <a
                    href="#home"
                    onClick={(event) => {
                        event.preventDefault();
                        navigateToSection("home");
                    }}
                    className="mt-7 inline-flex"
                >
                    <Button>
                        <FiArrowLeft />
                        {text.error.backHome}
                    </Button>
                </a>
            </div>
        </div>
    );
}
