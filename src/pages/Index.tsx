
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
      <div id="contact">
        <Footer />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Index;
