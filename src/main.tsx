
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeSecurity } from "./utils/security";

// Only initialize security in browser context with robust error handling
if (typeof window !== 'undefined') {
  try {
    // Security initialization temporarily disabled
    // initializeSecurity();
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
