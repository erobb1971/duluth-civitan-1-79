
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
import MembershipApplicationModal from "@/components/MembershipApplicationModal";
import GalleryModal from "@/components/GalleryModal";
import CalendarModal from "@/components/CalendarModal";
import DonationModal from "@/components/DonationModal";
import VolunteerModal from "@/components/VolunteerModal";
import VoiceMessageModal from "@/components/VoiceMessageModal";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import AdminUploadModal from "@/components/AdminUploadModal";
import TimelineSection from "@/components/TimelineSection";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [voiceMessageModalOpen, setVoiceMessageModalOpen] = useState(false);
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [adminUploadModalOpen, setAdminUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <DesktopNavigation 
        onMembershipClick={() => setMembershipModalOpen(true)}
        onGalleryClick={() => setGalleryModalOpen(true)}
        onCalendarClick={() => setCalendarModalOpen(true)}
        onDonationClick={() => setDonationModalOpen(true)}
        onVolunteerClick={() => setVolunteerModalOpen(true)}
        onVoiceMessageClick={() => setVoiceMessageModalOpen(true)}
        onAdminUploadClick={() => setAdminUploadModalOpen(true)}
        isAuthenticated={!!user}
      />
      <MobileNavigation 
        onMembershipClick={() => setMembershipModalOpen(true)}
        onGalleryClick={() => setGalleryModalOpen(true)}
        onCalendarClick={() => setCalendarModalOpen(true)}
        onDonationClick={() => setDonationModalOpen(true)}
        onVolunteerClick={() => setVolunteerModalOpen(true)}
        onVoiceMessageClick={() => setVoiceMessageModalOpen(true)}
        onAdminUploadClick={() => setAdminUploadModalOpen(true)}
        isAuthenticated={!!user}
      />
      
      <HeroSection />
      <AboutSection />
      <MembershipSection onJoinClick={() => setMembershipModalOpen(true)} />
      <EventsSection />
      <TimelineSection />
      <GallerySection onViewGalleryClick={() => setGalleryModalOpen(true)} />
      <PartnersSection />
      <ContactSection />
      <CtaSection 
        onMembershipClick={() => setMembershipModalOpen(true)}
        onDonationClick={() => setDonationModalOpen(true)}
        onVolunteerClick={() => setVolunteerModalOpen(true)}
      />
      <Footer onPrivacyPolicyClick={() => setPrivacyPolicyModalOpen(true)} />
      
      <BackToTop />
      
      <MembershipApplicationModal 
        open={membershipModalOpen} 
        onOpenChange={setMembershipModalOpen} 
      />
      <GalleryModal 
        open={galleryModalOpen} 
        onOpenChange={setGalleryModalOpen} 
      />
      <CalendarModal 
        open={calendarModalOpen} 
        onOpenChange={setCalendarModalOpen} 
      />
      <DonationModal 
        open={donationModalOpen} 
        onOpenChange={setDonationModalOpen} 
      />
      <VolunteerModal 
        open={volunteerModalOpen} 
        onOpenChange={setVolunteerModalOpen} 
      />
      <VoiceMessageModal 
        open={voiceMessageModalOpen} 
        onOpenChange={setVoiceMessageModalOpen} 
      />
      <PrivacyPolicyModal 
        open={privacyPolicyModalOpen} 
        onOpenChange={setPrivacyPolicyModalOpen} 
      />
      <AdminUploadModal 
        open={adminUploadModalOpen} 
        onOpenChange={setAdminUploadModalOpen} 
      />
    </div>
  );
};

export default Index;
