import React, { useState, useEffect } from "react";
import CivitanLogo from "./CivitanLogo";
import { Button } from "@/components/ui/button";
import MembershipApplicationModal from "./MembershipApplicationModal";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { PiggyBank, Facebook, Instagram, HandHelping } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DesktopNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect scrolling for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Improved scroll function with better handling of section targeting
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Wait a tiny bit for any pending DOM updates
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = 80; // Adjust for header height
        
        window.scrollTo({
          top: rect.top + scrollTop - headerHeight,
          behavior: "smooth",
        });
      } else {
        console.log(`Section with ID "${sectionId}" not found`);
      }
    }, 10);
  };

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  const handleVolunteerClick = () => {
    setVolunteerModalOpen(true);
  };

  return (
    <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white border-b border-gray-200"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <CivitanLogo size="md" className="p-2" />
            </a>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#home"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "home")}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#about"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#membership"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "membership")}
                >
                  Membership
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#partners"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "partners")}
                >
                  Partners
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#gallery"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "gallery")}
                >
                  Gallery
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#events"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "events")}
                >
                  Events
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#contact"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <div className="flex items-center space-x-2 mr-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://www.facebook.com/DuluthCivitan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Facebook size={20} />
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
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <Instagram size={20} />
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
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {/* Custom Threads icon */}
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="threads-icon"
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

            <Button 
              variant="outline"
              onClick={handleVolunteerClick}
              className="bg-white border-civitan-blue text-civitan-blue hover:bg-civitan-blue hover:text-white font-bold"
            >
              <HandHelping className="h-4 w-4 mr-2" />
              Volunteer
            </Button>

            <Button 
              variant="default"
              onClick={handleDonateClick}
              className="bg-civitan-gold hover:bg-yellow-500 text-civitan-blue font-bold"
            >
              <PiggyBank className="h-4 w-4 mr-2" />
              Donate
            </Button>
          </div>
        </div>
      </div>

      <MembershipApplicationModal 
        open={membershipModalOpen} 
        onOpenChange={setMembershipModalOpen} 
      />
      
      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
      />

      <VolunteerModal
        open={volunteerModalOpen}
        onOpenChange={setVolunteerModalOpen}
      />
    </header>
  );
};

export default DesktopNavigation;
