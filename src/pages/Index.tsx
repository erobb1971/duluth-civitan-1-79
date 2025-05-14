
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
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pb-mobile-nav">
      <DesktopNavigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <CtaSection />
      <GallerySection />
      <EventsSection />
      <ContactSection />
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Index;
