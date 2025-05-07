
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CivitanLogo from "./CivitanLogo";
import ModeToggle from "./ModeToggle";
import MembershipApplicationModal from "./MembershipApplicationModal";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "About", href: "#about" },
  { title: "Timeline", href: "#timeline" },
  { title: "Events", href: "#events" },
  { title: "Contact", href: "#contact" },
];

const DesktopNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:flex items-center justify-between w-full px-6 py-4 bg-white border-b border-civitan-gray">
        <div className="flex items-center gap-2">
          <CivitanLogo size="sm" />
          <span className="text-xl font-bold text-civitan-blue">
            Duluth Civitan
          </span>
        </div>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-civitan-blue hover:text-civitan-gold transition-colors duration-300"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Mode toggle hidden */}
          <Button onClick={() => console.log("Login clicked")} variant="outline">
            Member Login
          </Button>
          <Button 
            onClick={() => setMembershipModalOpen(true)}
            className="bg-civitan-gold text-civitan-blue hover:bg-yellow-500"
          >
            Become a Member
          </Button>
        </div>
      </div>

      <MembershipApplicationModal 
        open={membershipModalOpen} 
        onOpenChange={setMembershipModalOpen}
      />
    </>
  );
};

export default DesktopNavigation;
