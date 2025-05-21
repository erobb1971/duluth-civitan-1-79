
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollInstructionsProps {
  showCue: boolean;
}

const ScrollInstructions: React.FC<ScrollInstructionsProps> = ({ showCue }) => {
  return (
    <div className={cn(
      "hidden md:flex items-center justify-center mb-6 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
      "transition-opacity duration-300",
      showCue ? "opacity-100" : "opacity-0"
    )}>
      <ChevronLeft size={16} /> 
      <span>Scroll or use arrows</span> 
      <ChevronRight size={16} />
      <span>to explore our history</span>
    </div>
  );
};

export default ScrollInstructions;
