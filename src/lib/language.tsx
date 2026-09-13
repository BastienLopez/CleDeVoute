import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { company } from "@/data/company";

export type Language = "fr" | "en";

const serviceNames = [
  "Construction et gros œuvre",
  "Rénovation et réhabilitation",
  "Pierre, enduits et revêtements",
  "Aménagements extérieurs",
] as const;

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
    const twitterTitleElement = document.querySelector('meta[name="twitter:title"]');
    const twitterDescriptionElement = document.querySelector('meta[name="twitter:description"]');
    const twitterImageElement = document.querySelector('meta[name="twitter:image"]');
    const canonicalBase = new URL(import.meta.env.BASE_URL, window.location.origin);
    const canonicalUrl = new URL(isHomePage ? "" : pathname.replace(/^\/+/, ""), canonicalBase).href;
    let structuredDataElement = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (metadata.indexable && !structuredDataElement) {
      structuredDataElement = document.createElement("script");
      structuredDataElement.type = "application/ld+json";
      document.head.appendChild(structuredDataElement);
    }

    const homeStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "GeneralContractor",
          "@id": `${canonicalBase.href}#business`,
          name: company.name,
          legalName: company.legalName,
          description: "Entreprise de maçonnerie générale et gros œuvre à Sedan.",
          url: canonicalBase.href,
          image: new URL("og-image.jpg", canonicalBase).href,
          logo: new URL("logo.png", canonicalBase).href,
          telephone: "+33669158671",
          email: company.email,
          identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: company.siren.replace(/\s/g, "") },
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.line1,
            postalCode: company.address.postalCode,
            addressLocality: company.address.city,
            addressCountry: "FR",
          },
          areaServed: [
            { "@type": "City", name: "Sedan", containedInPlace: { "@type": "AdministrativeArea", name: "Ardennes" } },
            { "@type": "AdministrativeArea", name: "Ardennes" },
          ],
          serviceType: serviceNames,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Prestations de maçonnerie",
            itemListElement: serviceNames.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
          },
          mainEntityOfPage: { "@id": `${canonicalBase.href}#webpage` },
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalBase.href}#website`,
          url: canonicalBase.href,
          name: company.name,
          inLanguage: "fr-FR",
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalBase.href}#webpage`,
          url: canonicalBase.href,
          name: metadata.title,
          isPartOf: { "@id": `${canonicalBase.href}#website` },
          about: { "@id": `${canonicalBase.href}#business` },
          inLanguage: language === "fr" ? "fr-FR" : "en-US",
        },
      ],
    };

    if (metadata.indexable) {
      canonicalElement?.setAttribute("href", canonicalUrl);
      ogUrlElement?.setAttribute("content", canonicalUrl);
      twitterTitleElement?.setAttribute("content", metadata.title);
      twitterDescriptionElement?.setAttribute("content", metadata.ogDescription);
      const ogImageUrl = new URL("og-image.jpg", canonicalBase).href;
      ogImageElement?.setAttribute("content", ogImageUrl);
      twitterImageElement?.setAttribute("content", ogImageUrl);

      if (isHomePage && structuredDataElement) {
        structuredDataElement.textContent = JSON.stringify(homeStructuredData);
      } else if (isLegalPage && structuredDataElement) {
        structuredDataElement.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: { "@id": `${canonicalBase.href}#website` },
          about: { "@id": `${canonicalBase.href}#business` },
          inLanguage: language === "fr" ? "fr-FR" : "en-US",
        });
      }
    } else {
      canonicalElement?.remove();
      ogUrlElement?.remove();
      ogImageElement?.remove();
      twitterTitleElement?.remove();
      twitterDescriptionElement?.remove();
      twitterImageElement?.remove();
      structuredDataElement?.remove();
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
