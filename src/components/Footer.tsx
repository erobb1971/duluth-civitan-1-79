
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, PiggyBank, Facebook, Instagram } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import DonationModal from "./DonationModal";
import BackToTop from "./BackToTop";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <footer className="bg-civitan-blue text-white py-2.5 relative">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center mb-4 pt-3">
          <TooltipProvider>
            <div className="flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://www.facebook.com/DuluthCivitan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook size={22} />
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
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram size={22} />
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
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Follow us on Threads"
                  >
                    {/* Custom Threads icon */}
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="threads-icon"
                      aria-label="Threads"
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

        <div className="border-t border-gray-800 pt-2">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-center">&copy; 2025 Duluth Civitan. All rights reserved.</p>
            <div className="mt-1 md:mt-0 md:ml-6 flex justify-center items-center">
              <button 
                onClick={() => setPrivacyPolicyModalOpen(true)}
                className="text-gray-400 hover:text-white mr-4 focus:outline-none"
              >
                Privacy Policy
              </button>
              
              <Button 
                variant="default" 
                onClick={() => setDonationModalOpen(true)}
                className="bg-civitan-gold hover:bg-yellow-500 text-civitan-blue font-bold ml-4 hidden md:flex"
                size="sm"
              >
                <PiggyBank className="h-4 w-4 mr-2" />
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

      {/* Desktop-only Back to Top button */}
      <div className="hidden lg:block">
        <BackToTop />
      </div>
    </footer>
  );
};

export default Footer;
