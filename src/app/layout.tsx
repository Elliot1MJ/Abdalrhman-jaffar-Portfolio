import type { Metadata } from "next";
import {
    ThemeProvider,
    THEME_INIT_SCRIPT,
} from "@/components/providers/theme-provider";
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
import "./globals.css";

const text = getMessages("en");

export const metadata: Metadata = {
    title: `${text.profile.fullName} | ${text.profile.title}`,
    description: text.hero.summary,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
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
                <script
                    dangerouslySetInnerHTML={{ __html: LANGUAGE_INIT_SCRIPT }}
                />
            </head>
            <body>
                <LanguageProvider>
                    <ThemeProvider>
                        <MotionProvider>
                            <TooltipProvider delayDuration={200}>
                                <div className="relative">
                                    <CodeGlyphBackdrop />
                                    <SiteHeader />
                                    <main>{children}</main>
                                    <SiteFooter />
                                </div>
                            </TooltipProvider>
                        </MotionProvider>
                    </ThemeProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
