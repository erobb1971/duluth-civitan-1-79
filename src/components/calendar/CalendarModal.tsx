
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getEventDots, eventsData } from "@/utils/events";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import EventDot from "./EventDot";
import CalendarLegend from "./CalendarLegend";
import MeetingScheduleInfo from "./MeetingScheduleInfo";
import DateEventsView from "./DateEventsView";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CalendarModal = ({ open, onOpenChange }: CalendarModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();

  // Function to handle clicking on a date with events
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  // Get events for the selected date
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    return eventsData.filter(event => {
      // For multi-day events
      if (event.endDate) {
        const eventStartDate = event.startDate;
        const eventEndDate = event.endDate;
        return formattedDate >= eventStartDate && formattedDate <= eventEndDate;
      }
      // For single day events
      return event.startDate === formattedDate;
    });
  };

  const selectedDateEvents = date ? getEventsForDate(date) : [];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-civitan-blue text-xl font-bold">
            Events Calendar
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            View our upcoming events
          </DialogDescription>
        </DialogHeader>
        
        {/* Bottom Close Button for Mobile Only */}
        {isMobile && (
          <div className="flex justify-center mb-2 sm:hidden">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="w-full border-civitan-blue text-civitan-blue"
              >
                <X className="mr-1.5 h-4 w-4" />
                Close Calendar
              </Button>
            </DialogClose>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border pointer-events-auto"
            modifiersStyles={{
              selected: {
                backgroundColor: "#0f4c81",
                color: "white",
              }
            }}
            components={{
              DayContent: (props) => {
                const eventDots = getEventDots(props.date);
                return (
                  <div className="flex flex-col items-center">
                    <div>{props.date.getDate()}</div>
                    {eventDots.length > 0 && (
                      <div className="flex mt-0.5">
                        {eventDots.slice(0, 3).map((dot, i) => (
                          <EventDot key={i} type={dot.type} />
                        ))}
                        {eventDots.length > 3 && <div className="text-[8px] ml-0.5">+{eventDots.length - 3}</div>}
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
          
          <CalendarLegend />
          <MeetingScheduleInfo />
          <DateEventsView date={date} events={selectedDateEvents} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
