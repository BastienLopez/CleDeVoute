import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Realizations from "@/components/Realizations";
import InterventionZone from "@/components/InterventionZone";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only z-[100] bg-white px-4 py-2 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:outline-none focus:ring-4 focus:ring-secondary/30">
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Realizations />
        <InterventionZone />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
