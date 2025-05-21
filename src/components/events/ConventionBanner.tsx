
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const ConventionBanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-civitan-gold shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      {/* Banner Image with Overlay */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
        <img 
          src="/lovable-uploads/e84ef3b8-9da7-487c-96ce-d888f8209ae8.png" 
          alt="ATLCIVITAN2025"
          className={cn(
            "w-full h-auto object-contain bg-civitan-blue",
            isMobile ? "px-2 py-2" : "py-4"
          )}
          loading="lazy"
        />
        
        {/* Event Badge - Only show on desktop */}
        {!isMobile && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-civitan-blue/90 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1.5">
              <BadgeCheck size={14} />
              <span>REGISTRATION OPEN</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Registration Button - Positioned at bottom */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full z-30",
        "bg-gradient-to-t from-black/90 to-black/50",
        isMobile ? "p-2" : "p-3"
      )}>
        <Button 
          className={cn(
            "w-full bg-civitan-gold hover:bg-civitan-gold/90 text-civitan-blue font-bold",
            isMobile ? "text-xs py-1.5" : "text-base py-3",
            "border-2 border-white/30",
            "shadow-[0_0_15px_rgba(255,199,44,0.6)]",
            "transform transition-all duration-300 hover:scale-105"
          )}
          onClick={() => window.open('https://civitan.org/convention/', '_blank')}
        >
          REGISTER TODAY!
        </Button>
      </div>
    </div>
  );
};

export default ConventionBanner;
