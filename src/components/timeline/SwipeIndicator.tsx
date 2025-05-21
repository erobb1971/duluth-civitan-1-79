
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";

interface SwipeIndicatorProps {
  showCue: boolean;
  isMobile?: boolean;
}

const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ showCue, isMobile = false }) => {
  // For mobile, we have a different styling
  if (isMobile) {
    return (
      <div className="flex items-center justify-center mb-6 text-sm text-civitan-blue dark:text-civitan-gold gap-1 md:hidden transition-opacity duration-300 sticky z-10">
        <span className="font-medium">Swipe</span> 
        <ChevronsRight size={16} className="animate-pulse" /> 
        <span>to explore our history</span>
      </div>
    );
  }
  
  // For persistent indicator at the bottom of timeline
  return (
    <div className={cn(
      "absolute bottom-4 w-full flex justify-center",
      "md:transition-opacity md:duration-500",
      "md:" + (showCue ? "opacity-90" : "opacity-0 pointer-events-none")
    )}>
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        <span className="font-medium">Swipe</span>
        <ChevronsRight size={16} className="animate-pulse text-civitan-gold" />
        <span>for more history</span>
      </div>
    </div>
  );
};

export default SwipeIndicator;
