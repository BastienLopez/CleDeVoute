import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const Footer = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-primary-foreground/15 bg-primary-dark text-primary-foreground">
      <div className="container px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(15rem,0.9fr)] lg:gap-10">
          <div>
            <Link to="/#top" className="inline-block font-display text-3xl font-semibold tracking-[-0.02em] transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.name}</Link>
            <p className="mt-2 max-w-md leading-relaxed text-primary-foreground/65">
              {isEnglish ? "General masonry and structural work company based in Sedan, for private and professional clients." : "Entreprise de maçonnerie générale et gros œuvre située à Sedan, pour les particuliers et les professionnels."}
            </p>
            <a href="#contact" className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
              {isEnglish ? "Contact the company" : "Contacter l'entreprise"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "Contact & legal" : "Contact & légal"}</h2>
            <address className="mt-3 space-y-1 text-sm not-italic text-primary-foreground/70">
              <p>{company.address.line1} {company.address.postalCode} {company.address.city}</p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a href={company.phoneHref} className="transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.phoneDisplay}</a>
                <span aria-hidden="true">-</span>
                <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{company.email}</a>
              </p>
            </address>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-primary-foreground/50">
              <Link to="/mentions-legales" className="underline decoration-primary-foreground/30 underline-offset-4 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">{isEnglish ? "Legal notice" : "Mentions légales"}</Link>
              <span aria-hidden="true">-</span>
              <span>© {currentYear} {company.name} — {isEnglish ? "All rights reserved" : "Tous droits réservés"}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
