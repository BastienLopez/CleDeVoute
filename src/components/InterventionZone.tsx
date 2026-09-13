import { ArrowUpRight, MapPin } from "lucide-react";
import { googleMapsEmbedUrl } from "@/data/map";
import { useLanguage } from "@/lib/language";

const InterventionZone = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="zone" className="scroll-mt-24 bg-stone">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-20">
          <div>
            <MapPin className="h-8 w-8 text-secondary" aria-hidden="true" />
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "Where we work" : "Zone d'intervention"}</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-primary-dark sm:text-5xl">
              {isEnglish ? "Based in Sedan, in the Ardennes." : "Basée à Sedan, dans les Ardennes."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {isEnglish ? "La clé de voûte reviews masonry projects. Contact the company to check whether work is possible in your area." : "La clé de voûte étudie les projets de maçonnerie. Contactez l'entreprise pour vérifier la faisabilité d'une intervention dans votre secteur."}
            </p>
            <a href="#contact" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline decoration-secondary/60 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
              {isEnglish ? "Discuss your area" : "Vérifier votre secteur"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <figure className="overflow-hidden border border-primary/15 bg-background">
            <iframe
              title={isEnglish ? "Map of the Ardennes area" : "Carte de la zone des Ardennes"}
              src={googleMapsEmbedUrl}
              className="h-[22rem] w-full border-0 sm:h-[28rem]"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <figcaption className="border-t border-primary/15 px-5 py-4 text-sm text-muted-foreground sm:px-6">
              <span className="font-semibold text-foreground">Sedan (08200)</span> · {isEnglish ? "Ardennes" : "Ardennes"}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default InterventionZone;
