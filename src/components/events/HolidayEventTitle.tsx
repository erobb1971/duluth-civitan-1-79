
import React from "react";
import { Flag } from "lucide-react";
import { Event } from "@/utils/events";

interface HolidayEventTitleProps {
  event: Event;
}

const HolidayEventTitle = ({ event }: HolidayEventTitleProps) => {
  if (event.isHoliday) {
    return (
      <div className="flex items-center gap-2">
        <Flag className="h-4 w-4 text-red-500" />
        <span>{event.title}</span>
      </div>
    );
  }
  
  return <span>{event.title}</span>;
};

export default HolidayEventTitle;
