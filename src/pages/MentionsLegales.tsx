import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 py-20">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Mentions légales</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Éditeur du site</h2>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Raison sociale :</strong> La clé de voûte</p>
              <p><strong>SIREN :</strong> 437 685 043</p>
              <p><strong>Adresse :</strong> 4 Place de l'Épine, 08200 Sedan</p>
              <p><strong>Téléphone :</strong> 06 69 15 86 71</p>
              <p><strong>Email :</strong> contact@lacledevoute.fr</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Activité</h2>
            <p className="text-muted-foreground">
              Travaux de maçonnerie générale et gros œuvre de bâtiment
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Propriété intellectuelle</h2>
            <p className="text-muted-foreground">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
              documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Protection des données personnelles</h2>
            <p className="text-muted-foreground">
              Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier 
              informatisé par La clé de voûte pour le traitement de votre demande de contact. 
              Elles sont conservées pendant 3 ans et sont destinées uniquement à l'entreprise La clé de voûte.
            </p>
            <p className="text-muted-foreground">
              Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux 
              données vous concernant et les faire rectifier en nous contactant par email ou par téléphone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
            <p className="text-muted-foreground">
              Ce site n'utilise pas de cookies de suivi ou de ciblage publicitaire.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
