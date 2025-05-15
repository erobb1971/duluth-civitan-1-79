
import React from "react";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import CtaSection from "@/components/CtaSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pb-mobile-nav relative">
      <DesktopNavigation />
      <div id="home"></div>
      <HeroSection />
      <AboutSection />
      <div className="relative z-10 overflow-visible">
        <TimelineSection />
        <CtaSection />
      </div>
      <div className="relative z-20">
        <PartnersSection />
        <GallerySection />
        <EventsSection />
        <ContactSection />
        <Footer />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Index;
