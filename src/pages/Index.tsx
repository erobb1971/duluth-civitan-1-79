
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MembershipSection from "@/components/MembershipSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import BackToTop from "@/components/BackToTop";
import TimelineSection from "@/components/TimelineSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DesktopNavigation />
      <MobileNavigation />
      
      <HeroSection />
      <AboutSection />
      <MembershipSection />
      <EventsSection />
      <TimelineSection />
      <GallerySection />
      <PartnersSection />
      <ContactSection />
      <CtaSection />
      <Footer />
      
      <BackToTop />
    </div>
  );
};

export default Index;
