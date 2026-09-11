import { CalendarDays, Check, FileText, HardHat, MapPinned, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language";

const Method = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const steps = isEnglish
    ? [
        { number: "01", icon: MessageCircle, title: "First contact", description: "Discuss the project and understand the need." },
        { number: "02", icon: MapPinned, title: "Visit and study", description: "Review the worksite and the characteristics of the project." },
        { number: "03", icon: FileText, title: "Quote and planning", description: "Set out the proposed work and organise the next steps." },
        { number: "04", icon: HardHat, title: "Carrying out the work", description: "Complete the agreed masonry work on site." },
        { number: "05", icon: Check, title: "Completion", description: "Review the finished work together." },
        { number: "06", icon: CalendarDays, title: "Follow-up", description: "Remain available after the work is completed." },
      ]
    : [
        { number: "01", icon: MessageCircle, title: "Premier échange", description: "Échanger sur le projet et comprendre le besoin." },
        { number: "02", icon: MapPinned, title: "Visite et étude", description: "Regarder le chantier et les caractéristiques du projet." },
        { number: "03", icon: FileText, title: "Devis et organisation", description: "Définir les travaux envisagés et organiser la suite." },
        { number: "04", icon: HardHat, title: "Réalisation", description: "Effectuer les travaux de maçonnerie prévus sur le chantier." },
        { number: "05", icon: Check, title: "Réception", description: "Faire le point ensemble sur les travaux réalisés." },
        { number: "06", icon: CalendarDays, title: "Suivi", description: "Rester disponible après la réalisation des travaux." },
      ];

  return (
    <section id="method" className="scroll-mt-24 bg-background">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-primary/15 pb-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "The process" : "La méthode"}</p>
          <div>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-primary-dark sm:text-5xl">
              {isEnglish ? "A clear path from the first call to completion." : "Un chemin clair, du premier échange à la réception."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {isEnglish ? "Each project starts with a direct conversation and moves forward step by step." : "Chaque projet commence par un échange direct et avance étape par étape."}
            </p>
          </div>
        </div>

        <ol className="grid divide-y divide-primary/15 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-12">
          {steps.map((step, index) => (
            <li key={step.number} className={`relative py-7 sm:py-9 ${index >= 2 ? "lg:border-t lg:border-primary/15" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <step.icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/45">{step.number}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-primary-dark">{step.title}</h3>
              <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Method;
