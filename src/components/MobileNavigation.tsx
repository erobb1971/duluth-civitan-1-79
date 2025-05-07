import React, { useState } from "react";
import { ArrowUp, CalendarDays, Mail, Mic, User } from "lucide-react";
import MemberLoginModal from "./MemberLoginModal";
import VoiceMessageModal from "./VoiceMessageModal";
import CalendarModal from "./CalendarModal";
import MembershipApplicationModal from "./MembershipApplicationModal";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  action?: () => void;
}

const MobileNavigation = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [voiceMessageModalOpen, setVoiceMessageModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleContactClick = () => {
    window.location.href = "mailto:info@duluthcivitanclub.org";
  };

  const navItems: NavItem[] = [
    { 
      title: "Top", 
      href: "#", 
      icon: <ArrowUp className="w-5 h-5" />,
      action: handleScrollToTop
    },
    { 
      title: "Events", 
      href: "#", 
      icon: <CalendarDays className="w-5 h-5" />,
      action: () => setCalendarModalOpen(true)
    },
    { 
      title: "Record", 
      href: "#", 
      icon: <Mic className="w-5 h-5" />,
      action: () => setVoiceMessageModalOpen(true)
    },
    { 
      title: "Contact", 
      href: "#", 
      icon: <Mail className="w-5 h-5" />,
      action: handleContactClick
    },
    { 
      title: "Login", 
      href: "#", 
      icon: <User className="w-5 h-5" />,
      action: () => setLoginModalOpen(true)
    },
  ];

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-civitan-gray z-50">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                item.action ? item.action() : window.location.href = item.href;
              }}
              className="flex flex-col items-center text-civitan-blue hover:text-civitan-gold transition-colors duration-300 py-1"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </button>
          ))}
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

      <VoiceMessageModal
        open={voiceMessageModalOpen}
        onOpenChange={setVoiceMessageModalOpen}
      />

      <CalendarModal
        open={calendarModalOpen}
        onOpenChange={setCalendarModalOpen}
      />
    </>
  );
};

export default MobileNavigation;
