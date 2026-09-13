import { ArrowDownRight, Mail, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-premium.jpg";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const Hero = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <section id="top" className="scroll-mt-24 bg-stone/35 lg:pt-20">
      <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(23rem,0.82fr)] lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <div className="mb-7 flex items-start justify-between gap-4 md:block">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary sm:text-sm">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Sedan · Ardennes
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-secondary/70 sm:block" aria-hidden="true" />
                <span className="min-w-0 break-words">{isEnglish ? "General masonry" : "Maçonnerie générale"}</span>
              </div>
              <div className="-mt-2 w-[42%] max-w-[12rem] shrink-0 rounded-sm border border-primary/10 bg-background p-2 shadow-sm md:hidden">
                <img src={logoSrc} alt="La clé de voûte" width={551} height={164} className="h-auto w-full" />
              </div>
            </div>

            <h1 className="max-w-full break-words font-display text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-primary-dark sm:text-6xl lg:text-7xl">
              {isEnglish ? (
                <>General masonry & structural work in <span className="text-secondary">Sedan.</span></>
              ) : (
                <>Maçonnerie générale et gros œuvre à <span className="text-secondary">Sedan.</span></>
              )}
            </h1>

            <p className="mt-7 max-w-2xl break-words text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {isEnglish
                ? "New builds, renovation, stonework and outdoor projects for private and professional clients."
                : "Construction neuve, rénovation, pierre et aménagements extérieurs pour les particuliers comme pour les professionnels."}
            </p>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-secondary">Compagnon du devoir</p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center md:flex-nowrap">
              <a
                href="#realisations"
                className="relative inline-flex h-20 min-h-20 w-full items-center justify-center rounded-md bg-secondary px-12 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/25 sm:w-auto"
              >
                <span className="text-center">{isEnglish ? "See the projects" : "Voir les réalisations"}</span>
                <ArrowDownRight className="absolute right-6 h-5 w-5" aria-hidden="true" />
              </a>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href={company.phoneHref}
                  className="relative inline-flex h-20 min-h-20 w-full flex-col items-center justify-center gap-1 rounded-md border border-primary/25 bg-background px-6 py-2 text-center text-base font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 sm:w-auto"
                >
                  <span className="relative flex w-full items-center justify-center text-center">
                    <span className="text-center">{isEnglish ? "Call the company" : "Appeler l'entreprise"}</span>
                  </span>
                  <span className="w-full text-center text-sm font-medium text-primary/60">{company.phoneDisplay}</span>
                </a>
                <div className="hidden h-20 items-center justify-center rounded-md border border-primary/10 bg-background px-4 shadow-sm md:flex">
                  <img src={logoSrc} alt="La clé de voûte" width={551} height={164} className="h-14 w-auto" />
                </div>
              </div>
            </div>

            <a
              href={`mailto:${company.email}`}
              className="mt-4 flex min-h-11 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-sm font-semibold text-primary underline decoration-secondary/50 underline-offset-4 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 sm:justify-start sm:text-left"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{isEnglish ? "Request a quote by email" : "Demander un devis par e-mail"}</span>
              <span className="text-primary/35 no-underline" aria-hidden="true">·</span>
              <span className="break-all text-[0.8rem] text-primary/65 sm:text-sm">{company.email}</span>
            </a>

          </div>

          <figure className="relative min-w-0 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-primary-dark shadow-xl">
            <img
              src={heroImage}
              alt={isEnglish ? "Masonry work on a brick building" : "Travaux de maçonnerie sur un bâtiment en briques"}
              width={1920}
              height={1080}
              loading="eager"
              decoding="async"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-primary-dark/95 px-6 py-5 text-primary-foreground sm:px-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">La clé de voûte</p>
              <p className="mt-2 max-w-sm font-display text-xl font-semibold leading-tight sm:text-2xl">
                {isEnglish ? "General masonry & structural work" : "Maçonnerie générale & gros œuvre"}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
