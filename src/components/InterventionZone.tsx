import { MapPin } from "lucide-react";
import { googleMapsEmbedUrl } from "@/data/map";
import { useLanguage } from "@/lib/language";

const InterventionZone = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section id="zone" className="section-transition section-transition-from-white-to-stone scroll-mt-24 bg-stone py-20">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
              <MapPin className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {isEnglish ? "Service area" : "Zone d'intervention"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isEnglish ? <>Based in <strong className="text-foreground">Sedan (08200)</strong>, in the Ardennes, La clé de voûte reviews masonry projects. Contact the company to check whether work is possible in your area.</> : <>Basée à <strong className="text-foreground">Sedan (08200)</strong>, dans les Ardennes, La clé de voûte étudie les projets de maçonnerie. Contactez l'entreprise pour vérifier la faisabilité d'une intervention dans votre secteur.</>}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-dark/60 bg-white shadow-lg">
            <iframe
              title={isEnglish ? "Map of the Ardennes area" : "Carte de la zone des Ardennes"}
              src={googleMapsEmbedUrl}
              className="h-[320px] w-full border-0 sm:h-[400px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterventionZone;
