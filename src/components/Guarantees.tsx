import { Shield, CheckCircle, FileCheck, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

const Guarantees = () => {
  const guarantees = [
    {
      icon: Shield,
      title: "Garantie décennale",
      description: "Tous nos travaux sont couverts par une garantie décennale et une assurance responsabilité civile professionnelle.",
      badge: "Obligatoire"
    },
    {
      icon: FileCheck,
      title: "Devis détaillé gratuit",
      description: "Nous vous proposons un devis transparent et détaillé, sans engagement, dans les 24h suivant votre demande.",
      badge: "Sans engagement"
    },
    {
      icon: CheckCircle,
      title: "Travaux conformes",
      description: "Respect strict des normes en vigueur (DTU) et des réglementations thermiques et environnementales.",
      badge: "Normes DTU"
    },
    {
      icon: Headphones,
      title: "Suivi personnalisé",
      description: "Un interlocuteur unique pour votre projet, disponible et à l'écoute tout au long des travaux.",
      badge: "Réactivité"
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-2 mb-6">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">Nos garanties</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Votre tranquillité, notre priorité
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des engagements concrets pour vous garantir qualité, sérieux et sécurité sur tous vos projets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/5 to-transparent rounded-bl-full" />
              
              <div className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <guarantee.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                    {guarantee.badge}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {guarantee.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
