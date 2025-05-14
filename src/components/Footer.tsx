
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, PiggyBank } from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import DonationModal from "./DonationModal";
import BackToTop from "./BackToTop";

const Footer = () => {
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <footer className="bg-civitan-blue text-white py-2.5 relative">
      <div className="container mx-auto px-4">
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
