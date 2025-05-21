
import React from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import EventCard from "./EventCard";
import { Event } from "@/utils/events";
import { useIsMobile } from "@/hooks/use-mobile";

interface DateEventsViewProps {
  date: Date | undefined;
  events: Event[];
}

const DateEventsView = ({ date, events }: DateEventsViewProps) => {
  const isMobile = useIsMobile();
  const hasEvents = events.length > 0;

  if (!hasEvents) {
    return (
      <p className="mt-4 text-center text-gray-600">
        {date ? "No events scheduled for this date" : "Select a date to see events"}
      </p>
    );
  }

  return (
    <div className="w-full mt-4 relative">
      <h3 className="text-lg font-semibold text-center mb-2">
        {date && format(date, "MMMM d, yyyy")} Events
      </h3>
      
      <ScrollArea className="max-h-[calc(50vh)] sm:max-h-[350px] pr-2 rounded-lg mb-1 relative">
        <div className="space-y-3 pb-1">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </ScrollArea>
      
      {/* Scroll indicator for mobile */}
      {isMobile && events.length > 1 && (
        <div className="flex justify-center mt-2 text-gray-400 animate-pulse">
          <ChevronDown className="h-5 w-5" />
          <span className="text-xs ml-1">Scroll for more events</span>
        </div>
      )}
    </div>
  );
};

export default DateEventsView;
