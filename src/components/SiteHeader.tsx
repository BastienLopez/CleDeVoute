import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";
  const navigation = [
    { href: "#about", label: isEnglish ? "About" : "À propos" },
    { href: "#services", label: isEnglish ? "Services" : "Prestations" },
    { href: "#realisations", label: isEnglish ? "Projects" : "Réalisations" },
    { href: "#zone", label: isEnglish ? "Service area" : "Zone d'intervention" },
    { href: "#contact", label: "Contact" },
  ];

  const selectLanguage = (nextLanguage: "fr" | "en") => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeMenus);
    return () => window.removeEventListener("keydown", closeMenus);
  }, []);

  useEffect(() => {
    if (!languageOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setLanguageOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [languageOpen]);

  return (
    <header className="relative z-50 border-b border-primary/10 bg-background text-primary shadow-sm lg:fixed lg:inset-x-0 lg:top-0">
      <div className="container relative flex min-h-20 min-w-0 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="hidden shrink-0 lg:block" onClick={() => setMenuOpen(false)} aria-label="La clé de voûte">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="La clé de voûte" width={551} height={164} className="h-9 w-auto sm:h-11" />
        </a>
        <a href="#top" className="absolute left-1/2 top-1/2 inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap font-display text-2xl font-semibold tracking-[-0.02em] text-primary lg:hidden" onClick={() => setMenuOpen(false)} aria-label="La clé de voûte">
          Clé de Voûte
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-8" aria-label={isEnglish ? "Main navigation" : "Navigation principale"}>
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-sm font-semibold text-primary/75 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <div ref={languageMenuRef} className="relative">
            <button type="button" onClick={() => setLanguageOpen((open) => !open)} className="flex items-center gap-2 rounded-md border border-primary/20 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20" aria-expanded={languageOpen} aria-controls="language-menu" aria-haspopup="menu">
              <Languages className="h-4 w-4 text-secondary" aria-hidden="true" />
              {language.toUpperCase()}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {languageOpen && (
              <div id="language-menu" className="absolute right-0 mt-2 w-32 rounded-md border border-border bg-background p-2 text-sm shadow-xl" role="menu" aria-label={isEnglish ? "Language" : "Langue"}>
                <button type="button" role="menuitem" onClick={() => selectLanguage("fr")} className={`block w-full rounded px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 ${language === "fr" ? "bg-primary/10 font-semibold" : "hover:bg-primary/5"}`}>FR</button>
                <button type="button" role="menuitem" onClick={() => selectLanguage("en")} className={`block w-full rounded px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 ${language === "en" ? "bg-primary/10 font-semibold" : "hover:bg-primary/5"}`}>EN</button>
              </div>
            )}
          </div>
          <a href="#contact" className="rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/25">
            {isEnglish ? "Contact us" : "Nous contacter"}
          </a>
        </div>

        <button type="button" className="absolute right-4 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-md p-2 text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 sm:right-6 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? (isEnglish ? "Close menu" : "Fermer le menu") : (isEnglish ? "Open menu" : "Ouvrir le menu")} aria-controls="mobile-navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="border-t border-primary/10 bg-background px-4 py-4 lg:hidden" aria-label={isEnglish ? "Mobile navigation" : "Navigation mobile"}>
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 font-medium text-primary/80 transition-colors hover:bg-primary/5 hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">{item.label}</a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => selectLanguage("fr")} className={`rounded-md py-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 ${language === "fr" ? "bg-primary/10 font-semibold" : "bg-primary/5"}`}>FR</button>
              <button type="button" onClick={() => selectLanguage("en")} className={`rounded-md py-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 ${language === "en" ? "bg-primary/10 font-semibold" : "bg-primary/5"}`}>EN</button>
            </div>
            <a href={company.phoneHref} className="mt-2 rounded-md bg-secondary px-3 py-3 text-center font-semibold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/25">{isEnglish ? "Call the company" : "Appeler l'entreprise"}</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
