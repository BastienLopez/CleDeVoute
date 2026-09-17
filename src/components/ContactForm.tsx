import { type ChangeEvent, type FormEvent, type ReactNode, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

const ContactForm = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "error" | "opening">("idle");
  const [startedAt] = useState(() => Date.now());

  const preparationPoints = isEnglish
    ? ["A broad idea of the project", "The type of work involved", "Whether you are a private or professional client"]
    : ["Une idée globale du projet", "Le type de travaux envisagé", "Votre situation : particulier ou professionnel"];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name as keyof FormErrors];
      return next;
    });
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = values.name.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const subject = values.subject.trim();
    const message = values.message.trim();
    const nextErrors: FormErrors = {};

    if (values.website.trim()) {
      nextErrors.form = isEnglish ? "The request could not be prepared." : "La demande n'a pas pu être préparée.";
    }
    if (name.length < 2 || name.length > 80) {
      nextErrors.name = isEnglish ? "Enter your name (2 to 80 characters)." : "Indiquez votre nom (2 à 80 caractères).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email) || email.length > 254) {
      nextErrors.email = isEnglish ? "Enter a valid email address." : "Indiquez une adresse e-mail valide.";
    }
    if (phone && !/^[0-9+().\s-]{6,30}$/.test(phone)) {
      nextErrors.phone = isEnglish ? "Enter a valid phone number." : "Indiquez un numéro de téléphone valide.";
    }
    if (subject.length < 2 || subject.length > 120) {
      nextErrors.subject = isEnglish ? "Enter a subject (2 to 120 characters)." : "Indiquez l'objet de votre message (2 à 120 caractères).";
    }
    if (message.length < 10 || message.length > 2500) {
      nextErrors.message = isEnglish ? "Describe your project in 10 to 2,500 characters." : "Décrivez votre projet en 10 à 2 500 caractères.";
    }
    if (Date.now() - startedAt < 1200) {
      nextErrors.form = isEnglish ? "Please take a moment before sending." : "Prenez un instant avant d'envoyer le message.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    const mailSubject = isEnglish ? `Project request — ${subject}` : `Demande — ${subject}`;
    const body = [
      `${isEnglish ? "Name" : "Nom"} : ${name}`,
      `${isEnglish ? "Email" : "E-mail"} : ${email}`,
      ...(phone ? [`${isEnglish ? "Phone" : "Téléphone"} : ${phone}`] : []),
      `${isEnglish ? "Subject" : "Objet"} : ${subject}`,
      "",
      "Message :",
      message,
    ].join("\n");

    setErrors({});
    setStatus("opening");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-primary-dark text-primary-foreground">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(32rem,1.2fr)] lg:gap-20 xl:gap-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "A project in mind?" : "Un projet en tête ?"}</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              {isEnglish ? "Let's discuss your project." : "Parlons de votre projet."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
              {isEnglish ? "Whether it is a new build, renovation or outdoor work, the company is available to discuss your needs." : "Construction neuve, rénovation ou aménagement extérieur : l'entreprise est disponible pour échanger sur vos besoins."}
            </p>

            <address className="mt-10 space-y-5 border-t border-primary-foreground/20 pt-7 not-italic">
              <a href={company.phoneHref} className="flex items-center gap-4 text-lg font-semibold transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
                <Phone className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.phoneDisplay}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-start gap-4 break-all text-lg font-semibold transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/30">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.email}</span>
              </a>
              <div className="flex items-start gap-4 text-lg font-semibold text-primary-foreground/80">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{company.address.line1}<br />{company.address.postalCode} {company.address.city}</span>
              </div>
            </address>

            <div className="mt-10 border-t border-primary-foreground/20 pt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "To get started" : "Pour commencer"}</p>
              <ul className="mt-5 space-y-4 text-primary-foreground/80">
                {preparationPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-primary-foreground/20 bg-primary-foreground/[0.04] p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "Contact form" : "Formulaire de contact"}</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">{isEnglish ? "Tell us about your project." : "Décrivez-nous votre projet."}</h3>
            <p className="mt-5 max-w-xl leading-relaxed text-primary-foreground/70">
              {isEnglish ? "Your default email application will open with the message prepared. Nothing is stored by this website." : "Votre logiciel de messagerie s'ouvrira avec le message préparé. Le site ne stocke pas votre demande."}
            </p>

            <form id="contact-form" className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label={isEnglish ? "Name" : "Nom"} htmlFor="contact-name" error={errors.name}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    required
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                  />
                </FormField>
                <FormField label={isEnglish ? "Email" : "E-mail"} htmlFor="contact-email" error={errors.email}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                  />
                </FormField>
                <FormField label={isEnglish ? "Phone (optional)" : "Téléphone (facultatif)"} htmlFor="contact-phone" error={errors.phone}>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="06 00 00 00 00"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    className={inputClass}
                  />
                </FormField>
                <FormField label={isEnglish ? "Message subject" : "Objet de votre message"} htmlFor="contact-subject" error={errors.subject}>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    maxLength={120}
                    required
                    value={values.subject}
                    onChange={handleChange}
                    placeholder={isEnglish ? "For example: renovation of a terrace" : "Ex. rénovation d'une terrasse"}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={inputClass}
                  />
                </FormField>
              </div>

              <FormField label={isEnglish ? "Message" : "Message"} htmlFor="contact-message" error={errors.message}>
                <textarea
                  id="contact-message"
                  name="message"
                  minLength={10}
                  maxLength={2500}
                  required
                  value={values.message}
                  onChange={handleChange}
                  placeholder={isEnglish ? "Tell us what you have in mind…" : "Décrivez votre projet…"}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${inputClass} min-h-36 resize-y py-3`}
                />
              </FormField>

              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">{isEnglish ? "Leave this field empty" : "Laissez ce champ vide"}</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
              </div>

              {errors.form && <p role="alert" className="text-sm font-semibold text-secondary">{errors.form}</p>}
              {status === "opening" && <p role="status" className="text-sm font-semibold text-secondary">{isEnglish ? "Opening your email application…" : "Ouverture de votre messagerie…"}</p>}

              <button type="submit" disabled={status === "opening"} className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-secondary px-5 text-base font-semibold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/35 disabled:cursor-wait disabled:opacity-70">
                <Send className="h-5 w-5" aria-hidden="true" />
                {isEnglish ? "Prepare my email" : "Préparer mon e-mail"}
              </button>

              <p className="text-xs leading-relaxed text-primary-foreground/55">
                {isEnglish ? <>By continuing, your email application will receive the information entered here. See the <Link className="underline decoration-primary-foreground/40 underline-offset-2 hover:text-primary-foreground" to="/politique-confidentialite">privacy policy</Link>.</> : <>En continuant, les informations saisies seront transmises à votre logiciel de messagerie. Consultez la <Link className="underline decoration-primary-foreground/40 underline-offset-2 hover:text-primary-foreground" to="/politique-confidentialite">politique de confidentialité</Link>.</>}
              </p>
            </form>

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

const inputClass = "mt-2 min-h-12 w-full border border-primary-foreground/25 bg-primary-foreground/[0.04] px-4 text-base text-primary-foreground caret-secondary outline-none transition placeholder:text-primary-foreground/40 focus:border-secondary focus:ring-4 focus:ring-secondary/20";

const FormField = ({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={htmlFor} className="text-sm font-semibold text-primary-foreground">{label}</label>
    {children}
    {error && <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-sm font-medium text-secondary">{error}</p>}
  </div>
);

export default ContactForm;
