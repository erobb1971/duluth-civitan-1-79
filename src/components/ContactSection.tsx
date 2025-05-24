import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import DonationModal from "./DonationModal";
import MembershipApplicationModal from "./MembershipApplicationModal";
import VolunteerModal from "./VolunteerModal";
import ContactButton from "./contact/ContactButton";
import GetInvolvedSection from "./contact/GetInvolvedSection";
import ContactBackground from "./contact/ContactBackground";

const ContactSection = () => {
  const isMobile = useIsMobile();
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  // Don't render the section on mobile devices
  if (isMobile) return null;

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
  };

  const handleVolunteerClick = () => {
    setVolunteerModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="contact" className="section relative overflow-hidden pt-16 pb-20">
      <ContactBackground />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">
            Ready to connect with Duluth Civitan? Reach out or get involved through any of these channels.
          </p>
        </div>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Call button */}
          <ContactButton 
            icon={Phone} 
            label="Call Us" 
            onClick={() => window.location.href = 'tel:678-242-0445'} 
          />

          {/* Email button */}
          <ContactButton 
            icon={Mail} 
            label="Email Us" 
            onClick={() => window.location.href = 'mailto:info@duluthcivitanclub.org'} 
          />

          {/* Location button */}
          <ContactButton 
            icon={MapPin} 
            label="Visit Us" 
            onClick={() => window.open('https://www.google.com/maps/place/Downtown+Duluth,+Duluth,+GA/@34.0028474,-84.1484762,17z', '_blank')} 
          />
        </motion.div>

        <GetInvolvedSection 
          onDonateClick={handleDonateClick}
          onMembershipClick={handleMembershipClick}
          onVolunteerClick={handleVolunteerClick}
        />
      </div>

      {/* Modals */}
      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
      />
      <MembershipApplicationModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
      />
      <VolunteerModal
        open={volunteerModalOpen}
        onOpenChange={setVolunteerModalOpen}
      />
    </section>
  );
};

export default ContactSection;
