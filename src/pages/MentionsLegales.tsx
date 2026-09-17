import { ArrowLeft, Building2, FileText, Globe2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const MentionsLegales = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const activity = isEnglish ? "General masonry and structural work" : "Travaux de maçonnerie générale et gros œuvre de bâtiment";

  return (
    <main className="min-h-screen bg-stone">
      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {isEnglish ? "Back to home" : "Retour à l'accueil"}
        </Link>
        <Link to="/politique-confidentialite" className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
          {isEnglish ? "Privacy policy" : "Politique de confidentialité"}
        </Link>
        <Link to="/cgu" className="ml-5 mt-4 inline-block text-sm font-semibold text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20">
          {isEnglish ? "Terms of use" : "Conditions générales d'utilisation"}
        </Link>

        <header className="mt-12 border-y border-primary/15 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{company.name}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[-0.02em] text-primary-dark sm:text-6xl">
            {isEnglish ? "Legal notice" : "Mentions légales"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {isEnglish ? "Information about the website publisher, hosting and use of the website." : "Informations relatives à l'éditeur, à l'hébergement et à l'utilisation du site."}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-20">
          <aside className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{isEnglish ? "On this page" : "Sur cette page"}</p>
            <nav className="mt-5" aria-label={isEnglish ? "Legal notice sections" : "Sections des mentions légales"}>
              <ol className="space-y-3 border-l border-primary/20 pl-4 text-sm text-muted-foreground">
                <li><a href="#publisher" className="transition-colors hover:text-secondary">{isEnglish ? "Website publisher" : "Éditeur du site"}</a></li>
                <li><a href="#publication" className="transition-colors hover:text-secondary">{isEnglish ? "Publication director" : "Directeur de la publication"}</a></li>
                <li><a href="#hosting" className="transition-colors hover:text-secondary">{isEnglish ? "Hosting" : "Hébergement"}</a></li>
                <li><a href="#property" className="transition-colors hover:text-secondary">{isEnglish ? "Intellectual property" : "Propriété intellectuelle"}</a></li>
                <li><a href="#liability" className="transition-colors hover:text-secondary">{isEnglish ? "Liability" : "Responsabilité"}</a></li>
                <li><a href="#data" className="transition-colors hover:text-secondary">{isEnglish ? "Personal data" : "Données personnelles"}</a></li>
                <li><a href="#cookies" className="transition-colors hover:text-secondary">{isEnglish ? "Cookies" : "Cookies"}</a></li>
                <li><Link to="/politique-confidentialite" className="transition-colors hover:text-secondary">{isEnglish ? "Detailed privacy policy" : "Politique de confidentialité détaillée"}</Link></li>
                <li><Link to="/cgu" className="transition-colors hover:text-secondary">{isEnglish ? "Terms of use" : "Conditions générales d'utilisation"}</Link></li>
                <li><a href="#links" className="transition-colors hover:text-secondary">{isEnglish ? "External links" : "Liens externes"}</a></li>
                <li><a href="#law" className="transition-colors hover:text-secondary">{isEnglish ? "Applicable law" : "Droit applicable"}</a></li>
              </ol>
            </nav>
          </aside>

          <div className="divide-y divide-primary/15">
            <section id="publisher" className="scroll-mt-8 pb-10">
              <SectionTitle icon={Building2} title={isEnglish ? "Website publisher" : "Éditeur du site"} />
              <p className="mb-6 leading-relaxed text-muted-foreground">{isEnglish ? "This website is published by:" : "Le présent site est édité par :"}</p>
              <div className="grid gap-x-10 gap-y-4 border-y border-primary/15 py-6 text-sm sm:grid-cols-2">
                <p><strong className="text-foreground">{company.legalName}</strong> — {company.legalForm}</p>
                <p><span className="text-muted-foreground">{isEnglish ? "Trade name" : "Nom commercial"} :</span> {company.name}</p>
                <p><span className="text-muted-foreground">{isEnglish ? "Address" : "Adresse professionnelle"} :</span> {company.address.line1}, {company.address.postalCode} {company.address.city}, France</p>
                <p><span className="text-muted-foreground">{isEnglish ? "Phone" : "Téléphone"} :</span> <a className="font-medium text-secondary hover:underline" href={company.phoneHref}>{company.phoneDisplay}</a></p>
                <p><span className="text-muted-foreground">Email :</span> <a className="font-medium text-secondary hover:underline" href={`mailto:${company.email}`}>{company.email}</a></p>
                <p><span className="text-muted-foreground">SIREN :</span> {company.siren}</p>
                <p><span className="text-muted-foreground">SIRET :</span> {company.siret}</p>
                <p><span className="text-muted-foreground">{isEnglish ? "APE code" : "Code APE"} :</span> {company.apeCode}</p>
                <p><span className="text-muted-foreground">{isEnglish ? "Registration" : "Immatriculation"} :</span> {company.registry}</p>
                <p><span className="text-muted-foreground">{isEnglish ? "Business start date" : "Date de début d'activité"} :</span> {company.registrationDate}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">{isEnglish ? "Main activity" : "Activité principale"} :</span> {activity}</p>
              </div>
            </section>

            <section id="publication" className="scroll-mt-8 py-10"><SectionTitle icon={FileText} title={isEnglish ? "Publication director" : "Directeur de la publication"} /><p className="leading-relaxed text-muted-foreground">{isEnglish ? "The publication director is Marino ZORZA." : "Le directeur de la publication est Marino ZORZA."}</p></section>

            <section id="hosting" className="scroll-mt-8 py-10"><SectionTitle icon={Globe2} title={isEnglish ? "Hosting" : "Hébergement"} /><p className="leading-relaxed text-muted-foreground">{isEnglish ? "In its currently published version, this website is hosted by GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States, through the GitHub Pages service." : "Dans sa version actuellement publiée, le site est hébergé par GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis, par l'intermédiaire du service GitHub Pages."}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{isEnglish ? "This information will be updated if the website is moved to another hosting provider." : "Ces informations seront mises à jour si le site est transféré vers un autre hébergeur."}</p></section>

            <section id="property" className="scroll-mt-8 py-10"><SectionTitle icon={ShieldCheck} title={isEnglish ? "Intellectual property" : "Propriété intellectuelle"} /><div className="space-y-4 leading-relaxed text-muted-foreground"><p>{isEnglish ? "All elements on this website, including text, photographs, images, illustrations, graphic elements, logos, icons and the website structure, are protected by French and international intellectual property law." : "L'ensemble des éléments présents sur ce site, notamment les textes, photographies, images, illustrations, éléments graphiques, logos, icônes et la structure générale, est protégé par la législation française et internationale relative à la propriété intellectuelle."}</p><p>{isEnglish ? "Unless stated otherwise, these elements are the property of Marino ZORZA or are used with the permission of their respective rights holders. Any reproduction, representation, modification, adaptation, publication or exploitation of all or part of the website is prohibited without prior written permission." : "Sauf mention contraire, ces éléments sont la propriété de Marino ZORZA ou sont utilisés avec l'autorisation de leurs titulaires respectifs. Toute reproduction, représentation, modification, adaptation, publication ou exploitation, totale ou partielle, est interdite sans autorisation écrite préalable."}</p><p>{isEnglish ? "Photographs of projects displayed on the website may not be reused without prior permission." : "Les photographies des réalisations présentées sur le site ne peuvent pas être réutilisées sans autorisation préalable."}</p></div></section>

            <section id="liability" className="scroll-mt-8 py-10"><SectionTitle icon={FileText} title={isEnglish ? "Liability" : "Responsabilité"} /><div className="space-y-4 leading-relaxed text-muted-foreground"><p>{isEnglish ? "Information on this website is provided for guidance only and may change. La clé de voûte strives to keep it accurate, but cannot guarantee that all content is complete, accurate or up to date at all times." : "Les informations présentées sur ce site sont fournies à titre informatif et peuvent évoluer. La clé de voûte s'efforce de les maintenir aussi précises que possible, sans pouvoir garantir qu'elles soient en permanence complètes, exactes ou à jour."}</p><p>{isEnglish ? "The information published does not constitute a quotation, a contractual commitment or a guarantee as to the feasibility of a project. Each request is assessed according to the characteristics of the worksite." : "Les informations publiées ne constituent pas un devis, un engagement contractuel ou une garantie quant à la faisabilité d'un projet. Chaque demande fait l'objet d'une étude adaptée aux caractéristiques du chantier."}</p></div></section>

            <section id="data" className="scroll-mt-8 py-10"><SectionTitle icon={ShieldCheck} title={isEnglish ? "Personal data" : "Données personnelles"} /><div className="space-y-4 leading-relaxed text-muted-foreground"><p>{isEnglish ? "The website's contact form validates the name, email address, optional phone number, subject and message in the browser, then prepares an email addressed to the company. The site itself does not store the form contents on a server. Information sent by email is used to respond to requests and follow up on projects. It is not sold or passed on to third parties for commercial purposes." : "Le formulaire de contact vérifie le nom, l'adresse e-mail, le téléphone facultatif, l'objet et le message dans le navigateur, puis prépare un e-mail adressé à l'entreprise. Le site ne stocke pas lui-même le contenu du formulaire sur un serveur. Les informations envoyées par e-mail servent à répondre aux demandes et à assurer le suivi des projets. Elles ne sont ni vendues ni transmises à des tiers à des fins commerciales."}</p><p>{isEnglish ? <>You may request access to, correction or deletion of your data by contacting the company at <a className="text-secondary hover:underline" href={`mailto:${company.email}`}>{company.email}</a>.</> : <>Toute personne peut demander l'accès, la rectification ou la suppression des données la concernant en contactant l'entreprise à l'adresse <a className="text-secondary hover:underline" href={`mailto:${company.email}`}>{company.email}</a>.</>}</p><p>{isEnglish ? <>For complete information on purposes, legal bases, retention, recipients and rights, see the <Link className="text-secondary hover:underline" to="/politique-confidentialite">privacy policy</Link>.</> : <>Pour les informations détaillées sur les finalités, bases légales, durées, destinataires et droits, consultez la <Link className="text-secondary hover:underline" to="/politique-confidentialite">politique de confidentialité</Link>.</>}</p></div></section>

            <section id="cookies" className="scroll-mt-8 py-10"><SectionTitle icon={Globe2} title={isEnglish ? "Cookies and third-party services" : "Cookies et services tiers"} /><div className="space-y-4 leading-relaxed text-muted-foreground"><p>{isEnglish ? "The website embeds a map provided by Google Maps. The interactive map is loaded when the page opens; loading it may transmit technical data to Google and may involve cookies or other trackers managed by that provider. Use of this service is subject to Google's terms and privacy policy." : "Le site intègre une carte provenant du service Google Maps. La carte interactive est chargée dès l'ouverture de la page ; son chargement peut entraîner la transmission de données techniques à Google et l'utilisation de cookies ou d'autres traceurs gérés par ce prestataire. L'utilisation de ce service est soumise aux conditions et à la politique de confidentialité de Google."}</p><p>{isEnglish ? "The contact form itself does not set cookies or transmit data to a website server. If analytics, advertising or other tracking tools are added later, this information will be updated and a consent mechanism will be implemented where required." : "Le formulaire de contact ne dépose pas de cookie et ne transmet pas les données à un serveur du site. Si des outils de mesure d'audience, de publicité ou d'autres traceurs sont ajoutés ultérieurement, ces informations seront mises à jour et un dispositif de consentement sera mis en place lorsque requis."}</p></div></section>

            <section id="links" className="scroll-mt-8 py-10"><SectionTitle icon={Globe2} title={isEnglish ? "External links" : "Liens externes"} /><p className="leading-relaxed text-muted-foreground">{isEnglish ? "The website may contain links to websites or services operated by third parties. La clé de voûte does not control these services and cannot be held responsible for their content, availability or data practices." : "Le site peut contenir des liens vers des sites ou services exploités par des tiers. La clé de voûte ne contrôle pas ces services et ne peut être tenue responsable de leur contenu, de leur disponibilité ou de leurs pratiques relatives aux données personnelles."}</p></section>

            <section id="law" className="scroll-mt-8 pt-10"><SectionTitle icon={FileText} title={isEnglish ? "Applicable law" : "Droit applicable"} /><p className="leading-relaxed text-muted-foreground">{isEnglish ? "This website and its legal notice are governed by French law. In the event of a dispute, the parties will endeavour to seek an amicable solution before taking legal action." : "Le présent site et ses mentions légales sont soumis au droit français. En cas de différend, les parties s'efforceront de rechercher une solution amiable avant toute action judiciaire."}</p></section>
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

export default MentionsLegales;
