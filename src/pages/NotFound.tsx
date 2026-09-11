import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/language";

const NotFound = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="flex min-h-screen items-center bg-stone">
      <div className="container px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">La clé de voûte</p>
        <p className="mt-8 font-mono text-sm font-semibold tracking-[0.18em] text-primary/45">404</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-primary-dark sm:text-6xl">
          {isEnglish ? "This page cannot be found." : "Cette page est introuvable."}
        </h1>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-3 font-semibold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/25">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {isEnglish ? "Return to home" : "Retour à l'accueil"}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
