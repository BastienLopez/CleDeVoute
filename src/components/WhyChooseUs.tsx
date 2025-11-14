import { Shield, Users, Award, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: Award,
      title: "Expérience locale",
      description: "Implantés à Sedan et connaissant parfaitement les Ardennes"
    },
    {
      icon: Users,
      title: "Particuliers & Professionnels",
      description: "Nous adaptons nos services à tous types de clients"
    },
    {
      icon: Shield,
      title: "Travail soigné",
      description: "Chantiers intérieurs & extérieurs réalisés avec professionnalisme"
    },
    {
      icon: Clock,
      title: "Relation de confiance",
      description: "Nous privilégions la transparence et le respect des engagements"
    }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pourquoi nous choisir ?
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
