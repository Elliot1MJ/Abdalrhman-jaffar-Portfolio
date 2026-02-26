import { useI18n } from "../../i18n/useI18n";

export default function AppLoader() {
    const { text } = useI18n();

    return (
        <div className="flex min-h-[42vh] items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm text-muted-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                {text.loader.text}
            </div>
        </div>
    );
}
