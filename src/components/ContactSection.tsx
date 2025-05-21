
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, PiggyBank, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import DonationModal from "./DonationModal";
import MembershipApplicationModal from "./MembershipApplicationModal";

const ContactSection = () => {
  const isMobile = useIsMobile();
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);

  // Don't render the section on mobile devices
  if (isMobile) return null;

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 },
  };

  return (
    <section id="contact" className="section relative overflow-hidden pt-16 pb-20">
      {/* Modern gradient background with blur effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-civitan-blue to-[#0a1428]"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
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
          <motion.div className="w-full md:w-1/3" variants={itemVariants}>
            <motion.div
              className="group"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-2xl transition-all duration-300"
                onClick={() => window.location.href = 'tel:678-242-0445'}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-civitan-gold p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-civitan-blue" />
                  </div>
                  <span className="text-lg font-medium">Call Us</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Email button */}
          <motion.div className="w-full md:w-1/3" variants={itemVariants}>
            <motion.div
              className="group"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-2xl transition-all duration-300"
                onClick={() => window.location.href = 'mailto:info@duluthcivitanclub.org'}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-civitan-gold p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-civitan-blue" />
                  </div>
                  <span className="text-lg font-medium">Email Us</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Location button */}
          <motion.div className="w-full md:w-1/3" variants={itemVariants}>
            <motion.div
              className="group"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button 
                variant="outline" 
                className="w-full py-8 h-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-2xl transition-all duration-300"
                onClick={() => window.open('https://www.google.com/maps/place/Downtown+Duluth,+Duluth,+GA/@34.0028474,-84.1484762,17z', '_blank')}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-civitan-gold p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-civitan-blue" />
                  </div>
                  <span className="text-lg font-medium">Visit Us</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Get Involved Buttons */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Get Involved</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-semibold py-6 h-auto text-lg rounded-xl shadow-lg"
                onClick={handleDonateClick}
              >
                <PiggyBank className="mr-2 h-5 w-5" />
                Donate
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <Button 
                className="w-full bg-white text-civitan-blue hover:bg-gray-100 font-semibold py-6 h-auto text-lg rounded-xl shadow-lg"
                onClick={handleMembershipClick}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Become a Member
              </Button>
            </motion.div>
          </div>
        </motion.div>
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
    </section>
  );
};

export default ContactSection;
