import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";

export default function NotFound() {
    const text = getMessages(defaultLocale);

    return (
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-32 text-center sm:px-8">
            <p className="font-mono text-sm text-primary">{text.error.code}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {text.error.title}
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
                {text.error.description}
            </p>
            <Link
                href={`/${defaultLocale}`}
                className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                {text.error.backHome}
            </Link>
        </div>
    );
}
