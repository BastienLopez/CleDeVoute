import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { realizations } from "@/data/realizations";
import { useLanguage } from "@/lib/language";

const Realizations = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activeCategory, setActiveCategory] = useState<"all" | "terrasses" | "acces" | "pierre">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const filteredProjects = activeCategory === "all" ? realizations : realizations.filter((project) => project.category === activeCategory);
  const carouselDuration = `${filteredProjects.length * (60 / realizations.length)}s`;
  const categories = isEnglish ? [
    { id: "all" as const, label: "All projects" },
    { id: "terrasses" as const, label: "Terraces & paving" },
    { id: "acces" as const, label: "Outdoor access" },
    { id: "pierre" as const, label: "Stone & interior renovation" },
  ] : [
    { id: "all" as const, label: "Toutes les réalisations" },
    { id: "terrasses" as const, label: "Terrasses & dallages" },
    { id: "acces" as const, label: "Accès extérieurs" },
    { id: "pierre" as const, label: "Pierre & rénovation intérieure" },
  ];
  const projectTitle = (project: (typeof realizations)[number]) => isEnglish ? project.titleEn : project.title;

  const showPrevious = () => setSelectedIndex((index) => index === null ? null : (index - 1 + filteredProjects.length) % filteredProjects.length);
  const showNext = () => setSelectedIndex((index) => index === null ? null : (index + 1) % filteredProjects.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => index === null ? null : (index - 1 + filteredProjects.length) % filteredProjects.length);
      if (event.key === "ArrowRight") setSelectedIndex((index) => index === null ? null : (index + 1) % filteredProjects.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredProjects.length, selectedIndex]);

  return (
    <section id="realisations" className="relative overflow-hidden scroll-mt-24 bg-stone/70 py-24">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 h-64 w-full bg-gradient-to-b from-white/60 to-transparent" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {isEnglish ? "Our projects" : "Nos réalisations"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {isEnglish ? "Browse the projects or click a photo to enlarge it." : "Faites défiler les réalisations ou cliquez sur une photo pour l'agrandir."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button key={category.id} type="button" onClick={() => { setActiveCategory(category.id); setSelectedIndex(null); }} className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${activeCategory === category.id ? "border-secondary bg-secondary text-white" : "border-border bg-white text-foreground hover:border-secondary hover:text-secondary"}`}>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="carousel-viewport overflow-hidden" aria-label={isEnglish ? "Projects carousel" : "Carrousel des réalisations"}>
          <div key={activeCategory} className="carousel-track flex w-max py-2" style={{ animationDuration: carouselDuration }}>
            {[0, 1].map((round) => (
              <div key={round} className="flex gap-5 pr-5">
                {filteredProjects.map((project, index) => (
                  <button
                    key={`${project.id}-${round}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group relative h-64 w-96 shrink-0 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-secondary/40 sm:h-80 sm:w-[32rem]"
                    aria-label={isEnglish ? `Enlarge: ${projectTitle(project)}` : `Agrandir : ${projectTitle(project)}`}
                  >
                    <img src={project.image} alt={projectTitle(project)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={isEnglish ? "Project preview" : "Aperçu de la réalisation"} onClick={() => setSelectedIndex(null)}>
          <div className="relative flex max-h-full max-w-6xl items-center" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={showPrevious} className="absolute -left-2 z-10 rounded-full bg-white p-3 text-primary shadow-lg md:-left-20" aria-label={isEnglish ? "Previous photo" : "Photo précédente"}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <figure className="max-h-[90vh] overflow-hidden rounded-xl bg-black">
              <img src={filteredProjects[selectedIndex].image} alt={projectTitle(filteredProjects[selectedIndex])} className="max-h-[78vh] max-w-full object-contain" />
              <figcaption className="px-6 py-5 text-center font-display text-2xl font-bold text-white">{projectTitle(filteredProjects[selectedIndex])}</figcaption>
            </figure>
            <button type="button" onClick={showNext} className="absolute -right-2 z-10 rounded-full bg-white p-3 text-primary shadow-lg md:-right-20" aria-label={isEnglish ? "Next photo" : "Photo suivante"}>
              <ChevronRight className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => setSelectedIndex(null)} className="absolute -right-1 -top-12 rounded-full bg-white p-2 text-primary shadow-lg" aria-label={isEnglish ? "Close preview" : "Fermer l'aperçu"}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Realizations;
