import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-premium.jpg";
import { company } from "@/data/company";
import { useLanguage } from "@/lib/language";

const Hero = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-primary-dark/85" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white/90 text-sm font-medium">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            {isEnglish ? "General masonry and structural work in Sedan" : "Maçonnerie générale et gros œuvre à Sedan"}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight">
            La clé de voûte
          </h1>
          
          <div className="space-y-4">
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/95 font-semibold">
              {isEnglish ? "General masonry & structural work" : "Maçonnerie générale & gros œuvre"}
            </p>
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
              {isEnglish ? "New builds • Renovation • Rehabilitation • Extensions" : "Construction neuve • Rénovation • Réhabilitation • Agrandissement"}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="group text-lg px-10 py-7 bg-gradient-to-r from-secondary to-accent hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
              onClick={scrollToContact}
            >
              {isEnglish ? "Tell us about your project" : "Parlez-nous de votre projet"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-7 backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold"
              asChild
            >
              <a href={company.phoneHref} className="flex items-center">
                <Phone className="mr-3 h-5 w-5" />
                {company.phoneDisplay}
              </a>
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
