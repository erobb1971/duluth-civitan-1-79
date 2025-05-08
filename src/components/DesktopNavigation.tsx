
import React, { useState } from "react";
import CivitanLogo from "./CivitanLogo";
import { Button } from "@/components/ui/button";
import MembershipApplicationModal from "./MembershipApplicationModal";
import MemberLoginModal from "./MemberLoginModal";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

const DesktopNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <header className="hidden lg:block sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <CivitanLogo size="sm" className="p-1" />
            </a>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#home"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#about"
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#events"
                  className={navigationMenuTriggerStyle()}
                >
                  Events
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="/#contact"
                  className={navigationMenuTriggerStyle()}
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
            <Button 
              variant="outline" 
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>

      <MembershipApplicationModal 
        open={membershipModalOpen} 
        onOpenChange={setMembershipModalOpen} 
      />
      
      <MemberLoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
      />
    </header>
  );
};

export default DesktopNavigation;
