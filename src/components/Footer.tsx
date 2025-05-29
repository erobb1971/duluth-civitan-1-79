
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, PiggyBank, Facebook, Instagram, HandHelping } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";
import BackToTop from "./BackToTop";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAccessibility } from "./AccessibilityProvider";

const Footer = () => {
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const handlePrivacyPolicyClick = () => {
    setPrivacyPolicyModalOpen(true);
    announceToScreenReader("Opening privacy policy modal");
  };

  const handleDonateClick = () => {
    setDonationModalOpen(true);
    announceToScreenReader("Opening donation modal");
  };

  const handleVolunteerClick = () => {
    setVolunteerModalOpen(true);
    announceToScreenReader("Opening volunteer modal");
  };

  return (
    <footer className="relative py-2.5 overflow-hidden" role="contentinfo">
      {/* Modern gradient background with blur effect to match ContactSection */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-civitan-blue to-[#0a1428]"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center mb-4 pt-3">
          <TooltipProvider>
            <div className="flex items-center space-x-4" role="group" aria-label="Social media links">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://www.facebook.com/DuluthCivitan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue rounded-md p-1"
                    aria-label="Follow Duluth Civitan on Facebook (opens in new tab)"
                  >
                    <Facebook size={22} aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Facebook</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://www.instagram.com/duluth.civitan.club/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue rounded-md p-1"
                    aria-label="Follow Duluth Civitan on Instagram (opens in new tab)"
                  >
                    <Instagram size={22} aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Instagram</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://www.threads.com/@duluth.civitan.club" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue rounded-md p-1"
                    aria-label="Follow Duluth Civitan on Threads (opens in new tab)"
                  >
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="threads-icon"
                      aria-hidden="true"
                    >
                      <path 
                        d="M12.7323 20.9999C14.9823 20.9999 16.7323 20.2499 17.9823 18.7499C19.2323 17.2499 19.9823 15.2499 19.9823 12.7499C19.9823 12.2499 19.9323 11.7499 19.8823 11.2499C19.6323 8.24988 18.4823 5.99988 16.4823 4.49988C15.2323 3.49988 13.7323 2.99988 11.9823 2.99988C10.2323 2.99988 8.73233 3.49988 7.48233 4.49988C5.48233 5.99988 4.33233 8.24988 4.08233 11.2499C4.03233 11.7499 3.98233 12.2499 3.98233 12.7499C3.98233 15.2499 4.73233 17.2499 5.98233 18.7499C7.23233 20.2499 8.98233 20.9999 11.2323 20.9999"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M12 20.9999V14.9999"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M16 15C14 16 10 16 8 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z"
                        fill="currentColor"
                      />
                      <path 
                        d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow us on Threads</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>

        <div className="border-t border-white/10 pt-2">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-300 text-center hidden md:block">&copy; 2025 Duluth Civitan. All rights reserved.</p>
            <div className="mt-1 md:mt-0 md:ml-6 flex justify-center items-center">
              <button 
                onClick={handlePrivacyPolicyClick}
                className="text-gray-300 hover:text-white focus:text-white mr-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue rounded-md px-2 py-1 hidden md:block"
                aria-label="View privacy policy"
              >
                Privacy Policy
              </button>
              
              <Button 
                variant="outline" 
                onClick={handleVolunteerClick}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:bg-white/20 font-bold mr-4 hidden md:flex focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-civitan-blue"
                size="sm"
                aria-label="Open volunteer information and sign-up"
              >
                <HandHelping className="h-4 w-4 mr-2" aria-hidden="true" />
                Volunteer
              </Button>
              
              <Button 
                variant="default" 
                onClick={handleDonateClick}
                className="bg-civitan-gold hover:bg-yellow-500 focus:bg-yellow-500 text-civitan-blue font-bold ml-4 hidden md:flex focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                size="sm"
                aria-label="Open donation form and information"
              >
                <PiggyBank className="h-4 w-4 mr-2" aria-hidden="true" />
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal
        open={privacyPolicyModalOpen}
        onOpenChange={setPrivacyPolicyModalOpen}
      />

      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
      />

      <VolunteerModal
        open={volunteerModalOpen}
        onOpenChange={setVolunteerModalOpen}
      />

      {/* Desktop-only Back to Top button */}
      <div className="hidden lg:block">
        <BackToTop />
      </div>
    </footer>
  );
};

export default Footer;
