
import React, { useState } from "react";
import CivitanLogo from "./CivitanLogo";
import { Button } from "@/components/ui/button";
import MembershipApplicationModal from "./MembershipApplicationModal";
import DonationModal from "./DonationModal";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { PiggyBank, Facebook, Instagram } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DesktopNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 64, // Adjust for header height
        behavior: "smooth",
      });
    }
  };

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  return (
    <header className="hidden lg:block sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <CivitanLogo size="md" className="p-1" />
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
                  href="/#events"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "events")}
                >
                  Events
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
                  href="/#contact"
                  className={navigationMenuTriggerStyle()}
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger onClick={() => setMembershipModalOpen(true)}>
                  Join Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-civitan-blue to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setMembershipModalOpen(true);
                          }}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Duluth Civitan Club Membership
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Join a service club dedicated to helping people in our local community.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
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
    </header>
  );
};

export default DesktopNavigation;
