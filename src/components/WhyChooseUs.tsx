import { Building2, Users, Hammer, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language";

const WhyChooseUs = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const advantages = isEnglish ? [
    { icon: MapPin, title: "Based in Sedan", description: "A general masonry company based in Sedan." },
    { icon: Users, title: "Private & professional clients", description: "The company works with both types of clients." },
    { icon: Hammer, title: "Indoor & outdoor sites", description: "Masonry work for indoor and outdoor projects." },
    { icon: Building2, title: "Trusting relationships", description: "Building a trusting relationship with clients is central to the company." },
  ] : [
    {
      icon: MapPin,
      title: "Basée à Sedan",
      description: "Une entreprise de maçonnerie générale implantée à Sedan."
    },
    {
      icon: Users,
      title: "Particuliers & Professionnels",
      description: "Nous adaptons nos services à tous types de clients"
    },
    {
      icon: Hammer,
      title: "Chantiers intérieurs & extérieurs",
      description: "Des interventions sur des travaux de maçonnerie intérieurs et extérieurs."
    },
    {
      icon: Building2,
      title: "Relation de confiance",
      description: "Une relation de confiance avec les clients est au cœur de la démarche de l'entreprise."
    }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {isEnglish ? "Why choose us?" : "Pourquoi nous choisir ?"}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 group"
            >
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-secondary/20 transition-colors">
                <advantage.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">{advantage.title}</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
