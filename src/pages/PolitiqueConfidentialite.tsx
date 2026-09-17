import { ArrowLeft, Database, FileText, Globe2, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const PolitiqueConfidentialite = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen bg-stone">
      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isEnglish ? "Back to home" : "Retour à l'accueil"}
          </Link>
          <Link to="/mentions-legales" className="text-sm font-semibold text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
            {isEnglish ? "Legal notice" : "Mentions légales"}
          </Link>
        </div>

        <header className="mt-12 border-y border-primary/15 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{company.name}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-[-0.02em] text-primary-dark sm:text-6xl">
            {isEnglish ? "Privacy policy" : "Politique de confidentialité"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {isEnglish
              ? "How La clé de voûte handles information related to this website and contact requests."
              : "Comment La clé de voûte traite les informations liées à ce site et aux demandes de contact."}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            {isEnglish ? "Last updated: 17 September 2026." : "Dernière mise à jour : 17 septembre 2026."}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "On this page" : "Sur cette page"}</p>
            <nav className="mt-5" aria-label={isEnglish ? "Privacy policy sections" : "Sections de la politique de confidentialité"}>
              <ol className="space-y-3 border-l border-primary/20 pl-4 text-sm text-muted-foreground">
                <li><a href="#controller" className="transition-colors hover:text-secondary">{isEnglish ? "Controller" : "Responsable"}</a></li>
                <li><a href="#data" className="transition-colors hover:text-secondary">{isEnglish ? "Data and purposes" : "Données et finalités"}</a></li>
                <li><a href="#legal-bases" className="transition-colors hover:text-secondary">{isEnglish ? "Bases and retention" : "Bases et conservation"}</a></li>
                <li><a href="#recipients" className="transition-colors hover:text-secondary">{isEnglish ? "Recipients" : "Destinataires"}</a></li>
                <li><a href="#cookies" className="transition-colors hover:text-secondary">Cookies</a></li>
                <li><a href="#rights" className="transition-colors hover:text-secondary">{isEnglish ? "Your rights" : "Vos droits"}</a></li>
              </ol>
            </nav>
          </aside>

          <div className="divide-y divide-primary/15">
            <section id="controller" className="scroll-mt-8 pb-10">
              <SectionTitle icon={ShieldCheck} title={isEnglish ? "Who is responsible?" : "Qui est responsable ?"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "The data controller is Marino ZORZA, sole trader, trading as La clé de voûte." : "Le responsable des traitements est Marino ZORZA, entrepreneur individuel, exerçant sous le nom commercial La clé de voûte."}</p>
                <address className="not-italic">
                  {company.address.line1}<br />
                  {company.address.postalCode} {company.address.city}, France<br />
                  <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a><br />
                  <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href={company.phoneHref}>{company.phoneDisplay}</a>
                </address>
              </div>
            </section>

            <section id="data" className="scroll-mt-8 py-10">
              <SectionTitle icon={Database} title={isEnglish ? "Data and purposes" : "Données et finalités"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "This website contains a contact form, but it has no customer account, newsletter, advertising system or audience-measurement tool. The form validates the name, email address, optional phone number, subject and message in your browser and prepares a message in your email application; the website itself does not send or store the request on a server." : "Le site comporte un formulaire de contact, mais ni espace client, ni newsletter, ni publicité, ni outil de mesure d'audience. Le formulaire vérifie dans votre navigateur le nom, l'adresse e-mail, le téléphone facultatif, l'objet et le message, puis prépare un message dans votre logiciel de messagerie ; le site n'envoie ni ne stocke lui-même la demande sur un serveur."}</p>
                <p>{isEnglish ? "If you choose to call or email the company, the information you provide may be used to answer your request, assess a project, prepare a quote and, where applicable, manage the resulting business relationship." : "Si vous choisissez d'appeler ou d'écrire à l'entreprise, les informations communiquées peuvent être utilisées pour répondre à votre demande, étudier un projet, préparer un devis et, le cas échéant, assurer le suivi de la relation commerciale."}</p>
                <p>{isEnglish ? "The language preference selected on the site is stored locally in the browser so that the interface can remember it. It is not sent to the company." : "La préférence de langue choisie sur le site est enregistrée localement dans le navigateur pour mémoriser l'interface. Elle n'est pas transmise à l'entreprise."}</p>
              </div>
            </section>

            <section id="legal-bases" className="scroll-mt-8 py-10">
              <SectionTitle icon={FileText} title={isEnglish ? "Legal bases and retention" : "Bases légales et conservation"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "For a request made in preparation for a project or quote, processing is based on pre-contractual measures taken at your request. Other exchanges are handled on the basis of the legitimate interest of answering and managing professional contacts." : "Pour une demande effectuée en vue d'un projet ou d'un devis, le traitement repose sur les mesures précontractuelles prises à votre demande. Les autres échanges sont traités sur la base de l'intérêt légitime consistant à répondre aux contacts professionnels et à les suivre."}</p>
                <p>{isEnglish ? "Contact information is kept for the time needed to answer the request and follow up the project. If no business relationship is formed, prospect data used for commercial follow-up is not kept beyond three years from collection or the last contact, unless a shorter period applies or you object. Contractual, accounting and dispute-related records are kept for the applicable legal periods." : "Les coordonnées sont conservées pendant le temps nécessaire pour répondre à la demande et assurer le suivi du projet. Si aucune relation commerciale n'est conclue, les données d'un prospect utilisées pour un suivi commercial ne sont pas conservées au-delà de trois ans à compter de leur collecte ou du dernier contact, sauf durée plus courte applicable ou opposition. Les documents contractuels, comptables et utiles à la défense des droits sont conservés pendant les durées légales applicables."}</p>
              </div>
            </section>

            <section id="recipients" className="scroll-mt-8 py-10">
              <SectionTitle icon={Globe2} title={isEnglish ? "Recipients and transfers" : "Destinataires et transferts"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "Information is accessible to the company and, where necessary, to the providers used for hosting, email and telecommunications. When you submit the form, the information is handed to your email application so that you can send it to the company. It is not sold or shared for advertising purposes." : "Les informations sont accessibles à l'entreprise et, lorsque cela est nécessaire, aux prestataires utilisés pour l'hébergement, la messagerie et les télécommunications. Lorsque vous utilisez le formulaire, les informations sont transmises à votre logiciel de messagerie afin que vous puissiez les envoyer à l'entreprise. Elles ne sont ni vendues ni transmises à des fins publicitaires."}</p>
                <p>{isEnglish ? "The embedded Google Maps service is loaded when the page opens. Google may process technical data and apply its own terms and privacy rules. The company does not control this third-party processing." : "Le service Google Maps intégré est chargé à l'ouverture de la page. Google peut traiter des données techniques selon ses propres conditions et règles de confidentialité. L'entreprise ne contrôle pas ce traitement opéré par un tiers."}</p>
                <p>{isEnglish ? "Some providers may process data outside the European Economic Area under their own legal safeguards. Their current privacy information should be consulted for details." : "Certains prestataires peuvent traiter des données hors de l'Espace économique européen selon leurs propres garanties juridiques. Leurs informations de confidentialité à jour doivent être consultées pour le détail."}</p>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-8 py-10">
              <SectionTitle icon={Globe2} title={isEnglish ? "Cookies and local storage" : "Cookies et stockage local"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "The site does not intentionally set advertising or audience-measurement cookies. The language choice is stored in localStorage, a browser storage mechanism, only to remember the selected interface language." : "Le site ne dépose volontairement aucun cookie publicitaire ou de mesure d'audience. Le choix de langue est enregistré dans le stockage local du navigateur uniquement pour mémoriser la langue de l'interface."}</p>
                <p>{isEnglish ? "Google Maps is a third-party interactive service loaded directly on the page. It may involve technical requests, cookies or other trackers managed by Google." : "Google Maps est un service interactif tiers chargé directement sur la page. Il peut impliquer des requêtes techniques, des cookies ou d'autres traceurs gérés par Google."}</p>
                <p>{isEnglish ? "No analytics, advertising or social-media tracker has been added to this version. The contact form does not set a cookie. Any future third-party tool will require this policy and the consent process to be reviewed before activation." : "Aucun outil d'analyse, de publicité ou de suivi social n'a été ajouté dans cette version. Le formulaire de contact ne dépose pas de cookie. Tout futur service tiers devra faire l'objet d'une révision de cette politique et du mécanisme de consentement avant son activation."}</p>
              </div>
            </section>

            <section id="rights" className="scroll-mt-8 pt-10">
              <SectionTitle icon={Mail} title={isEnglish ? "Your rights" : "Vos droits"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "You may request access to, correction, deletion, restriction or portability of your personal data, and you may object to processing where the legal conditions allow it." : "Vous pouvez demander l'accès à vos données personnelles, leur rectification, leur effacement, la limitation du traitement ou leur portabilité lorsque ce droit s'applique. Vous pouvez également vous opposer à un traitement lorsque les conditions légales le permettent."}</p>
                <p>{isEnglish ? <>To exercise your rights, email <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a>.</> : <>Pour exercer vos droits, écrivez à <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href={`mailto:${company.email}`}>{company.email}</a>.</>}</p>
                <p>{isEnglish ? <>You may also lodge a complaint with the <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">CNIL</a>.</> : <>Vous pouvez également introduire une réclamation auprès de la <a className="text-secondary underline decoration-secondary/40 underline-offset-4" href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">CNIL</a>.</>}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

const SectionTitle = ({ icon: Icon, title }: { icon: typeof FileText; title: string }) => (
  <div className="mb-5 flex items-center gap-4">
    <span className="inline-flex h-10 w-10 items-center justify-center border border-secondary/40 text-secondary" aria-hidden="true"><Icon className="h-5 w-5" /></span>
    <h2 className="font-display text-2xl font-semibold text-primary-dark sm:text-3xl">{title}</h2>
  </div>
);

export default PolitiqueConfidentialite;
