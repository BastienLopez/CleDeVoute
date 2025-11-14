import { TrendingUp, Users, Award, Clock } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "20+",
      label: "Années d'expertise",
      description: "dans le secteur de la maçonnerie"
    },
    {
      icon: Users,
      value: "500+",
      label: "Projets réalisés",
      description: "pour particuliers et professionnels"
    },
    {
      icon: Award,
      value: "100%",
      label: "Satisfaction client",
      description: "témoignages et recommandations"
    },
    {
      icon: Clock,
      value: "24h",
      label: "Réponse garantie",
      description: "devis personnalisé sous 24h"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Des chiffres qui parlent
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Notre expérience et notre engagement au service de vos projets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-5xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-white/70">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
