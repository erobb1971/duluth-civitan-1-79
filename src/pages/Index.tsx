
import React from "react";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";
import MembershipSection from "@/components/MembershipSection";
import { useIsMobile } from "@/hooks/use-mobile";
// import { initializeSecurity } from "@/utils/security";

const Index = () => {
  // Security initialization temporarily disabled for domain linking
  // useEffect(() => {
  //   try {
  //     initializeSecurity();
  //   } catch (error) {
  //     console.error("Error initializing security in Index component:", error);
  //   }
  // }, []);
  
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen pb-mobile-nav relative overflow-x-hidden ${isMobile ? '' : 'pt-20 lg:pt-20'}`}>
      <DesktopNavigation />
      <div id="home" className={`${isMobile ? '' : 'scroll-mt-20'}`}></div>
      <HeroSection />
      
      <div id="about" className="scroll-mt-20"></div>
      <AboutSection />
      
      {/* Timeline section with proper z-index */}
      <div className="relative z-10 bg-gray-100 dark:bg-gray-800">
        <TimelineSection />
      </div>
      
      {/* Membership section (which now includes CTA) */}
      <div id="membership" className="scroll-mt-20"></div>
      <MembershipSection />
      
      {/* Rest of the sections */}
      <div className="relative z-10 overflow-x-hidden">
        <div id="partners" className="scroll-mt-20"></div>
        <PartnersSection />
        
        <div id="gallery" className="scroll-mt-20"></div>
        <GallerySection />
        
        <div id="events" className="scroll-mt-20"></div>
        <EventsSection />
        
        {!isMobile && (
          <>
            <div id="contact" className="scroll-mt-20"></div>
            <ContactSection />
          </>
        )}
        
        <Footer />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Index;
