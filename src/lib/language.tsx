import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type Language = "fr" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("site-language") === "en" ? "en" : "fr"));

  useEffect(() => {
    localStorage.setItem("site-language", language);
    document.documentElement.lang = language;
    document.title = language === "fr"
      ? "La clé de voûte | Maçonnerie générale et gros œuvre à Sedan"
      : "La clé de voûte | General masonry and structural work in Sedan";
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

// This hook is intentionally exported alongside its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
