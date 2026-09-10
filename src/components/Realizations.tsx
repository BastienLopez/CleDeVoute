import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
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
  const carouselDuration = filteredProjects.length * (30 / (0.6 * realizations.length)) + "s";
  const scrollBehavior = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
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

  const scrollCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * Math.max(carousel.clientWidth * 0.8, 320), behavior: scrollBehavior() });
  };

  const showPrevious = () => setSelectedIndex((index) => (index === null ? null : (index - 1 + filteredProjects.length) % filteredProjects.length));
  const showNext = () => setSelectedIndex((index) => (index === null ? null : (index + 1) % filteredProjects.length));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((index) => (index === null ? null : (index - 1 + filteredProjects.length) % filteredProjects.length));
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((index) => (index === null ? null : (index + 1) % filteredProjects.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, filteredProjects.length]);

  useEffect(() => {
    if (!modalOpen) return;

    if (!lastFocusedElementRef.current) {
      lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
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
    <section id="realisations" className="section-transition section-transition-from-stone-to-white relative scroll-mt-24 bg-background py-24">
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl">
            {isEnglish ? "Our projects" : "Nos réalisations"}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-muted-foreground">
            {isEnglish ? "Browse the projects at your own pace, then click a photo to enlarge it." : "Parcourez les réalisations à votre rythme, puis cliquez sur une photo pour l'agrandir."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id);
                  setSelectedIndex(null);
                  carouselRef.current?.scrollTo({ left: 0, behavior: scrollBehavior() });
                }}
                className={activeCategory === category.id ? "rounded-full border border-secondary bg-secondary px-5 py-2 text-sm font-semibold text-white transition-colors" : "rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary"}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="realizations-carousel">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {isEnglish ? "Swipe on mobile or use the arrows to browse." : "Faites glisser sur mobile ou utilisez les flèches pour parcourir."}
            </p>
            <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => scrollCarousel(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20" aria-label={isEnglish ? "Previous projects" : "Réalisations précédentes"}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scrollCarousel(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition-colors hover:border-secondary hover:text-secondary focus:outline-none focus:ring-4 focus:ring-secondary/20" aria-label={isEnglish ? "Next projects" : "Réalisations suivantes"}>
              <ChevronRight className="h-5 w-5" />
            </button>
            </div>
          </div>

          <div ref={carouselRef} className="realizations-viewport -mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-5 scroll-smooth sm:mx-0 sm:px-0 lg:overflow-x-hidden" role="region" aria-roledescription="carousel" aria-label={isEnglish ? "Projects carousel" : "Carrousel des réalisations"}>
            <div key={activeCategory} className="desktop-carousel-track flex w-max" style={{ animationDuration: carouselDuration }}>
            {[0, 1].map((round) => (
              <div key={round} className={round === 0 ? "flex gap-5 pr-5" : "hidden gap-5 pr-5 lg:flex"} aria-hidden={round === 1}>
                {filteredProjects.map((project, index) => (
                  <button
                    key={project.id + "-" + round}
                    type="button"
                    onClick={(event) => {
                      lastFocusedElementRef.current = event.currentTarget;
                      setSelectedIndex(index);
                    }}
                    className="group relative h-72 w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-secondary/40 sm:h-80 sm:w-[28rem] lg:w-[32rem]"
                    aria-label={isEnglish ? "Enlarge: " + projectTitle(project) : "Agrandir : " + projectTitle(project)}
                    tabIndex={round === 1 ? -1 : undefined}
                  >
                    <img src={project.image} alt={projectTitle(project)} width={project.width} height={project.height} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 pb-5 pt-16 text-center font-display text-2xl font-bold text-white">
                      {projectTitle(project)}
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={isEnglish ? "Project preview" : "Aperçu de la réalisation"} onClick={() => setSelectedIndex(null)} onKeyDown={handleModalKeyDown}>
          <div className="relative flex max-h-full max-w-6xl items-center" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={showPrevious} className="absolute -left-2 z-10 rounded-full bg-white p-3 text-primary shadow-lg md:-left-20" aria-label={isEnglish ? "Previous photo" : "Photo précédente"}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <figure className="max-h-[90vh] overflow-hidden rounded-xl bg-black">
              <img src={filteredProjects[selectedIndex].image} alt={projectTitle(filteredProjects[selectedIndex])} width={filteredProjects[selectedIndex].width} height={filteredProjects[selectedIndex].height} decoding="async" className="max-h-[78vh] max-w-full object-contain" />
              <figcaption className="px-6 py-5 text-center font-display text-2xl font-bold text-white">{projectTitle(filteredProjects[selectedIndex])}</figcaption>
            </figure>
            <button type="button" onClick={showNext} className="absolute -right-2 z-10 rounded-full bg-white p-3 text-primary shadow-lg md:-right-20" aria-label={isEnglish ? "Next photo" : "Photo suivante"}>
              <ChevronRight className="h-6 w-6" />
            </button>
            <button ref={modalCloseRef} type="button" onClick={() => setSelectedIndex(null)} className="absolute -right-1 -top-12 rounded-full bg-white p-2 text-primary shadow-lg" aria-label={isEnglish ? "Close preview" : "Fermer l'aperçu"}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Realizations;
