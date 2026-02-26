import { FiArrowLeft } from "react-icons/fi";
import { Button } from "./ui/button";

export default function ErrPage() {
    return (
        <div className="page-shell flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-card/50 p-8 text-center shadow-2xl backdrop-blur-2xl">
                <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Error 404</p>
                <h1 className="mt-3 font-display text-4xl sm:text-5xl">Page not found</h1>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The page you are looking for does not exist or may have been moved.
                </p>
                <a href="#home" className="mt-7 inline-flex">
                    <Button>
                        <FiArrowLeft />
                        Back to homepage
                    </Button>
                </a>
            </div>
        </div>
    );
}
