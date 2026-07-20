import { Award, Handshake, Hammer, Map } from "lucide-react";
import { useLanguage } from "@/lib/language";

const About = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const commitments = isEnglish
    ? [
        { icon: Award, title: "Master craftsman certificate", description: "A recognised masonry qualification." },
        { icon: Map, title: "A rich professional journey", description: "Different techniques acquired across France." },
        { icon: Hammer, title: "Broad masonry expertise", description: "New builds, renovation, stonework and outdoor works." },
        { icon: Handshake, title: "A relationship of trust", description: "A careful approach to every project." },
      ]
    : [
        { icon: Award, title: "Brevet de maîtrise", description: "Une qualification forte dans le métier de maçon." },
        { icon: Map, title: "Un parcours riche", description: "Différentes techniques acquises au cours du Tour de France." },
        { icon: Hammer, title: "Une maçonnerie complète", description: "Construction, rénovation, pierre et aménagements extérieurs." },
        { icon: Handshake, title: "Une relation de confiance", description: "Une attention portée à chaque projet et à chaque client." },
      ];

  return (
    <section id="about" className="section-transition section-transition-from-stone-to-white scroll-mt-24 bg-background py-24">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-12 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {isEnglish ? "The company" : "L'entreprise"}
                </p>
                <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                  {isEnglish ? "A craft built on experience" : "Un savoir-faire construit avec l'expérience"}
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  {isEnglish ? (
                    <>Based in <strong className="text-foreground">Sedan</strong>, <strong className="text-foreground">La clé de voûte</strong> carries out general masonry and structural work for private and professional clients.</>
                  ) : (
                    <>Basée à <strong className="text-foreground">Sedan</strong>, <strong className="text-foreground">La clé de voûte</strong> réalise des travaux de maçonnerie générale et de gros œuvre, pour les particuliers comme pour les professionnels.</>
                  )}
                </p>
                <p>
                  {isEnglish ? (
                    <>Founded by <strong className="text-foreground">Marino ZORZA</strong>, a trained mason, the company handles indoor and outdoor projects with the same exacting standards: new builds, renovation, rehabilitation and extensions.</>
                  ) : (
                    <>Fondée par <strong className="text-foreground">Marino ZORZA</strong>, artisan maçon de formation, l'entreprise intervient en intérieur comme en extérieur : construction neuve, rénovation, réhabilitation et agrandissement.</>
                  )}
                </p>
                <p>
                  {isEnglish
                    ? "The goal is simple: bring sound technical expertise to projects while building a lasting relationship of trust."
                    : "L'objectif est simple : mettre une expertise technique solide au service des projets, tout en construisant une relation de confiance durable."}
                </p>
              </div>
            </div>

            <aside className="rounded-2xl border border-stone-dark/60 bg-stone/60 p-8 shadow-sm sm:p-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                {isEnglish ? "Marino ZORZA" : "Marino ZORZA"}
              </p>
              <h3 className="mb-7 font-display text-3xl font-bold text-foreground">
                {isEnglish ? "The path behind the craft" : "Un parcours au service du métier"}
              </h3>
              <div className="space-y-6 border-l-2 border-secondary/40 pl-6">
                <div>
                  <p className="font-semibold text-foreground">{isEnglish ? "Trained mason" : "Artisan maçon de formation"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {isEnglish ? "A profession learned in the field and refined over time." : "Un métier appris sur le terrain et approfondi au fil des années."}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{isEnglish ? "Master craftsman certificate in masonry" : "Brevet de maîtrise en maçonnerie"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {isEnglish ? "A qualification that reflects a high level of professional expertise." : "Une qualification qui atteste d'un haut niveau de maîtrise du métier."}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{isEnglish ? "Professional journey across France" : "Tour de France"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {isEnglish ? "A journey that broadened his knowledge of masonry techniques." : "Un parcours qui a enrichi sa connaissance des différentes techniques de maçonnerie."}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((commitment) => (
              <div key={commitment.title} className="border-t-2 border-secondary pt-5">
                <commitment.icon className="mb-4 h-7 w-7 text-secondary" />
                <h3 className="text-lg font-bold text-foreground">{commitment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
