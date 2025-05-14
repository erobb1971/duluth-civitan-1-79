
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Event, EventType, getEventDots, eventsData } from "@/utils/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDot = ({ type }: { type: EventType }) => {
  const dotColors: Record<EventType, string> = {
    civitan: "bg-civitan-blue",
    national: "bg-red-500",
    international: "bg-yellow-500",
  };

  return (
    <div className={`h-1.5 w-1.5 rounded-full ${dotColors[type]} mx-0.5`} />
  );
};

const CalendarModal = ({ open, onOpenChange }: CalendarModalProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEmailClick = (subject: string) => {
    window.location.href = `mailto:info@duluthcivitanclub.org?subject=${subject}&body=Thank you for your interest in this event. Please provide your contact information and we will get back to you shortly.`;
    
    toast({
      title: "Thank you!",
      description: "Your interest has been submitted. We'll be in touch soon.",
    });
  };

  // Function to handle clicking on a date with events
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedEvent(null); // Reset selected event when date changes
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
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-civitan-blue text-xl font-bold">
            Events Calendar
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            View our upcoming events
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-2">
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
          
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-civitan-blue mr-1.5"></div>
              <span className="text-xs">Civitan Club</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1.5"></div>
              <span className="text-xs">National Holidays</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1.5"></div>
              <span className="text-xs">Civitan Int'l</span>
            </div>
          </div>
          
          {selectedDateEvents.length > 0 ? (
            <div className="w-full mt-4 max-h-64 overflow-y-auto">
              <h3 className="text-lg font-semibold text-center mb-2">
                {date && format(date, "MMMM d, yyyy")} Events
              </h3>
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <Card key={event.id} className="w-full shadow-sm">
                    <CardHeader className="p-3 pb-1.5">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      {event.location && (
                        <p className="text-xs text-gray-600">{event.location}</p>
                      )}
                      {event.time && (
                        <p className="text-xs text-gray-600">{event.time}</p>
                      )}
                    </CardHeader>
                    {event.description && (
                      <CardContent className="p-3 py-1">
                        <p className="text-xs">{event.description}</p>
                      </CardContent>
                    )}
                    {event.buttonText && (
                      <CardFooter className="p-3 pt-1.5">
                        <Button 
                          className="w-full bg-civitan-blue hover:bg-blue-900 text-white text-xs py-2"
                          onClick={() => event.emailSubject && handleEmailClick(event.emailSubject)}
                        >
                          <Mail className="mr-1.5 h-3 w-3" />
                          {event.buttonText}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-600">
              {date ? "No events scheduled for this date" : "Select a date to see events"}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
