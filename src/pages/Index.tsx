
import React from "react";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import MembershipSection from "@/components/MembershipSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DesktopNavigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <EventsSection />
      <ContactSection />
      <MembershipSection />
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Index;
