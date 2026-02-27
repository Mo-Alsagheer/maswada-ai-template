import { LanguageContext } from "./LanguageContext";
import { useEffect, useState } from "react";
import { defaultLocale, type Locale } from "@/i18n";

type LanguageProviderProps = {
  children: React.ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem("locale");
    return (savedLocale as Locale) || defaultLocale;
  });
  const isRTL = locale === "ar";
  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    localStorage.setItem("locale", locale);
  }, [locale, isRTL]);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, isRTL, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
