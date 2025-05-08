
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CivitanLogo from "./CivitanLogo";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[80vh] flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-civitan-blue"></div>
      <div 
        className="absolute inset-0 z-0 opacity-25"
        style={{ 
          transform: `translateY(${scrollPosition * 0.3}px)`,
          backgroundImage: `url("/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="animate-fade-in">
          <CivitanLogo size="xl" className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-civitan-gold">Duluth Civitan</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Serving the community through leadership, knowledge, and action since 2002
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-civitan-gold text-civitan-blue hover:bg-yellow-600 hover:text-white font-bold px-8 py-6 text-lg shadow-md"
              onClick={() => document.getElementById("about")?.scrollIntoView()}
            >
              Learn More
            </Button>
            {!isMobile && (
              <Button
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-civitan-gold hover:text-civitan-blue font-bold px-8 py-6 text-lg shadow-md"
                onClick={() => document.getElementById("events")?.scrollIntoView()}
              >
                View Events
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
