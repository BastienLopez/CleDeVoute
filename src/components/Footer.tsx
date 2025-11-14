import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">La clé de voûte</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Entreprise de maçonnerie générale et gros œuvre située à Sedan (Ardennes). 
              Nous intervenons pour les particuliers et professionnels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Qui sommes-nous
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Nos prestations
                </a>
              </li>
              <li>
                <a href="#realisations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Réalisations
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
            <h3 className="text-xl font-bold mb-4">Informations légales</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>SIREN: 437 685 043</li>
              <li>4 Place de l'Épine</li>
              <li>08200 Sedan</li>
              <li className="pt-2">
                <Link to="/mentions-legales" className="hover:text-primary-foreground transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>© {currentYear} La clé de voûte - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
