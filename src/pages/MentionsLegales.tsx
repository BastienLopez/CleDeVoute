import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const MentionsLegales = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isEnglish ? "Back to home" : "Retour à l'accueil"}
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">{isEnglish ? "Legal notice" : "Mentions légales"}</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{isEnglish ? "Website publisher" : "Éditeur du site"}</h2>
            <div className="text-muted-foreground space-y-2">
              <p><strong>{isEnglish ? "Company" : "Entreprise"} :</strong> {company.name}</p>
              <p><strong>{isEnglish ? "Publication manager" : "Responsable de publication"} :</strong> {company.founder}</p>
              <p><strong>{isEnglish ? "Address" : "Adresse"} :</strong> {company.address.line1}, {company.address.postalCode} {company.address.city}</p>
              <p><strong>{isEnglish ? "Phone" : "Téléphone"} :</strong> <a className="underline" href={company.phoneHref}>{company.phoneDisplay}</a></p>
              <p><strong>Email :</strong> <a className="underline" href={`mailto:${company.email}`}>{company.email}</a></p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{isEnglish ? "Activity" : "Activité"}</h2>
            <p className="text-muted-foreground">
              {isEnglish ? "General masonry and structural work." : company.activity}
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{isEnglish ? "Intellectual property" : "Propriété intellectuelle"}</h2>
            <p className="text-muted-foreground">
              {isEnglish ? "This website is protected by French and international copyright and intellectual property laws. All reproduction rights are reserved, including for downloadable documents and photographic material." : "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques."}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{isEnglish ? "Personal data" : "Protection des données personnelles"}</h2>
            <p className="text-muted-foreground">
              {isEnglish ? "The site has no form that transmits data. To contact the company, you use your own email service or telephone. A privacy policy must be defined before introducing a contact form." : "Le site ne comporte pas de formulaire qui transmet des données. Pour contacter l'entreprise, vous utilisez votre propre messagerie ou votre téléphone. Une politique de confidentialité devra être définie avant la mise en place d'un formulaire de contact."}
            </p>
            <p className="text-muted-foreground">
              {isEnglish ? "For any question about data sent directly to the company, contact it by email or telephone." : "Pour toute question relative à vos données transmises directement à l'entreprise, contactez-la par e-mail ou par téléphone."}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
            <p className="text-muted-foreground">
              {isEnglish ? "The Google Maps map displayed on the page may transmit data to Google. Cookie and third-party service terms must be confirmed before final publication." : "La carte Google Maps affichée sur la page peut transmettre des données à Google. Les modalités relatives aux cookies et services tiers devront être confirmées avant la mise en ligne définitive."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
