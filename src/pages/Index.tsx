import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Realizations from "@/components/Realizations";
import InterventionZone from "@/components/InterventionZone";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Stats />
      <About />
      <Services />
      <WhyChooseUs />
      <Realizations />
      <InterventionZone />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
