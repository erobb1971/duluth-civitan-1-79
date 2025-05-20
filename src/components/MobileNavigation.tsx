
import React, { useState } from "react";
import { ArrowUp, CalendarDays, Mail, PiggyBank } from "lucide-react";
import CalendarModal from "./CalendarModal";
import DonationModal from "./DonationModal";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  action?: () => void;
}

const MobileNavigation = () => {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleContactClick = () => {
    window.location.href = "mailto:info@duluthcivitanclub.org";
  };
  
  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  const navItems: NavItem[] = [
    { 
      title: "Top", 
      href: "#", 
      icon: <ArrowUp className="w-4 h-4" />,
      action: handleScrollToTop
    },
    { 
      title: "Events", 
      href: "#", 
      icon: <CalendarDays className="w-4 h-4" />,
      action: () => setCalendarModalOpen(true)
    },
    { 
      title: "Donate", 
      href: "#", 
      icon: <PiggyBank className="w-4 h-4" />,
      action: handleDonateClick
    },
    { 
      title: "Contact", 
      href: "#", 
      icon: <Mail className="w-4 h-4" />,
      action: handleContactClick
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-civitan-gray dark:border-gray-700 z-50">
        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                item.action ? item.action() : window.location.href = item.href;
              }}
              className="flex flex-col items-center text-civitan-blue hover:text-civitan-gold transition-colors duration-300 px-2 py-1 mobile-touch-target"
              aria-label={item.title}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      <CalendarModal
        open={calendarModalOpen}
        onOpenChange={setCalendarModalOpen}
      />

      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
      />
    </>
  );
};

export default MobileNavigation;
