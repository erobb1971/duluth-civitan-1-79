
import React from "react";
import { cn } from "@/lib/utils";

interface TimelinePointProps {
  isActive: boolean;
  year: string | number;
}

const TimelinePoint: React.FC<TimelinePointProps> = ({ isActive, year }) => {
  return (
    <div className={cn(
      "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
      "w-5 h-5 rounded-full bg-civitan-gold border-2 border-white dark:border-gray-800 shadow-md transition-all duration-300",
      isActive ? "scale-150" : ""
    )}>
      {/* Enhanced pulsing effect */}
      <span className={cn(
        "absolute inset-0 rounded-full",
        "animate-pulse bg-civitan-gold/60"
      )}></span>
    </div>
  );
};

export default TimelinePoint;
