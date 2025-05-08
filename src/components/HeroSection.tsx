
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

  // Calculate parallax effect with a stronger multiplier
  const parallaxOffset = scrollPosition * 0.5; // Increased from 0.3 for more noticeable effect

  return (
    <section id="home" className="relative h-screen w-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Blue background layer */}
      <div className="absolute inset-0 z-0 bg-civitan-blue"></div>
      
      {/* Parallax background image with enhanced effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20" // Changed opacity from 0.30 to 0.20 (20%)
        style={{ 
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: `url("/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png")`,
          backgroundPosition: "center center", // Changed from top center
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Content container with padding adjustments */}
      <div className="container mx-auto px-4 z-10 text-center py-16">
        <div className="animate-fade-in py-8 max-w-4xl mx-auto">
          <CivitanLogo size="xl" className="mx-auto mb-8" />
          <h1 className="text-shine">Make A Lasting Impact!</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-civitan-gold">
            Join the Duluth Civitan Today!
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto px-4">
            The Duluth Civitan Club is a civic volunteer group serving Duluth and Gwinnett County since 2002. We empower individuals with developmental disabilities through service, fundraising, and advocacy — building a more inclusive, caring community. Ready to make a difference?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Button
              className="bg-civitan-gold text-civitan-blue hover:bg-civitan-gold hover:text-white font-bold px-8 py-6 text-lg shadow-md"
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
