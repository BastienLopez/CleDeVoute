import { Award, Map, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Stats = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const highlights = isEnglish
    ? [
        {
          icon: TrendingUp,
          value: "20+",
          label: "Years of experience",
          description: "A lasting practice of the masonry trade.",
        },
        {
          icon: Users,
          value: "500+",
          label: "Projects completed",
          description: "For private and professional clients.",
        },
        {
          icon: Award,
          value: "Master craftsman certificate",
          label: "Qualified mason",
          description: "A recognised qualification in masonry.",
        },
        {
          icon: Map,
          value: "A journey across France",
          label: "Enriched expertise",
          description: "Different masonry techniques learned along the way.",
        },
      ]
    : [
        {
          icon: TrendingUp,
          value: "20+",
          label: "Années d'expertise",
          description: "Une pratique durable du métier de maçon.",
        },
        {
          icon: Users,
          value: "500+",
          label: "Projets réalisés",
          description: "Pour les particuliers et les professionnels.",
        },
        {
          icon: Award,
          value: "Brevet de maîtrise",
          label: "Artisan maçon qualifié",
          description: "Une qualification reconnue en maçonnerie.",
        },
        {
          icon: Map,
          value: "Tour de France",
          label: "Un savoir-faire enrichi",
          description:
            "Différentes techniques de maçonnerie acquises au fil du parcours.",
        },
      ];

  return (
    <section className="bg-stone py-24">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            La clé de voûte
          </p>

          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            {isEnglish
              ? "Experience & expertise"
              : "Expérience & savoir-faire"}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {isEnglish
              ? "A profession shaped by practice, qualifications and a broad range of techniques."
              : "Un métier façonné par la pratique, les qualifications et une large maîtrise des techniques."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <article
              key={highlight.label}
              className="rounded-2xl border border-stone-dark/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-[14px] flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <highlight.icon className="h-7 w-7" />
              </div>

              <p className="flex min-h-14 -translate-y-[10px] items-center justify-center text-center font-display text-3xl font-bold leading-tight text-foreground">
                {highlight.value}
              </p>

              <h3 className="mt-1 text-lg font-bold text-foreground">
                {highlight.label}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
