import { createContext } from "react";
import type { Language, MessageCatalog } from "./messages";

interface ProjectText {
    name: string;
    description: string;
}

export interface I18nContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
    languageButtonLabel: string;
    isRtl: boolean;
    text: MessageCatalog;
    getProjectText: (name: string, description: string) => ProjectText;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
