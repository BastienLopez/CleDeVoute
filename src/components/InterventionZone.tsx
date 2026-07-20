import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language";

const InterventionZone = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section id="zone" className="scroll-mt-24 border-y border-border bg-background py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
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
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <iframe
              title={isEnglish ? "Map of the Ardennes area" : "Carte de la zone des Ardennes"}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d807767.2442090632!2d4.05005691534058!3d49.6971320860253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ea1160a97f248d%3A0x30a5fb99a3725f0!2sArdennes!5e1!3m2!1sfr!2sfr!4v1784555755443!5m2!1sfr!2sfr"
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
