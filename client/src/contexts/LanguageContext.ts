import { createContext } from "react";
import type { Locale } from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

