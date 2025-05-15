
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies (using localStorage for persistence)
    const hasAccepted = localStorage.getItem("cookie-consent-accepted");
    if (!hasAccepted) {
      // Small delay to prevent immediate popup
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent-accepted", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-1 left-1 md:bottom-2 md:left-2 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 text-[10px] md:text-xs max-w-[200px] md:max-w-[240px]">
      <div className="flex items-start gap-1">
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300">
            We use cookies to enhance your experience.
          </p>
        </div>
        <button 
          onClick={acceptCookies} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={acceptCookies}
        className="h-5 px-2 text-[10px] md:text-xs mt-1 w-full"
      >
        Accept
      </Button>
    </div>
  );
};

export default CookieConsent;
