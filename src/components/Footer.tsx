import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const Footer = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-primary-foreground py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{company.name}</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {isEnglish ? "General masonry and structural work company based in Sedan, for private and professional clients." : "Entreprise de maçonnerie générale et gros œuvre située à Sedan, pour les particuliers et les professionnels."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{isEnglish ? "Navigation" : "Navigation"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {isEnglish ? "About us" : "Qui sommes-nous"}
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {isEnglish ? "Services" : "Nos prestations"}
                </a>
              </li>
              <li>
                <a href="#realisations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {isEnglish ? "Projects" : "Réalisations"}
                </a>
              </li>
              <li>
                <a href="#zone" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {isEnglish ? "Service area" : "Zone d'intervention"}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{isEnglish ? "Legal information" : "Informations légales"}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>{company.address.line1}</li>
              <li>{company.address.postalCode} {company.address.city}</li>
              <li><a href={company.phoneHref} className="hover:text-primary-foreground">{company.phoneDisplay}</a></li>
              <li className="pt-2">
                <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">
                  {isEnglish ? "Legal notice" : "Mentions légales"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>© {currentYear} {company.name} - {isEnglish ? "All rights reserved" : "Tous droits réservés"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
