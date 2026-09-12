import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    ThemeProvider,
    THEME_INIT_SCRIPT,
} from "@/components/providers/theme-provider";
import { isLocale, locales, isRtl, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "../globals.css";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale: rawLocale } = await params;
    const locale: Locale = isLocale(rawLocale) ? rawLocale : "ar";
    const text = getMessages(locale);

    return {
        title: `${text.profile.fullName} | ${text.profile.title}`,
        description: text.hero.summary,
        alternates: {
            languages: {
                ar: "/ar",
                en: "/en",
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    if (!isLocale(rawLocale)) {
        notFound();
    }
    const locale = rawLocale;
    const dir = isRtl(locale) ? "rtl" : "ltr";
    const text = getMessages(locale);

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/brand/favicon-dark.svg"
                />
                <link
                    rel="preload"
                    as="font"
                    type="font/ttf"
                    href="/fonts/SpaceGrotesk.ttf"
                    crossOrigin="anonymous"
                />
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body>
                <ThemeProvider>
                    <SiteHeader locale={locale} text={text} />
                    <main>{children}</main>
                    <SiteFooter locale={locale} text={text} />
                </ThemeProvider>
            </body>
        </html>
    );
}
