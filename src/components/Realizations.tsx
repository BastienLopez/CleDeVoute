import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { realizations } from "@/data/realizations";
import { useLanguage } from "@/lib/language";

type Category = "all" | "terrasses" | "acces" | "pierre";

const Realizations = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const filteredProjects = activeCategory === "all" ? realizations : realizations.filter((project) => project.category === activeCategory);
  const modalOpen = selectedIndex !== null;
  const carouselDuration = `${Math.max(filteredProjects.length * 5.5, 18)}s`;

  const categories = isEnglish
    ? [
        { id: "all" as const, label: "All projects" },
        { id: "terrasses" as const, label: "Terraces & paving" },
        { id: "acces" as const, label: "Outdoor access" },
        { id: "pierre" as const, label: "Stonework & renovation" },
      ]
    : [
        { id: "all" as const, label: "Toutes les réalisations" },
        { id: "terrasses" as const, label: "Terrasses & dallages" },
        { id: "acces" as const, label: "Accès extérieurs" },
        { id: "pierre" as const, label: "Pierre & rénovation" },
      ];

  const projectTitle = (project: (typeof realizations)[number]) => (isEnglish ? project.titleEn : project.title);
  const categoryLabel = (category: (typeof realizations)[number]["category"]) => {
    if (category === "terrasses") return isEnglish ? "Terraces & paving" : "Terrasses & dallages";
    if (category === "acces") return isEnglish ? "Outdoor access" : "Accès extérieurs";
    return isEnglish ? "Stonework & renovation" : "Pierre & rénovation";
  };

  const scrollCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstSlide = carousel.querySelector<HTMLElement>("[data-carousel-slide]");
    const slideDistance = firstSlide ? firstSlide.offsetWidth + 20 : carousel.clientWidth * 0.8;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollBy({ left: direction * slideDistance, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const showPrevious = useCallback(() => setSelectedIndex((index) => (index === null ? null : (index - 1 + filteredProjects.length) % filteredProjects.length)), [filteredProjects.length]);
  const showNext = useCallback(() => setSelectedIndex((index) => (index === null ? null : (index + 1) % filteredProjects.length)), [filteredProjects.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: 0, behavior: "auto" });
  }, [activeCategory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, showNext, showPrevious]);

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocusedElementRef.current?.focus({ preventScroll: true });
      lastFocusedElementRef.current = null;
    };
  }, [modalOpen]);

  const handleModalKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled])'));
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <section id="realisations" className="scroll-mt-24 bg-background">
      <div className="container px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-8 border-b border-primary/15 pb-12 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{isEnglish ? "Selected work" : "Réalisations"}</p>
          <div>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-primary-dark sm:text-5xl">
              {isEnglish ? "Work that shows the material and the gesture." : "Des réalisations qui montrent la matière et le geste."}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {isEnglish ? "Browse the projects at your own pace, then click a photo to enlarge it." : "Parcourez les réalisations à votre rythme, puis cliquez sur une photo pour l'agrandir."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={isEnglish ? "Filter projects" : "Filtrer les réalisations"}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedIndex(null);
              }}
              className={activeCategory === category.id
                ? "min-h-11 rounded-full border border-secondary bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/25"
                : "min-h-11 rounded-full border border-primary/20 bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20"}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="realizations-carousel mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {isEnglish ? "Projects scroll automatically; swipe or use the arrows to browse." : "Les projets défilent automatiquement ; faites glisser ou utilisez les flèches pour parcourir."}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20"
                aria-label={isEnglish ? "Previous projects" : "Réalisations précédentes"}
                aria-controls="realizations-carousel"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20"
                aria-label={isEnglish ? "Next projects" : "Réalisations suivantes"}
                aria-controls="realizations-carousel"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            id="realizations-carousel"
            ref={carouselRef}
            className="realizations-viewport -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-5 scroll-smooth focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/20 sm:mx-0 sm:px-0 lg:overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label={isEnglish ? "Projects carousel" : "Carrousel des réalisations"}
            aria-live="off"
            tabIndex={0}
          >
            <div key={activeCategory} className="desktop-carousel-track flex w-max" style={{ animationDuration: carouselDuration }}>
              {[0, 1].map((round) => (
                <div key={round} className="flex gap-5 pr-5" aria-hidden={round === 1}>
                  {filteredProjects.map((project, index) => (
                    <button
                      key={`${project.id}-${round}`}
                      type="button"
                      data-carousel-slide
                      tabIndex={round === 1 ? -1 : undefined}
                      onClick={(event) => {
                        lastFocusedElementRef.current = event.currentTarget;
                        setSelectedIndex(index);
                      }}
                      className="group relative h-[24rem] w-[calc(100vw-2rem)] shrink-0 snap-start overflow-hidden rounded-md bg-primary-dark text-left shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40 sm:h-[27rem] sm:w-[32rem] lg:w-[min(36rem,34vw)]"
                      aria-label={isEnglish ? `Enlarge: ${projectTitle(project)}` : `Agrandir : ${projectTitle(project)}`}
                    >
                      <img
                        src={project.image}
                        alt={projectTitle(project)}
                        width={project.width}
                        height={project.height}
                        loading={round === 0 && index < 3 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-primary-dark/20 px-5 py-5 text-center text-white transition-colors group-hover:bg-primary-dark/30 sm:px-7 sm:py-6">
                        <span className="block text-center text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{categoryLabel(project.category)}</span>
                        <span className="mt-2 block text-center font-display text-2xl font-semibold leading-tight sm:text-3xl">{projectTitle(project)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/95 p-4" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={() => setSelectedIndex(null)} onKeyDown={handleModalKeyDown}>
          <div className="relative flex max-h-full max-w-6xl items-center" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={showPrevious} className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-primary shadow-lg transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40 sm:-left-16" aria-label={isEnglish ? "Previous photo" : "Photo précédente"}>
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <figure className="max-h-[90vh] overflow-hidden rounded-md border border-white/15 bg-primary-dark">
              <img src={filteredProjects[selectedIndex].image} alt={projectTitle(filteredProjects[selectedIndex])} width={filteredProjects[selectedIndex].width} height={filteredProjects[selectedIndex].height} decoding="async" className="max-h-[76vh] max-w-[calc(100vw-2rem)] object-contain sm:max-w-[80vw]" />
              <figcaption className="px-5 py-4 text-white sm:px-7 sm:py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{categoryLabel(filteredProjects[selectedIndex].category)}</p>
                <h2 id="project-dialog-title" className="mt-1 font-display text-xl font-semibold sm:text-2xl">{projectTitle(filteredProjects[selectedIndex])}</h2>
              </figcaption>
            </figure>
            <button type="button" onClick={showNext} className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-primary shadow-lg transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40 sm:-right-16" aria-label={isEnglish ? "Next photo" : "Photo suivante"}>
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
            <button ref={modalCloseRef} type="button" onClick={() => setSelectedIndex(null)} className="absolute -right-1 -top-12 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary shadow-lg transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/40" aria-label={isEnglish ? "Close preview" : "Fermer l'aperçu"}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Realizations;
