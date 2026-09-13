export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isRtl(locale: Locale) {
    return locale === "ar";
}
