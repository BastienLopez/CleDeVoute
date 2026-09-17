import { ArrowLeft, FileText, Globe2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const ConditionsGeneralesUtilisation = () => {
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
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link to="/mentions-legales" className="text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
              {isEnglish ? "Legal notice" : "Mentions légales"}
            </Link>
            <Link to="/politique-confidentialite" className="text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
              {isEnglish ? "Privacy policy" : "Politique de confidentialité"}
            </Link>
          </div>
        </div>

        <header className="mt-12 border-y border-primary/15 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{company.name}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-[-0.02em] text-primary-dark sm:text-6xl">
            {isEnglish ? "Terms of use" : "Conditions générales d'utilisation"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {isEnglish
              ? "The rules for browsing and using this showcase website."
              : "Les règles applicables à la consultation et à l'utilisation de ce site vitrine."}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            {isEnglish ? "Last updated: 17 September 2026." : "Dernière mise à jour : 17 septembre 2026."}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "On this page" : "Sur cette page"}</p>
            <nav className="mt-5" aria-label={isEnglish ? "Terms of use sections" : "Sections des conditions générales d'utilisation"}>
              <ol className="space-y-3 border-l border-primary/20 pl-4 text-sm text-muted-foreground">
                <li><a href="#scope" className="transition-colors hover:text-secondary">{isEnglish ? "Scope" : "Objet"}</a></li>
                <li><a href="#access" className="transition-colors hover:text-secondary">{isEnglish ? "Access and availability" : "Accès et disponibilité"}</a></li>
                <li><a href="#content" className="transition-colors hover:text-secondary">{isEnglish ? "Content and requests" : "Contenu et demandes"}</a></li>
                <li><a href="#property" className="transition-colors hover:text-secondary">{isEnglish ? "Intellectual property" : "Propriété intellectuelle"}</a></li>
                <li><a href="#third-parties" className="transition-colors hover:text-secondary">{isEnglish ? "Third-party services" : "Services tiers"}</a></li>
                <li><a href="#responsibility" className="transition-colors hover:text-secondary">{isEnglish ? "Responsibility" : "Responsabilité"}</a></li>
                <li><a href="#law" className="transition-colors hover:text-secondary">{isEnglish ? "Applicable law" : "Droit applicable"}</a></li>
              </ol>
            </nav>
          </aside>

          <div className="divide-y divide-primary/15">
            <section id="scope" className="scroll-mt-8 pb-10">
              <SectionTitle icon={FileText} title={isEnglish ? "Scope and acceptance" : "Objet et acceptation"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "These terms apply to browsing the La clé de voûte website, published by Marino ZORZA, sole trader. By using the website, you agree to follow these terms and the legal notice." : "Les présentes conditions s'appliquent à la consultation du site de La clé de voûte, édité par Marino ZORZA, entrepreneur individuel. La navigation sur le site implique l'acceptation de ces conditions et des mentions légales."}</p>
                <p>{isEnglish ? "They govern the use of the website only. They do not replace the quotation, order documents or contract that may be agreed for a specific building project." : "Elles encadrent uniquement l'utilisation du site. Elles ne remplacent pas le devis, les documents de commande ou le contrat qui pourraient être conclus pour un chantier déterminé."}</p>
              </div>
            </section>

            <section id="access" className="scroll-mt-8 py-10">
              <SectionTitle icon={Globe2} title={isEnglish ? "Access and availability" : "Accès et disponibilité"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "The website is intended to provide information about the company's activity, services and displayed projects. Access is normally available whenever the hosting service and the user's network permit it." : "Le site a pour objet de présenter l'activité, les prestations et les réalisations affichées par l'entreprise. Son accès est normalement disponible lorsque l'hébergement et le réseau de l'utilisateur le permettent."}</p>
                <p>{isEnglish ? "La clé de voûte may update, suspend or interrupt all or part of the website for maintenance, security or content reasons. No uninterrupted availability is promised." : "La clé de voûte peut modifier, suspendre ou interrompre tout ou partie du site pour des raisons de maintenance, de sécurité ou de mise à jour des contenus. Aucune disponibilité permanente n'est garantie."}</p>
              </div>
            </section>

            <section id="content" className="scroll-mt-8 py-10">
              <SectionTitle icon={ShieldCheck} title={isEnglish ? "Content and project requests" : "Contenu et demandes de projet"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "The information and photographs are provided for general information. A project request can be made by phone or email using the contact details shown on the website." : "Les informations et photographies sont présentées à titre informatif. Une demande de projet peut être adressée par téléphone ou par e-mail aux coordonnées affichées sur le site."}</p>
                <p>{isEnglish ? "The website does not provide online ordering, payment, customer accounts or instant quotations. A page, photograph or description is not a quotation, a contractual commitment or a guarantee that a project can be carried out." : "Le site ne propose ni commande en ligne, ni paiement, ni espace client, ni devis instantané. Une page, une photographie ou une description ne constitue ni un devis, ni un engagement contractuel, ni une garantie de faisabilité d'un projet."}</p>
              </div>
            </section>

            <section id="property" className="scroll-mt-8 py-10">
              <SectionTitle icon={LockKeyhole} title={isEnglish ? "Intellectual property" : "Propriété intellectuelle"} />
              <p className="leading-relaxed text-muted-foreground">{isEnglish ? "Texts, photographs, logos, graphic elements and the structure of the website are protected by applicable intellectual property rules. Their reuse, reproduction or adaptation requires prior permission unless a legal exception applies. The detailed rules are set out in the legal notice." : "Les textes, photographies, logos, éléments graphiques et la structure du site sont protégés par les règles applicables en matière de propriété intellectuelle. Leur réutilisation, reproduction ou adaptation nécessite une autorisation préalable, sauf exception légale. Les règles détaillées figurent dans les mentions légales."}</p>
            </section>

            <section id="third-parties" className="scroll-mt-8 py-10">
              <SectionTitle icon={Globe2} title={isEnglish ? "Third-party services" : "Services tiers"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "The website includes an interactive Google Maps service loaded when the page opens. This service is operated by Google and is subject to its own terms, availability and privacy rules." : "Le site intègre un service interactif Google Maps chargé dès l'ouverture de la page. Ce service est exploité par Google et relève de ses propres conditions, disponibilités et règles de confidentialité."}</p>
                <p>{isEnglish ? <>Personal-data information is provided in the <Link className="text-secondary hover:underline" to="/politique-confidentialite">privacy policy</Link>. External websites remain governed by their own terms.</> : <>Les informations relatives aux données personnelles sont présentées dans la <Link className="text-secondary hover:underline" to="/politique-confidentialite">politique de confidentialité</Link>. Les sites externes restent soumis à leurs propres conditions.</>}</p>
              </div>
            </section>

            <section id="responsibility" className="scroll-mt-8 py-10">
              <SectionTitle icon={ShieldCheck} title={isEnglish ? "Responsibility" : "Responsabilité"} />
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>{isEnglish ? "Users are responsible for their equipment, connection, software and use of the information available on the website. They must not disrupt the website, bypass its security or use its content unlawfully." : "L'utilisateur est responsable de son équipement, de sa connexion, de ses logiciels et de l'usage qu'il fait des informations disponibles sur le site. Il s'interdit de perturber le site, de contourner ses mesures de sécurité ou d'utiliser ses contenus illicitement."}</p>
                <p>{isEnglish ? "La clé de voûte cannot guarantee that every item of information is complete, current or free from error, and cannot be held responsible for an interruption outside its control." : "La clé de voûte ne peut garantir que chaque information est complète, à jour ou exempte d'erreur et ne peut être tenue responsable d'une interruption indépendante de sa volonté."}</p>
              </div>
            </section>

            <section id="law" className="scroll-mt-8 pt-10">
              <SectionTitle icon={FileText} title={isEnglish ? "Applicable law" : "Droit applicable"} />
              <p className="leading-relaxed text-muted-foreground">{isEnglish ? "These terms are governed by French law. The parties will first seek an amicable solution to any dispute, without limiting any mandatory rights available to consumers or any applicable legal remedy." : "Les présentes conditions sont soumises au droit français. Les parties rechercheront d'abord une solution amiable à tout différend, sans limiter les droits impératifs dont bénéficient les consommateurs ni les recours prévus par la loi."}</p>
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

export default ConditionsGeneralesUtilisation;
