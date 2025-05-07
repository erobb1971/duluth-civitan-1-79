
import React from "react";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DesktopNavigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <EventsSection />
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Index;
