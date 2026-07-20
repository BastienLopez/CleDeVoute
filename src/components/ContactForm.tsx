import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const ContactForm = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="contact" className="section-transition section-transition-from-stone-to-muted scroll-mt-24 bg-muted py-24">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            {isEnglish ? "A project in mind?" : "Un projet en tête ?"}
          </p>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {isEnglish ? "Contact us" : "Contactez-nous"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {isEnglish ? "Discuss your masonry project directly with the company." : "Échangez directement avec l'entreprise au sujet de votre projet de maçonnerie."}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-7">
            <h3 className="font-display text-3xl font-bold text-foreground">
              {isEnglish ? "Our contact details" : "Nos coordonnées"}
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-foreground">{isEnglish ? "Phone" : "Téléphone"}</p>
                  <a href={company.phoneHref} className="mt-1 inline-block text-lg text-secondary hover:underline">{company.phoneDisplay}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a href={`mailto:${company.email}`} className="mt-1 inline-block break-all text-secondary hover:underline">{company.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-foreground">{isEnglish ? "Address" : "Adresse"}</p>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{company.address.line1}<br />{company.address.postalCode} {company.address.city}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-dark/50 bg-white p-8 shadow-lg sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              {isEnglish ? "Direct contact" : "Contact direct"}
            </p>
            <h3 className="font-display text-3xl font-bold text-foreground">
              {isEnglish ? "Let's discuss your project" : "Parlons de votre projet"}
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {isEnglish ? "Whether it is a new build, renovation or outdoor work, the company is available to discuss your needs." : "Construction neuve, rénovation ou aménagement extérieur : l'entreprise est disponible pour échanger sur vos besoins."}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${company.email}`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-secondary px-5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-secondary/25">
                <Mail className="h-5 w-5" />
                {isEnglish ? "Send an email" : "Envoyer un e-mail"}
              </a>
              <a href={company.phoneHref} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-primary/20 bg-white px-5 text-base font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20">
                <Phone className="h-5 w-5" />
                {isEnglish ? "Call the company" : "Appeler l'entreprise"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
