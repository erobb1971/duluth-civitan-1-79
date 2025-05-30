
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
import { useAccessibility } from "./AccessibilityProvider";

const DesktopNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { announceToScreenReader } = useAccessibility();

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

  // Fixed scroll function with correct 128px offset to match scroll-mt-32 class
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, sectionName: string) => {
    e.preventDefault();
    
    // Wait a tiny bit for any pending DOM updates
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = 128; // Fixed to match scroll-mt-32 (128px)
        
        window.scrollTo({
          top: rect.top + scrollTop - headerHeight,
          behavior: "smooth",
        });
        
        // Announce navigation for screen readers
        announceToScreenReader(`Navigated to ${sectionName} section`);
        
        // Set focus to the section for keyboard users
        section.setAttribute('tabindex', '-1');
        section.focus();
      } else {
        console.log(`Section with ID "${sectionId}" not found`);
      }
    }, 10);
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
    <header 
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white border-b border-gray-200"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2 rounded-md"
              aria-label="Duluth Civitan Club - Go to homepage"
              onClick={(e) => handleNavClick(e, "home", "homepage")}
            >
              <CivitanLogo size="md" className="p-2" />
            </a>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="gap-1" role="menubar">
              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#home"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "home", "home")}
                  role="menuitem"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#about"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "about", "about us")}
                  role="menuitem"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#membership"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "membership", "membership")}
                  role="menuitem"
                >
                  Membership
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#partners"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "partners", "partners")}
                  role="menuitem"
                >
                  Partners
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#gallery"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "gallery", "gallery")}
                  role="menuitem"
                >
                  Gallery
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#events"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "events", "events")}
                  role="menuitem"
                >
                  Events
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem role="none">
                <NavigationMenuLink 
                  href="/#contact"
                  className={cn(navigationMenuTriggerStyle(), "focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2")}
                  onClick={(e) => handleNavClick(e, "contact", "contact")}
                  role="menuitem"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <div className="flex items-center space-x-2 mr-2" role="group" aria-label="Social media links">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://www.facebook.com/DuluthCivitan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 focus:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-md p-1"
                      aria-label="Follow Duluth Civitan on Facebook (opens in new tab)"
                    >
                      <Facebook size={20} aria-hidden="true" />
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
                      className="text-gray-600 hover:text-pink-600 focus:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 rounded-md p-1"
                      aria-label="Follow Duluth Civitan on Instagram (opens in new tab)"
                    >
                      <Instagram size={20} aria-hidden="true" />
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
                      className="text-gray-600 hover:text-black focus:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 rounded-md p-1"
                      aria-label="Follow Duluth Civitan on Threads (opens in new tab)"
                    >
                      <svg 
                        width="20" 
                        height="20" 
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

            <Button 
              variant="outline"
              onClick={handleVolunteerClick}
              className="bg-white border-civitan-blue text-civitan-blue hover:bg-civitan-blue hover:text-white focus:bg-civitan-blue focus:text-white font-bold focus:outline-none focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2"
              aria-label="Open volunteer information and sign-up"
            >
              <HandHelping className="h-4 w-4 mr-2" aria-hidden="true" />
              Volunteer
            </Button>

            <Button 
              variant="default"
              onClick={handleDonateClick}
              className="bg-civitan-gold hover:bg-yellow-500 focus:bg-yellow-500 text-civitan-blue font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              aria-label="Open donation form and information"
            >
              <PiggyBank className="h-4 w-4 mr-2" aria-hidden="true" />
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
