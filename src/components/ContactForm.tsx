import { Phone, Mail, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const ContactForm = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section id="contact" className="scroll-mt-24 bg-muted py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {isEnglish ? "Contact us" : "Contactez-nous"}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            {isEnglish ? "A project or a question? Contact the company directly." : "Un projet ou une question ? Contactez directement l'entreprise."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                {isEnglish ? "Our contact details" : "Nos coordonnées"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{isEnglish ? "Phone" : "Téléphone"}</p>
                    <a 
                      href={company.phoneHref}
                      className="text-secondary hover:underline text-lg"
                    >
                      {company.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{isEnglish ? "Address" : "Adresse"}</p>
                    <p className="text-muted-foreground">
                      {company.address.line1}<br />
                      {company.address.postalCode} {company.address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a 
                      href={company.gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-secondary hover:underline"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
              <h4 className="font-semibold text-foreground mb-2">
                {isEnglish ? "Tell us about your project" : "Parlez-nous de votre projet"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isEnglish ? "Describe your masonry project by phone or email." : "Par téléphone ou par e-mail, décrivez votre projet de maçonnerie à l'entreprise."}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-card p-8 shadow-lg sm:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
            <div className="mb-8 border-b border-border pb-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                {isEnglish ? "Direct contact" : "Contact direct"}
              </p>
              <h3 className="font-display text-3xl font-bold text-foreground">
                {isEnglish ? "Write to the company" : "Écrire à l'entreprise"}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {isEnglish ? "Choose the contact method that suits you best." : "Choisissez le moyen de contact qui vous convient."}
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href={company.gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-secondary px-5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-md focus:outline-none focus:ring-4 focus:ring-secondary/25"
              >
                <Mail className="h-5 w-5" />
                {isEnglish ? "Write with Gmail" : "Écrire avec Gmail"}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-border bg-white px-5 text-base font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20"
              >
                <Mail className="h-5 w-5" />
                {isEnglish ? "Use my email app" : "Utiliser mon application e-mail"}
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-border bg-white px-5 text-base font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20"
              >
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
