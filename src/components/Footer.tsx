import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const Footer = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const currentYear = new Date().getFullYear();
  const navigation = [
    { href: "#about", label: isEnglish ? "About" : "À propos" },
    { href: "#services", label: isEnglish ? "Services" : "Prestations" },
    { href: "#realisations", label: isEnglish ? "Projects" : "Réalisations" },
    { href: "#zone", label: isEnglish ? "Service area" : "Zone d'intervention" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-primary-foreground/15 bg-primary-dark pb-12 pt-12 text-primary-foreground lg:pb-14 sm:pt-14">
      <div className="container px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(12rem,0.6fr)_minmax(15rem,0.8fr)] lg:gap-16">
          <div>
            <Link to="/#top" className="inline-block font-display text-3xl font-semibold tracking-[-0.02em] transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.name}</Link>
            <p className="mt-4 max-w-md leading-relaxed text-primary-foreground/65">
              {isEnglish ? "General masonry and structural work company based in Sedan, for private and professional clients." : "Entreprise de maçonnerie générale et gros œuvre située à Sedan, pour les particuliers et les professionnels."}
            </p>
            <a href="#contact" className="mt-7 inline-flex items-center gap-2 font-semibold text-secondary transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
              {isEnglish ? "Contact the company" : "Contacter l'entreprise"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label={isEnglish ? "Footer navigation" : "Navigation pied de page"}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "Navigation" : "Navigation"}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}><a href={item.href} className="text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{item.label}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "Contact & legal" : "Contact & légal"}</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-primary-foreground/70">
              <p>{company.address.line1}<br />{company.address.postalCode} {company.address.city}</p>
              <p><a href={company.phoneHref} className="transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.phoneDisplay}</a></p>
              <p><a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.email}</a></p>
              <p className="pt-2"><Link to="/mentions-legales" className="underline decoration-primary-foreground/30 underline-offset-4 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{isEnglish ? "Legal notice" : "Mentions légales"}</Link></p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {company.name} — {isEnglish ? "All rights reserved" : "Tous droits réservés"}</p>
          <p>{isEnglish ? "General masonry & structural work" : "Maçonnerie générale & gros œuvre"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
