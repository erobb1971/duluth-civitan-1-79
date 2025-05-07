
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, CalendarDays, Mail, User, Menu } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "Home", href: "#home", icon: <Home className="w-5 h-5" /> },
  { title: "Events", href: "#events", icon: <CalendarDays className="w-5 h-5" /> },
  { title: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
  { title: "Login", href: "#", icon: <User className="w-5 h-5" /> },
  { title: "Menu", href: "#", icon: <Menu className="w-5 h-5" /> },
];

const MobileNavigation = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-civitan-blue border-t border-civitan-gray z-50">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-civitan-blue dark:text-white hover:text-civitan-gold transition-colors duration-300 py-1"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
