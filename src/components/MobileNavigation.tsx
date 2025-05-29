
import React, { useState } from "react";
import { ArrowUp, CalendarDays, Mail, PiggyBank, HandHelping } from "lucide-react";
import { CalendarModal } from "./calendar";
import DonationModal from "./DonationModal";
import VolunteerModal from "./VolunteerModal";
import { useAccessibility } from "./AccessibilityProvider";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  action?: () => void;
  ariaLabel: string;
}

const MobileNavigation = () => {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    announceToScreenReader("Scrolled to top of page");
  };

  const handleContactClick = () => {
    window.location.href = "mailto:info@duluthcivitanclub.org";
    announceToScreenReader("Opening email client");
  };
  
  const handleDonateClick = () => {
    setDonationModalOpen(true);
    announceToScreenReader("Opening donation modal");
  };

  const handleVolunteerClick = () => {
    setVolunteerModalOpen(true);
    announceToScreenReader("Opening volunteer modal");
  };

  const handleEventsClick = () => {
    setCalendarModalOpen(true);
    announceToScreenReader("Opening events calendar");
  };

  const navItems: NavItem[] = [
    { 
      title: "Top", 
      href: "#", 
      icon: <ArrowUp className="w-4 h-4" aria-hidden="true" />,
      action: handleScrollToTop,
      ariaLabel: "Scroll to top of page"
    },
    { 
      title: "Events", 
      href: "#", 
      icon: <CalendarDays className="w-4 h-4" aria-hidden="true" />,
      action: handleEventsClick,
      ariaLabel: "Open events calendar"
    },
    { 
      title: "Volunteer", 
      href: "#", 
      icon: <HandHelping className="w-4 h-4" aria-hidden="true" />,
      action: handleVolunteerClick,
      ariaLabel: "Open volunteer information modal"
    },
    { 
      title: "Donate", 
      href: "#", 
      icon: <PiggyBank className="w-4 h-4" aria-hidden="true" />,
      action: handleDonateClick,
      ariaLabel: "Open donation modal"
    },
    { 
      title: "Contact", 
      href: "#", 
      icon: <Mail className="w-4 h-4" aria-hidden="true" />,
      action: handleContactClick,
      ariaLabel: "Open email to contact us"
    },
  ];

  return (
    <>
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-civitan-gray dark:border-gray-700 z-50"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-1 py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                item.action ? item.action() : window.location.href = item.href;
              }}
              className="flex flex-col items-center text-civitan-blue hover:text-civitan-gold focus:text-civitan-gold transition-colors duration-300 px-2 py-1 mobile-touch-target focus:outline-none focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2 rounded-md"
              aria-label={item.ariaLabel}
              type="button"
            >
              {item.icon}
              <span className="text-xs mt-1" aria-hidden="true">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>

      <CalendarModal
        open={calendarModalOpen}
        onOpenChange={setCalendarModalOpen}
      />

      <DonationModal
        open={donationModalOpen}
        onOpenChange={setDonationModalOpen}
      />

      <VolunteerModal
        open={volunteerModalOpen}
        onOpenChange={setVolunteerModalOpen}
      />
    </>
  );
};

export default MobileNavigation;
