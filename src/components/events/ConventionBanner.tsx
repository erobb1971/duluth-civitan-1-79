
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const ConventionBanner: React.FC = () => {
  return (
    <div className="relative group overflow-hidden rounded-lg border-2 border-civitan-gold shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      {/* Banner Image with Overlay */}
      <a 
        href="https://civitan.org/convention/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full h-full"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
          <img 
            src="/lovable-uploads/50742192-6c88-49ea-a0c3-f33fd52d643f.png"
            alt="ATLCIVITAN2025"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          
          {/* Event Badge */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-civitan-blue/90 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1.5 animate-pulse">
              <BadgeCheck size={14} />
              <span>REGISTRATION OPEN</span>
            </div>
          </div>
        </div>
      </a>
      
      {/* Registration Button - Positioned at bottom */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full p-3 z-30",
        "bg-gradient-to-t from-black/90 to-black/50"
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className={cn(
                  "w-full bg-civitan-gold hover:bg-civitan-gold/90 text-civitan-blue font-bold",
                  "text-sm sm:text-base border-2 border-white/30",
                  // Removed pulsing animation
                  "shadow-[0_0_15px_rgba(255,199,44,0.6)]",
                  "transform transition-all duration-300 hover:scale-105"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://civitan.org/convention/', '_blank');
                }}
              >
                REGISTER TODAY!
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-civitan-blue text-white border border-civitan-gold">
              <p>Secure your spot at ATLCIVITAN2025!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Removed the gold overlay hover effect */}
    </div>
  );
};

export default ConventionBanner;
