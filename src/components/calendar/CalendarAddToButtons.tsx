
import React from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Event, getGoogleCalendarUrl, getICalUrl } from "@/utils/events";

interface CalendarAddToButtonsProps {
  event: Event;
}

const CalendarAddToButtons = ({ event }: CalendarAddToButtonsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-civitan-blue text-civitan-blue dark:text-white dark:border-white">
          <CalendarIcon className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Add to Calendar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a 
            href={getGoogleCalendarUrl(event)} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cursor-pointer"
          >
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={getICalUrl(event)} 
            download={`civitan-event-${event.id}.ics`}
            className="cursor-pointer"
          >
            Apple/Outlook (.ics)
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarAddToButtons;
