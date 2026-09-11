import { Award, Map, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Stats = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const highlights = isEnglish
    ? [
        { icon: TrendingUp, value: "20+", label: "Years of experience", description: "A lasting practice of the masonry trade." },
        { icon: Users, value: "500+", label: "Projects completed", description: "For private and professional clients." },
        { icon: Award, value: "Master craftsman certificate", label: "Qualified mason", description: "A recognised qualification in masonry." },
        { icon: Map, value: "A journey across France", label: "Enriched expertise", description: "Different masonry techniques learned along the way." },
      ]
    : [
        { icon: TrendingUp, value: "20+", label: "Années d'expertise", description: "Une pratique durable du métier de maçon." },
        { icon: Users, value: "500+", label: "Projets réalisés", description: "Pour les particuliers et les professionnels." },
        { icon: Award, value: "Brevet de maîtrise", label: "Artisan maçon qualifié", description: "Une qualification reconnue en maçonnerie." },
        { icon: Map, value: "Tour de France", label: "Un savoir-faire enrichi", description: "Différentes techniques de maçonnerie acquises au fil du parcours." },
      ];

  return (
    <section aria-labelledby="proof-title" className="border-y border-primary-dark/10 bg-primary-dark text-primary-foreground">
      <div className="container px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.7fr)] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              {isEnglish ? "Experience & expertise" : "Expérience & savoir-faire"}
            </p>
            <h2 id="proof-title" className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isEnglish ? "A craft built on practice." : "Un métier construit par la pratique."}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
            {highlights.map((highlight) => (
              <article key={highlight.label} className="min-w-0 border-l border-primary-foreground/20 pl-4 sm:pl-5">
                <highlight.icon className="mb-5 h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="break-words font-display text-2xl font-bold leading-tight text-primary-foreground sm:text-3xl">{highlight.value}</p>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-primary-foreground">{highlight.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
