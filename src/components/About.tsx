import { Award, Handshake, Hammer, Map } from "lucide-react";
import { useLanguage } from "@/lib/language";

const About = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const commitments = isEnglish
    ? [
        { icon: Award, number: "01", title: "Master craftsman certificate", description: "A recognised masonry qualification." },
        { icon: Map, number: "02", title: "Techniques learned in the field", description: "A professional journey across France." },
        { icon: Hammer, number: "03", title: "From structure to exteriors", description: "New builds, renovation, stonework and outdoor works." },
        { icon: Handshake, number: "04", title: "A direct exchange", description: "The work is framed with the client from the first discussion." },
      ]
    : [
        { icon: Award, number: "01", title: "Brevet de maîtrise", description: "Une qualification forte dans le métier de maçon." },
        { icon: Map, number: "02", title: "Des techniques de terrain", description: "Un parcours professionnel construit au fil du Tour de France." },
        { icon: Hammer, number: "03", title: "Du gros œuvre aux extérieurs", description: "Construction, rénovation, pierre et aménagements extérieurs." },
        { icon: Handshake, number: "04", title: "Un échange direct", description: "Des travaux cadrés avec le client dès le premier échange." },
      ];

  return (
    <section id="about" className="scroll-mt-24 bg-background">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(23rem,1.1fr)] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "The company" : "L'entreprise"}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-primary-dark sm:text-5xl">
              {isEnglish ? "A trade learned on the ground." : "Un métier appris sur le terrain."}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                {isEnglish ? (
                  <>Based in <strong className="font-semibold text-foreground">Sedan</strong>, <strong className="font-semibold text-foreground">La clé de voûte</strong> carries out general masonry and structural work for private and professional clients.</>
                ) : (
                  <>Basée à <strong className="font-semibold text-foreground">Sedan</strong>, <strong className="font-semibold text-foreground">La clé de voûte</strong> réalise des travaux de maçonnerie générale et de gros œuvre, pour les particuliers comme pour les professionnels.</>
                )}
              </p>
              <p>
                {isEnglish ? (
                  <>Founded by <strong className="font-semibold text-foreground">Marino ZORZA</strong>, a trained mason, the company handles indoor and outdoor projects with the same exacting standards: new builds, renovation, rehabilitation and extensions.</>
                ) : (
                  <>Fondée par <strong className="font-semibold text-foreground">Marino ZORZA</strong>, artisan maçon de formation, l'entreprise intervient en intérieur comme en extérieur : construction neuve, rénovation, réhabilitation et agrandissement.</>
                )}
              </p>
              <p>
                {isEnglish
                  ? "Each project starts with a direct exchange, a look at the existing building and a clear outline of the work to be done."
                  : "Chaque projet commence par un échange direct, une lecture du bâti et une définition claire des travaux à réaliser."}
              </p>
            </div>
          </div>

          <aside className="border-t-2 border-secondary pt-6 lg:mt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Marino ZORZA</p>
            <h3 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-primary-dark sm:text-4xl">
              {isEnglish ? "The path behind the craft" : "Un parcours au service du métier"}
            </h3>
            <div className="relative mt-9 pl-8 before:absolute before:bottom-3 before:left-1.5 before:top-3 before:w-px before:bg-primary/20 sm:pl-10">
              <div className="relative pb-8 before:absolute before:-left-8 before:top-1 before:z-10 before:h-3 before:w-3 before:rounded-full before:bg-secondary before:ring-4 before:ring-background sm:before:-left-10">
                <p className="font-semibold text-foreground">{isEnglish ? "Trained mason" : "Artisan maçon de formation"}</p>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{isEnglish ? "A profession learned in the field and refined over time." : "Un métier appris sur le terrain et approfondi au fil des années."}</p>
              </div>
              <div className="relative pb-8 before:absolute before:-left-8 before:top-1 before:z-10 before:h-3 before:w-3 before:rounded-full before:bg-secondary before:ring-4 before:ring-background sm:before:-left-10">
                <p className="font-semibold text-foreground">{isEnglish ? "Master craftsman certificate in masonry" : "Brevet de maîtrise en maçonnerie"}</p>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{isEnglish ? "A qualification that reflects a high level of professional expertise." : "Une qualification qui atteste d'un haut niveau de maîtrise du métier."}</p>
              </div>
              <div className="relative before:absolute before:-left-8 before:top-1 before:z-10 before:h-3 before:w-3 before:rounded-full before:bg-secondary before:ring-4 before:ring-background sm:before:-left-10">
                <p className="font-semibold text-foreground">{isEnglish ? "Professional journey across France" : "Tour de France"}</p>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{isEnglish ? "A journey that broadened his knowledge of masonry techniques." : "Un parcours qui a enrichi sa connaissance des différentes techniques de maçonnerie."}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 grid border-t border-primary/15 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((commitment) => (
            <article key={commitment.number} className="border-b border-primary/15 py-7 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <div className="flex items-start justify-between gap-4">
                <commitment.icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/45">{commitment.number}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-foreground">{commitment.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{commitment.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
