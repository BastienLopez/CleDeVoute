import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";

const About = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const values = isEnglish ? [
    "Trained mason",
    "Master's certificate in masonry",
    "A Tour de France that developed different techniques",
    "Indoor and outdoor sites for private and professional clients",
  ] : [
    "Artisan maçon de formation",
    "Brevet de maîtrise en maçonnerie",
    "Tour de France ayant permis d'acquérir différentes techniques",
    "Chantiers intérieurs et extérieurs pour particuliers et professionnels",
  ];

  return (
    <section id="about" className="scroll-mt-24 bg-stone/70 py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {isEnglish ? "About us" : "Qui sommes-nous ?"}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
          </div>

          <div className="space-y-6 text-lg text-foreground/80">
            <p className="leading-relaxed">
              {isEnglish ? <>Based in <strong>Sedan</strong>, in the <strong>Ardennes</strong>, <strong>La clé de voûte</strong> is a general masonry and structural work company.</> : <>Située à <strong>Sedan</strong>, dans les <strong>Ardennes</strong>, <strong>La clé de voûte</strong> est une entreprise de maçonnerie générale et de gros œuvre de bâtiment.</>}
            </p>
            
            <p className="leading-relaxed">
              {isEnglish ? <>Its founder, <strong>Marino ZORZA</strong>, is a trained mason and holds a master's certificate in masonry. His Tour de France allowed him to acquire different techniques before founding the company.</> : <>Son fondateur, <strong>Marino ZORZA</strong>, est artisan maçon de formation et titulaire d'un brevet de maîtrise en maçonnerie. Son Tour de France lui a permis d'acquérir différentes techniques avant de créer son entreprise.</>}
            </p>

            <p className="leading-relaxed">
              {isEnglish ? "La clé de voûte works on indoor and outdoor sites for private and professional clients, with a focus on building a trusting relationship." : "La clé de voûte intervient sur des chantiers intérieurs et extérieurs, pour les particuliers comme pour les professionnels, et privilégie une relation de confiance avec ses clients."}
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
