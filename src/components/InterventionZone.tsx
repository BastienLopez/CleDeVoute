import { MapPin } from "lucide-react";

const InterventionZone = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Zone d'intervention
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Basée à <strong className="text-foreground">Sedan (08200)</strong>, l'entreprise 
            La clé de voûte intervient dans tout le <strong className="text-foreground">département 
            des Ardennes</strong> et les environs pour vos projets de maçonnerie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InterventionZone;
