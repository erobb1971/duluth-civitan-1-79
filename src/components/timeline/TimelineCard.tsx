
import React from "react";
import { cn } from "@/lib/utils";
import TimelinePoint from "./TimelinePoint";

interface TimelineEvent {
  year: string | number;
  title: string;
  description: string;
}

interface TimelineCardProps {
  event: TimelineEvent;
  isActive: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, isActive }) => {
  return (
    <div className="relative h-full">
      {/* Timeline point component */}
      <TimelinePoint isActive={isActive} year={event.year} />
      
      {/* Year indicator with enhanced styling */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-8"></div> {/* Spacer for timeline points */}
        <span className={cn(
          "inline-block bg-civitan-blue dark:bg-civitan-gold text-white dark:text-civitan-blue px-4 py-1.5 rounded-full text-sm font-bold mb-3 shadow-md transition-transform duration-300",
          isActive ? "transform scale-110" : ""
        )}>
          {event.year}
        </span>
      </div>
      
      {/* Card content with enhanced styling */}
      <div className={cn(
        "bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md",
        "mb-6 flex flex-col transition-all duration-300",
        "min-h-[170px] border border-gray-100 dark:border-gray-700",
        isActive ? "transform -translate-y-2 shadow-lg border-civitan-gold dark:border-civitan-gold" : ""
      )}>
        <h3 className="text-2xl md:text-xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow">
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default TimelineCard;
