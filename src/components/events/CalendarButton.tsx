
import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "../ui/tooltip";
import { getGoogleCalendarUrl, getICalUrl } from "@/utils/events";

interface CalendarButtonProps {
  event: any;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ event }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-civitan-blue text-civitan-blue dark:text-white dark:border-white group">
                <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-bounce" />
                <span className="sr-only">Add to Calendar</span>
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
          <div className="absolute -right-1 -top-1 w-2 h-2 bg-civitan-gold rounded-full animate-pulse"></div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to your calendar</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarButton;
