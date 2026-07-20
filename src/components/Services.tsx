import { Building2, Wrench, Home, Hammer, Palette, BrickWall } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language";

const Services = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const services = isEnglish ? [
    { icon: Building2, title: "New construction", description: "New construction work, from individual homes to structural work.", features: ["Individual homes", "Foundations", "Crawl spaces, slabs and screeds"] },
    { icon: Wrench, title: "Renovation & rehabilitation", description: "Renovation and rehabilitation work on existing buildings.", features: ["Renovation", "Rehabilitation", "Facades"] },
    { icon: Home, title: "Extensions", description: "House extension work and associated masonry.", features: ["House extensions", "Walls", "Slabs and screeds"] },
    { icon: Hammer, title: "Structural work & masonry", description: "General masonry and structural work for indoor and outdoor sites.", features: ["Foundations", "Boundary walls", "Partitions and ceilings"] },
    { icon: Palette, title: "Stone, rendering & finishes", description: "Stonework, traditional render, tiling and mosaics.", features: ["Stonework", "Traditional rendering", "Tiling and mosaics"] },
    { icon: BrickWall, title: "Outdoor works", description: "Outdoor masonry for terraces, low walls, boundary walls and facades.", features: ["Terraces", "Low walls", "Boundary walls"] },
  ] : [
    {
      icon: Building2,
      title: "Construction neuve",
      description: "Travaux de construction neuve, de la maison individuelle aux ouvrages de gros œuvre.",
      features: ["Maisons individuelles", "Fondations", "Vides sanitaires, dalles et chapes"]
    },
    {
      icon: Wrench,
      title: "Rénovation & réhabilitation",
      description: "Travaux de rénovation et de réhabilitation sur le bâti existant.",
      features: ["Rénovation", "Réhabilitation", "Façades"]
    },
    {
      icon: Home,
      title: "Extension & agrandissement",
      description: "Travaux d'agrandissement de maison et maçonnerie associée.",
      features: ["Agrandissement de maison", "Murs", "Dalles et chapes"]
    },
    {
      icon: Hammer,
      title: "Gros œuvre & maçonnerie",
      description: "Maçonnerie générale et gros œuvre pour les chantiers intérieurs et extérieurs.",
      features: ["Fondations", "Murs de clôture", "Cloisons et plafonds"]
    },
    {
      icon: Palette,
      title: "Pierre, enduits & revêtements",
      description: "Travaux en pierre, pose d'enduits traditionnels, carrelages et mosaïques.",
      features: ["Pierres", "Enduits traditionnels", "Carrelages et mosaïques"]
    },
    {
      icon: BrickWall,
      title: "Aménagements extérieurs",
      description: "Maçonnerie extérieure pour terrasses, murets, murs de clôture et façades.",
      features: ["Terrasses", "Murets", "Murs de clôture"]
    }
  ];

  return (
    <section id="services" className="section-transition section-transition-from-white-to-stone scroll-mt-24 bg-stone py-24">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-2 mb-6">
            <Hammer className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">{isEnglish ? "Our services" : "Nos prestations"}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {isEnglish ? "Our masonry expertise" : "Nos savoir-faire en maçonnerie"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {isEnglish ? "From new builds to renovation work, La clé de voûte takes on a wide range of indoor and outdoor projects." : "De la construction neuve aux travaux de rénovation, La clé de voûte intervient sur une large variété de projets intérieurs et extérieurs."}
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
