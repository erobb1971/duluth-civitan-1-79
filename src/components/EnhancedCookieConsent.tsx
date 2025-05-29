
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Cookie, Settings, Shield, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const EnhancedCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already provided consent
    const hasConsented = localStorage.getItem("cookie-consent-given");
    if (!hasConsented) {
      // Small delay to prevent immediate popup
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem("cookie-preferences");
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent-given", "true");
    localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setPreferences(prefs);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    savePreferences(necessaryOnly);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Cookie banner
  if (showBanner && !showPreferences) {
    return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-civitan-gold mt-1 flex-shrink-0" aria-hidden="true" />
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We use cookies and similar technologies to provide the best experience on our website. 
                  Some are necessary for basic functionality, while others help us improve and personalize your experience.
                </p>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-sm text-civitan-blue hover:underline focus:outline-none focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2 rounded"
                  aria-label="View cookie preferences and details"
                >
                  View preferences and learn more
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={acceptNecessaryOnly}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
                aria-label="Accept only necessary cookies"
              >
                Necessary Only
              </Button>
              <Button
                onClick={acceptAll}
                className="bg-civitan-blue hover:bg-blue-700 text-white"
                aria-label="Accept all cookies"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preferences modal
  return (
    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
      >
        <DialogHeader>
          <DialogTitle id="cookie-preferences-title" className="flex items-center gap-2">
            <Settings className="h-5 w-5" aria-hidden="true" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription id="cookie-preferences-description">
            Manage your cookie preferences. You can enable or disable different categories of cookies below.
            Note that disabling some cookies may impact your experience on our website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Necessary Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
                <Label htmlFor="necessary-cookies" className="font-medium">
                  Necessary Cookies
                </Label>
              </div>
              <Switch
                id="necessary-cookies"
                checked={preferences.necessary}
                disabled={true}
                aria-describedby="necessary-cookies-description"
              />
            </div>
            <p id="necessary-cookies-description" className="text-sm text-gray-600 dark:text-gray-300">
              These cookies are essential for the website to function properly. They enable basic features 
              like page navigation and access to secure areas. The website cannot function properly without these cookies.
            </p>
          </div>

          <Separator />

          {/* Analytics Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <Label htmlFor="analytics-cookies" className="font-medium">
                  Analytics Cookies
                </Label>
              </div>
              <Switch
                id="analytics-cookies"
                checked={preferences.analytics}
                onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                aria-describedby="analytics-cookies-description"
              />
            </div>
            <p id="analytics-cookies-description" className="text-sm text-gray-600 dark:text-gray-300">
              These cookies help us understand how visitors interact with our website by collecting and 
              reporting information anonymously. This helps us improve our website and services.
            </p>
          </div>

          <Separator />

          {/* Marketing Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" aria-hidden="true" />
                <Label htmlFor="marketing-cookies" className="font-medium">
                  Marketing Cookies
                </Label>
              </div>
              <Switch
                id="marketing-cookies"
                checked={preferences.marketing}
                onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                aria-describedby="marketing-cookies-description"
              />
            </div>
            <p id="marketing-cookies-description" className="text-sm text-gray-600 dark:text-gray-300">
              These cookies are used to deliver personalized advertisements and track the effectiveness 
              of our marketing campaigns. They may be used by third-party advertising networks.
            </p>
          </div>

          <Separator />

          {/* Preference Cookies */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" aria-hidden="true" />
                <Label htmlFor="preference-cookies" className="font-medium">
                  Preference Cookies
                </Label>
              </div>
              <Switch
                id="preference-cookies"
                checked={preferences.preferences}
                onCheckedChange={(checked) => handlePreferenceChange('preferences', checked)}
                aria-describedby="preference-cookies-description"
              />
            </div>
            <p id="preference-cookies-description" className="text-sm text-gray-600 dark:text-gray-300">
              These cookies remember your preferences and settings to provide a more personalized experience, 
              such as language preferences and display settings.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="outline"
            onClick={acceptNecessaryOnly}
            className="flex-1"
          >
            Necessary Only
          </Button>
          <Button
            onClick={saveCustomPreferences}
            className="flex-1 bg-civitan-blue hover:bg-blue-700"
          >
            Save Preferences
          </Button>
          <Button
            onClick={acceptAll}
            className="flex-1 bg-civitan-gold hover:bg-yellow-500 text-civitan-blue"
          >
            Accept All
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can change your preferences at any time by accessing the cookie settings. 
            For more information, please review our{" "}
            <button 
              onClick={() => {/* Handle privacy policy */}}
              className="text-civitan-blue hover:underline focus:outline-none focus:ring-2 focus:ring-civitan-blue focus:ring-offset-2 rounded"
            >
              Privacy Policy
            </button>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedCookieConsent;
