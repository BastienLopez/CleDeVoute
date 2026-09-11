import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const ContactForm = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const preparationPoints = isEnglish
    ? ["A broad idea of the project", "The type of work involved", "Whether you are a private or professional client"]
    : ["Une idée globale du projet", "Le type de travaux envisagé", "Votre situation : particulier ou professionnel"];

  return (
    <section id="contact" className="scroll-mt-24 bg-primary-dark text-primary-foreground">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(24rem,1.15fr)] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "A project in mind?" : "Un projet en tête ?"}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              {isEnglish ? "Let's discuss your project." : "Parlons de votre projet."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
              {isEnglish ? "Whether it is a new build, renovation or outdoor work, the company is available to discuss your needs." : "Construction neuve, rénovation ou aménagement extérieur : l'entreprise est disponible pour échanger sur vos besoins."}
            </p>

            <div className="mt-10 space-y-5 border-t border-primary-foreground/20 pt-7">
              <a href={company.phoneHref} className="flex items-center gap-4 text-lg font-semibold transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
                <Phone className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.phoneDisplay}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-start gap-4 text-lg font-semibold break-all transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.email}</span>
              </a>
              <div className="flex items-start gap-4 text-lg font-semibold text-primary-foreground/80">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.address.line1} {company.address.postalCode} {company.address.city}</span>
              </div>
            </div>
          </div>

          <div className="border border-primary-foreground/20 bg-primary-foreground/[0.04] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "Direct contact" : "Contact direct"}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">{isEnglish ? "Start with the essentials." : "Commencez par l'essentiel."}</h3>
            <p className="mt-5 max-w-xl leading-relaxed text-primary-foreground/70">
              {isEnglish ? "A few details are enough to begin the conversation." : "Quelques éléments suffisent pour commencer l'échange."}
            </p>
            <ul className="mt-8 space-y-4 border-t border-primary-foreground/20 pt-7">
              {preparationPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${company.email}`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-secondary px-5 text-base font-semibold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/35">
                <Mail className="h-5 w-5" aria-hidden="true" />
                {isEnglish ? "Send an email" : "Envoyer un e-mail"}
              </a>
              <a href={company.phoneHref} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-primary-foreground/30 px-5 text-base font-semibold text-primary-foreground transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/35">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {isEnglish ? "Call the company" : "Appeler l'entreprise"}
              </a>
            </div>
            <a href="#top" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
              {isEnglish ? "Back to top" : "Retour en haut"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
