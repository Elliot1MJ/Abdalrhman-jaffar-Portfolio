import type { Metadata } from "next";
import {
    LanguageProvider,
    LANGUAGE_INIT_SCRIPT,
} from "@/lib/i18n/language-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getMessages } from "@/lib/i18n/get-messages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CodeGlyphBackdrop } from "@/components/shared/code-glyph-backdrop";
import { OctopusBackdrop } from "@/components/shared/octopus-backdrop";
import { PageTransition } from "@/components/shared/page-transition";
import { ScrollProvider } from "@/components/providers/scroll-provider";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { CursorFollow } from "@/components/shared/cursor-follow";
import "./globals.css";

const text = getMessages("en");

const SITE_URL = "https://abdalrhman-jaffar-portfolio.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${text.profile.fullName} — ${text.profile.title}`,
        template: `%s — ${text.profile.fullName}`,
    },
    description: text.seo.description,
    keywords: text.seo.keywords.split(",").map((keyword) => keyword.trim()),
    authors: [{ name: text.profile.fullName }],
    creator: text.profile.fullName,
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "The Octopus",
        title: text.seo.ogTitle,
        description: text.seo.ogDescription,
        locale: text.seo.locale,
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: text.seo.ogTitle,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: text.seo.ogTitle,
        description: text.seo.ogDescription,
        images: ["/images/og-image.jpg"],
    },
    icons: {
        icon: [
            { url: "/brand/favicon-dark.svg", type: "image/svg+xml" },
        ],
        shortcut: "/brand/favicon-dark.svg",
        apple: "/brand/favicon-dark.svg",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    /*
     * `data-theme="dark"` is hardcoded below: the site is dark-only.
     *
     * There used to be a ThemeProvider, a light palette and an inline script
     * that read a stored preference before paint. The owner asked for the whole
     * feature to go — the toggle kept hanging the page — so the attribute is
     * now a constant. The token blocks in globals.css still key off it, which
     * is why it stays in the markup at all.
     */
    return (
        <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
            <head>
                {/* Space Grotesk carries the headline and every numeral, so it
                    is the only face on the critical path worth preloading. */}
                <link
                    rel="preload"
                    as="font"
                    type="font/ttf"
                    href="/fonts/SpaceGrotesk.ttf"
                    crossOrigin="anonymous"
                />
                <meta name="theme-color" content="#111114" />
                <script
                    dangerouslySetInnerHTML={{ __html: LANGUAGE_INIT_SCRIPT }}
                />
            </head>
            <body>
                <LanguageProvider>
                    <MotionProvider>
                        <ScrollProvider>
                            <TooltipProvider delayDuration={200}>
                                <a
                                    href="#main"
                                    className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
                                >
                                    {text.nav.skipToContent}
                                </a>
                                <div className="relative">
                                    <CodeGlyphBackdrop />
                                    <OctopusBackdrop />
                                    <SiteHeader />
                                    <ScrollProgress />
                                    <CursorFollow />
                                    <main id="main" className="pt-(--nav-height)">
                                        <PageTransition>{children}</PageTransition>
                                    </main>
                                    <SiteFooter />
                                </div>
                            </TooltipProvider>
                        </ScrollProvider>
                    </MotionProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
