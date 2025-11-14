import { useState } from "react";
import realisation1 from "@/assets/real-villa-moderne.jpg";
import realisation2 from "@/assets/real-renovation-pierre.jpg";
import realisation3 from "@/assets/real-extension-verre.jpg";
import realisation4 from "@/assets/real-terrasse.jpg";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Realizations = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      image: realisation1,
      title: "Villa moderne haut de gamme",
      category: "construction",
      location: "Sedan",
      description: "Construction neuve d'une villa de standing avec maçonnerie en pierre naturelle",
      surface: "280m²"
    },
    {
      image: realisation2,
      title: "Rénovation maison de caractère",
      category: "renovation",
      location: "Ardennes",
      description: "Réhabilitation complète d'une maison traditionnelle en pierre",
      surface: "180m²"
    },
    {
      image: realisation3,
      title: "Extension contemporaine",
      category: "extension",
      location: "Sedan",
      description: "Agrandissement moderne avec baies vitrées et structure mixte",
      surface: "45m²"
    },
    {
      image: realisation4,
      title: "Terrasse & aménagements extérieurs",
      category: "amenagement",
      location: "Charleville-Mézières",
      description: "Création d'une terrasse en pierre naturelle avec murets décoratifs",
      surface: "120m²"
    }
  ];

  const categories = [
    { id: "all", label: "Tous les projets" },
    { id: "construction", label: "Construction" },
    { id: "renovation", label: "Rénovation" },
    { id: "extension", label: "Extension" },
    { id: "amenagement", label: "Aménagements" }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="realisations" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-muted to-transparent" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Nos réalisations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Découvrez nos projets réalisés avec passion et savoir-faire
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className={`${
                  activeCategory === cat.id 
                    ? "bg-gradient-to-r from-secondary to-accent text-white" 
                    : "hover:border-secondary"
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Surface Badge */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-4 py-2">
                  <span className="text-white font-semibold text-sm">{project.surface}</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-secondary font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  {project.location}
                </p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-lg italic mb-4">
                  "Travail remarquable et équipe très professionnelle. Notre extension est parfaitement réussie !"
                </p>
                <p className="font-semibold">M. et Mme Dubois</p>
                <p className="text-sm text-white/70">Extension maison - Sedan</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary to-accent text-white p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white text-white" />
                  ))}
                </div>
                <p className="text-lg italic mb-4">
                  "Réactivité, transparence et qualité. Je recommande vivement La clé de voûte !"
                </p>
                <p className="font-semibold">Patrick M.</p>
                <p className="text-sm text-white/80">Rénovation complète - Charleville</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realizations;
