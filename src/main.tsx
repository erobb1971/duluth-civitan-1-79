
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
