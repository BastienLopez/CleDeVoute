import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";
  const navigation = [
    { href: "#about", label: isEnglish ? "About" : "À propos" },
    { href: "#services", label: isEnglish ? "Services" : "Prestations" },
    { href: "#realisations", label: isEnglish ? "Projects" : "Réalisations" },
    { href: "#zone", label: isEnglish ? "Service area" : "Zone d'intervention" },
    { href: "#contact", label: isEnglish ? "Contact" : "Contact" },
  ];
  const selectLanguage = (nextLanguage: "fr" | "en") => {
    setLanguage(nextLanguage);
    setLanguageOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary-dark/50 text-white shadow-lg backdrop-blur">
      <div className="container relative flex h-20 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0 font-display text-xl font-bold tracking-tight text-gold sm:text-2xl" onClick={() => setMenuOpen(false)}>
          La clé de voûte
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 xl:flex" aria-label={isEnglish ? "Main navigation" : "Navigation principale"}>
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-sm font-semibold text-white/75 transition-colors hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <div className="relative">
            <button type="button" onClick={() => setLanguageOpen((open) => !open)} className="flex items-center gap-2 rounded-xl border border-gold/80 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10" aria-expanded={languageOpen} aria-haspopup="menu">
              <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
              {language.toUpperCase()}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg border border-white/10 bg-primary p-2 text-sm shadow-xl" role="menu">
                <button type="button" onClick={() => selectLanguage("fr")} className={`block w-full rounded-md px-3 py-2 text-left ${language === "fr" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>FR</button>
                <button type="button" onClick={() => selectLanguage("en")} className={`block w-full rounded-md px-3 py-2 text-left ${language === "en" ? "bg-white/10 font-semibold" : "hover:bg-white/10"}`}>EN</button>
              </div>
            )}
          </div>
          <a href="#contact" className="rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
            {isEnglish ? "Contact us" : "Nous contacter"}
          </a>
        </div>

        <button type="button" className="rounded-lg p-2 text-white xl:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={isEnglish ? "Open menu" : "Ouvrir le menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-primary px-4 py-4 xl:hidden" aria-label={isEnglish ? "Mobile navigation" : "Navigation mobile"}>
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 font-medium text-white/80 hover:bg-white/10 hover:text-gold">{item.label}</a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => selectLanguage("fr")} className={`rounded-md py-2 ${language === "fr" ? "bg-white/15" : "bg-white/5"}`}>FR</button>
              <button type="button" onClick={() => selectLanguage("en")} className={`rounded-md py-2 ${language === "en" ? "bg-white/15" : "bg-white/5"}`}>EN</button>
            </div>
            <a href={company.phoneHref} className="mt-2 rounded-md bg-secondary px-3 py-3 text-center font-semibold text-white">{isEnglish ? "Call the company" : "Appeler l'entreprise"}</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
