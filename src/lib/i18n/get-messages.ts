import { messages, type MessageCatalog } from "./messages";
import type { Locale } from "./config";

export function getMessages(locale: Locale): MessageCatalog {
    return messages[locale];
}

export function getProjectText(
    locale: Locale,
    name: string,
    description: string,
    codeSummary: string,
) {
    if (locale !== "ar") {
        return { name, description, codeSummary };
    }

    const text = getMessages(locale);
    const projectTranslation = text.projects.projectCopy[name];

    return {
        name: projectTranslation?.name ?? name,
        description: projectTranslation?.description ?? description,
        codeSummary: projectTranslation?.codeSummary ?? codeSummary,
    };
}
