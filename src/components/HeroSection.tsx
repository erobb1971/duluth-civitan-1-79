
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CivitanLogo from "./CivitanLogo";
import { useIsMobile } from "@/hooks/use-mobile";
import MembershipApplicationModal from "./MembershipApplicationModal";

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenModal = () => {
    setMembershipModalOpen(true);
  };

  // Calculate parallax effect with a gentler multiplier for mobile
  const parallaxOffset = scrollPosition * (isMobile ? 0.1 : 0.35);

  return (
    <section id="home" className={`relative min-h-[80vh] sm:h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden ${isMobile ? 'mt-0' : ''}`}>
      {/* Blue background layer */}
      <div className="absolute inset-0 z-0 bg-civitan-blue"></div>
      
      {/* Parallax background image with optimized effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: `url("/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Content container with padding adjustments */}
      <div className={`container mx-auto px-3 sm:px-6 z-10 text-center flex flex-col justify-center h-full py-12 ${isMobile ? 'pt-16' : ''}`}>
        <div className="animate-fade-in py-3 sm:py-8 max-w-4xl mx-auto">
          <CivitanLogo size="lg" className="mx-auto mb-4 sm:mb-6" />
          <h1 className="text-shine text-xl sm:text-3xl md:text-5xl">Make A Lasting Impact!</h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-10 text-civitan-gold">
            Join the Duluth Civitan Today!
          </h2>
          <p className="text-sm sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-3xl mx-auto px-2 sm:px-4">
            The Duluth Civitan Club is a civic volunteer group serving Duluth and Gwinnett County since 2003. We empower individuals with developmental disabilities through service, fundraising, and advocacy — building a more inclusive, caring community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 px-4">
            <Button
              className="bg-civitan-gold text-civitan-blue hover:bg-civitan-gold hover:text-white font-bold px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg shadow-md mobile-touch-target"
              onClick={handleOpenModal}
            >
              Become A Member
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
      
      <MembershipApplicationModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
      />
    </section>
  );
};

export default HeroSection;
