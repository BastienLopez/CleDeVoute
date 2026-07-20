import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/language";

const NotFound = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {isEnglish ? "This page cannot be found." : "Cette page est introuvable."}
        </p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {isEnglish ? "Return to home" : "Retour à l’accueil"}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
