import { BrickWall, Building2, Palette, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Services = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const services = isEnglish
    ? [
        {
          number: "01",
          icon: Building2,
          title: "Construction & structural work",
          description: "New construction work, from individual homes to structural work and associated masonry.",
          features: ["Individual homes", "Foundations", "Crawl spaces, slabs and screeds", "Extensions, walls, partitions and ceilings", "Boundary walls"],
        },
        {
          number: "02",
          icon: Wrench,
          title: "Renovation & rehabilitation",
          description: "Renovation and rehabilitation work on existing buildings, indoors and outdoors.",
          features: ["Renovation", "Rehabilitation", "Facades"],
        },
        {
          number: "03",
          icon: Palette,
          title: "Stone, render & finishes",
          description: "Stonework, traditional render, tiling and mosaics for projects that need a considered finish.",
          features: ["Stonework", "Traditional rendering", "Tiling and mosaics"],
        },
        {
          number: "04",
          icon: BrickWall,
          title: "Outdoor works",
          description: "Outdoor masonry for terraces, low walls, boundary walls and external access.",
          features: ["Terraces", "Paving", "Low walls", "Boundary walls", "Outdoor access"],
        },
      ]
    : [
        {
          number: "01",
          icon: Building2,
          title: "Construction & gros œuvre",
          description: "Travaux de construction neuve, de la maison individuelle aux ouvrages de gros œuvre et à la maçonnerie associée.",
          features: ["Maisons individuelles", "Fondations", "Vides sanitaires, dalles et chapes", "Extensions, murs, cloisons et plafonds", "Murs de clôture"],
        },
        {
          number: "02",
          icon: Wrench,
          title: "Rénovation & réhabilitation",
          description: "Travaux de rénovation et de réhabilitation sur le bâti existant, en intérieur comme en extérieur.",
          features: ["Rénovation", "Réhabilitation", "Façades"],
        },
        {
          number: "03",
          icon: Palette,
          title: "Pierre, enduits & revêtements",
          description: "Travaux en pierre, pose d'enduits traditionnels, carrelages et mosaïques pour des finitions soignées.",
          features: ["Pierres", "Enduits traditionnels", "Carrelages et mosaïques"],
        },
        {
          number: "04",
          icon: BrickWall,
          title: "Aménagements extérieurs",
          description: "Maçonnerie extérieure pour terrasses, dallages, murets, murs de clôture et accès extérieurs.",
          features: ["Terrasses", "Dallages", "Murets", "Murs de clôture", "Accès extérieurs"],
        },
      ];

  return (
    <section id="services" className="scroll-mt-24 bg-stone">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-primary/15 pb-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "What we do" : "Nos prestations"}</p>
          <div>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-primary-dark sm:text-5xl">
              {isEnglish ? "Build, renovate and work with stone." : "Construire, rénover et travailler la pierre."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {isEnglish ? "Each intervention starts with the existing building, its constraints and the use expected from the finished space." : "Chaque intervention part du bâti, de ses contraintes et de l'usage attendu une fois les travaux terminés."}
            </p>
          </div>
        </div>

        <div className="divide-y divide-primary/15">
          {services.map((service) => (
            <article key={service.number} className="grid gap-7 py-9 lg:grid-cols-[5rem_minmax(15rem,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-10 lg:py-11">
              <div className="flex items-center justify-between lg:block">
                <span className="font-mono text-sm font-semibold tracking-[0.18em] text-primary/45">{service.number}</span>
                <service.icon className="h-7 w-7 text-secondary lg:mt-8" aria-hidden="true" />
              </div>
              <h3 className="max-w-sm font-display text-3xl font-semibold leading-tight text-primary-dark sm:text-4xl">{service.title}</h3>
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,0.8fr)] sm:gap-10">
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="grid content-start gap-3 text-sm text-foreground sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
