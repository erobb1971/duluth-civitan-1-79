
import React, { useState } from "react";
import { ArrowUp, CalendarDays, Mail, PiggyBank, HandHelping, Home, Users } from "lucide-react";
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

  const handleScrollToSection = (sectionId: string, sectionName: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const mobileNavHeight = 80; // Account for mobile nav height
      
      window.scrollTo({
        top: rect.top + scrollTop - mobileNavHeight,
        behavior: "smooth",
      });
      
      announceToScreenReader(`Navigated to ${sectionName} section`);
    }
  };

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
    handleScrollToSection("events", "events");
  };

  const handleAboutClick = () => {
    handleScrollToSection("about", "about us");
  };

  const navItems: NavItem[] = [
    { 
      title: "Home", 
      href: "#", 
      icon: <Home className="w-4 h-4" aria-hidden="true" />,
      action: handleScrollToTop,
      ariaLabel: "Scroll to top of page"
    },
    { 
      title: "About", 
      href: "#", 
      icon: <Users className="w-4 h-4" aria-hidden="true" />,
      action: handleAboutClick,
      ariaLabel: "Go to about section"
    },
    { 
      title: "Events", 
      href: "#", 
      icon: <CalendarDays className="w-4 h-4" aria-hidden="true" />,
      action: handleEventsClick,
      ariaLabel: "Go to events section"
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
