import { TrendingUp, Users, Award, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Stats = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const stats = isEnglish ? [
    { icon: TrendingUp, value: "20+", label: "Years of experience", description: "in the masonry sector" },
    { icon: Users, value: "500+", label: "Projects completed", description: "for private and professional clients" },
    { icon: Award, value: "100%", label: "Customer satisfaction", description: "testimonials and recommendations" },
    { icon: Clock, value: "24h", label: "Guaranteed response", description: "personalised quote within 24 hours" },
  ] : [
    { icon: TrendingUp, value: "20+", label: "Années d'expertise", description: "dans le secteur de la maçonnerie" },
    { icon: Users, value: "500+", label: "Projets réalisés", description: "pour particuliers et professionnels" },
    { icon: Award, value: "100%", label: "Satisfaction client", description: "témoignages et recommandations" },
    { icon: Clock, value: "24h", label: "Réponse garantie", description: "devis personnalisé sous 24h" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-24 text-primary-foreground">
      <div className="absolute inset-0 opacity-10"><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold blur-3xl" /><div className="absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-secondary blur-3xl" /></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">{isEnglish ? "Figures that speak for themselves" : "Des chiffres qui parlent"}</h2>
          <p className="mx-auto max-w-2xl text-xl text-white/80">{isEnglish ? "Our experience and commitment to your projects" : "Notre expérience et notre engagement au service de vos projets"}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:bg-white/15">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-primary"><stat.icon className="h-8 w-8" /></div>
              <p className="mb-2 font-display text-5xl font-bold">{stat.value}</p>
              <p className="mb-1 text-lg font-semibold">{stat.label}</p>
              <p className="text-sm text-white/70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
