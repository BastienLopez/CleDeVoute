import { CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    "Relation de confiance avec nos clients",
    "Travail soigné et professionnel",
    "Respect des délais",
    "Artisan local des Ardennes"
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Qui sommes-nous ?
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          </div>

          <div className="space-y-6 text-lg text-foreground/80">
            <p className="leading-relaxed">
              Située à <strong>Sedan</strong>, dans les <strong>Ardennes</strong>, l'entreprise 
              <strong> La clé de voûte</strong> met toute son expérience et tout son savoir-faire 
              à votre service pour répondre au mieux à vos attentes.
            </p>
            
            <p className="leading-relaxed">
              Spécialisés dans les travaux de <strong>maçonnerie générale</strong> et de{" "}
              <strong>gros œuvre de bâtiment</strong>, nous intervenons pour vous sur les 
              chantiers intérieurs et extérieurs. Ayant l'habitude de réaliser une large gamme 
              de projets allant du plus classique au plus original, pour les particuliers et les 
              professionnels, nous privilégions le rapport de confiance avec nos clients.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
