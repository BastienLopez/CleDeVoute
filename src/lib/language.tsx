import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type Language = "fr" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("site-language") === "en" ? "en" : "fr"));
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem("site-language", language);
    document.documentElement.lang = language;
    const isLegalPage = pathname === "/mentions-legales";
    const isHomePage = pathname === "/";
    const metadata = isLegalPage
      ? {
          title: language === "fr" ? "Mentions légales | La clé de voûte" : "Legal notice | La clé de voûte",
          description: language === "fr" ? "Mentions légales de La clé de voûte." : "Legal notice for La clé de voûte.",
          ogDescription: language === "fr" ? "Informations sur l'éditeur, l'hébergement et l'utilisation du site." : "Information about the website publisher, hosting and use of the website.",
          indexable: true,
        }
      : isHomePage
        ? {
            title: language === "fr" ? "La clé de voûte | Maçonnerie générale et gros œuvre à Sedan" : "La clé de voûte | General masonry and structural work in Sedan",
            description: language === "fr" ? "La clé de voûte, entreprise de maçonnerie générale et gros œuvre à Sedan : construction neuve, rénovation, pierre, terrasses et travaux intérieurs ou extérieurs." : "La clé de voûte, general masonry and structural work company in Sedan: new builds, renovation, stonework, terraces and indoor or outdoor projects.",
            ogDescription: language === "fr" ? "Maçonnerie générale et gros œuvre à Sedan : construction neuve, rénovation, pierre, terrasses et aménagements extérieurs." : "General masonry and structural work in Sedan: new builds, renovation, stonework, terraces and outdoor works.",
            indexable: true,
          }
        : {
            title: language === "fr" ? "Page introuvable | La clé de voûte" : "Page not found | La clé de voûte",
            description: language === "fr" ? "La page demandée n'existe pas sur le site de La clé de voûte." : "The requested page does not exist on the La clé de voûte website.",
            ogDescription: language === "fr" ? "La page demandée n'existe pas sur le site de La clé de voûte." : "The requested page does not exist on the La clé de voûte website.",
            indexable: false,
          };

    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", metadata.indexable ? "index, follow" : "noindex, follow");
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.ogDescription);

    const canonicalElement = document.querySelector('link[rel="canonical"]');
    const ogUrlElement = document.querySelector('meta[property="og:url"]');
    const ogImageElement = document.querySelector('meta[property="og:image"]');
    const twitterImageElement = document.querySelector('meta[name="twitter:image"]');
    const canonicalBase = new URL(import.meta.env.BASE_URL, window.location.origin);
    const canonicalUrl = new URL(isHomePage ? "" : pathname.replace(/^\/+/, ""), canonicalBase).href;
    if (metadata.indexable) {
      canonicalElement?.setAttribute("href", canonicalUrl);
      ogUrlElement?.setAttribute("content", canonicalUrl);
      const ogImageUrl = new URL("og-image.jpg", canonicalBase).href;
      ogImageElement?.setAttribute("content", ogImageUrl);
      twitterImageElement?.setAttribute("content", ogImageUrl);
    } else {
      canonicalElement?.remove();
      ogUrlElement?.remove();
      ogImageElement?.remove();
      twitterImageElement?.remove();
    }
  }, [language, pathname]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

// This hook is intentionally exported alongside its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
