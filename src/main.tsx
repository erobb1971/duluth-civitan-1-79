
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initializeSecurity } from "./utils/security";

// Initialize security measures in browser context with comprehensive error handling
if (typeof window !== 'undefined') {
  try {
    // Initialize educational/supplementary security measures
    initializeSecurity();
  } catch (error) {
    console.error("Error in main.tsx security initialization:", error);
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
