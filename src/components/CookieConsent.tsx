
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies in this session
    const hasAccepted = sessionStorage.getItem("cookie-consent-accepted");
    if (!hasAccepted) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    sessionStorage.setItem("cookie-consent-accepted", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-2 left-2 right-2 md:left-4 md:right-auto md:max-w-xs z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-xs">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300">
            We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={acceptCookies}
          className="h-6 px-2 text-xs"
        >
          Accept
        </Button>
        <button 
          onClick={acceptCookies} 
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
