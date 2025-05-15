
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeSecurity } from "./utils/security";

// Only initialize security in browser context with robust error handling
if (typeof window !== 'undefined') {
  try {
    // Add URL parameter to hide Lovable branding
    const url = new URL(window.location.href);
    if (!url.searchParams.has('forceHideBadge')) {
      url.searchParams.set('forceHideBadge', 'true');
      // Use history API to avoid reload
      window.history.replaceState({}, document.title, url.toString());
    }
    
    // Enhanced badge removal function
    const removeLovableBadge = () => {
      const selectors = [
        '[data-lovable-brand]',
        '[data-lovable-badge]',
        '.lovable-badge',
        '.lovable-branding',
        '#lovable-badge',
        '.lovable-editor-badge',
        '[class*="lovable-badge"]',
        '[id*="lovable-badge"]',
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.remove();
        });
      });
    };
    
    // Remove badge on load and periodically check
    removeLovableBadge();
    setTimeout(removeLovableBadge, 500);
    setInterval(removeLovableBadge, 2000);
    
    // Initialize minimal security features
    initializeSecurity();
  } catch (error) {
    console.error("Error in main.tsx initialization:", error);
  }
}

createRoot(document.getElementById("root")!).render(
  <>
    <TooltipProvider>
      <App />
      <Toaster />
    </TooltipProvider>
  </>
);
