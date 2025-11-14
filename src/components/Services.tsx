import { Building2, Wrench, Home, Hammer, Palette, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Construction neuve",
      description: "De la conception à la livraison, nous réalisons votre projet de construction avec des matériaux de qualité premium et un savoir-faire reconnu.",
      features: ["Maisons individuelles", "Bâtiments professionnels", "Fondations & gros œuvre"]
    },
    {
      icon: Wrench,
      title: "Rénovation complète",
      description: "Remise à neuf de votre bâtiment en préservant son authenticité tout en améliorant ses performances thermiques et esthétiques.",
      features: ["Réhabilitation façades", "Mise aux normes", "Isolation & étanchéité"]
    },
    {
      icon: Home,
      title: "Extension & agrandissement",
      description: "Gagnez en espace de vie avec une extension parfaitement intégrée à votre habitation existante, dans le respect de l'architecture.",
      features: ["Extensions latérales", "Surélévations", "Vérandas maçonnées"]
    },
    {
      icon: Hammer,
      title: "Gros œuvre & maçonnerie",
      description: "Tous travaux de maçonnerie générale pour particuliers et professionnels : fondations, murs porteurs, dalles, chapes...",
      features: ["Fondations béton", "Murs & cloisons", "Dalles & chapes"]
    },
    {
      icon: Palette,
      title: "Façades & ravalement",
      description: "Embellissez et protégez votre bien avec nos solutions de ravalement, enduit, crépi et habillage de façades en pierre ou brique.",
      features: ["Ravalement complet", "Enduits décoratifs", "Parement pierre"]
    },
    {
      icon: Lightbulb,
      title: "Aménagements extérieurs",
      description: "Création de terrasses, murets, allées et tous aménagements extérieurs pour valoriser votre propriété.",
      features: ["Terrasses dallées", "Murets & clôtures", "Allées & pavages"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-2 mb-6">
            <Hammer className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">Nos expertises</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Une gamme complète de services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Du gros œuvre à la finition, nous maîtrisons toutes les facettes de la maçonnerie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-secondary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
