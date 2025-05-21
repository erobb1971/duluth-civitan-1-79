
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
import { Event, EventType, getEventDots, eventsData, getGoogleCalendarUrl, getICalUrl } from "@/utils/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar as CalendarIcon, Map, Mail, Info, X, ExternalLink, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
  const isMobile = useIsMobile();

  const handleEmailClick = (event: Event) => {
    // If there's an external URL, open it
    if (event.externalUrl) {
      window.open(event.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Special email handling for Spectrum Garden Tour
    if (event.id === "spectrum-garden-tour-2025") {
      window.location.href = `mailto:claire@spectrumautism.org?subject=${event.emailSubject || "RSVP for Garden Tour"}&body=I would like to RSVP for the Spectrum Sensory & Harvest Gardens Tour on June 5, 2025. Please provide any additional information needed.`;
      toast({
        title: "Thank you!",
        description: "Your RSVP has been sent to claire@spectrumautism.org.",
      });
      return;
    }
    
    // If noEmail is true, just show toast without triggering email
    if (event.noEmail) {
      toast({
        title: "Thank you!",
        description: event.rsvpMessage || "Your RSVP has been received.",
      });
      return;
    }
    
    // Otherwise proceed with email
    window.location.href = `mailto:info@duluthcivitanclub.org?subject=${event.emailSubject || "Event Inquiry"}&body=Thank you for your interest in this event. Please provide your contact information and we will get back to you shortly.`;
    
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
  const hasEvents = selectedDateEvents.length > 0;
  
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
          
          <div className="w-full mt-4 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
            <div className="font-medium mb-1">🗓️ Regular Meeting Schedule:</div>
            <p>2nd Monday: 11:45 AM at Chamber's 1818 Club</p>
            <p>4th Monday: 12:00 PM at rotating locations</p>
            <div className="text-xs text-gray-500 mt-1 italic">Note: No meetings on holidays</div>
          </div>
          
          {hasEvents ? (
            <div className="w-full mt-4 relative">
              <h3 className="text-lg font-semibold text-center mb-2">
                {date && format(date, "MMMM d, yyyy")} Events
              </h3>
              
              {/* ScrollArea for better mobile scrolling */}
              <ScrollArea className="max-h-[calc(50vh)] sm:max-h-[350px] pr-2 rounded-lg mb-1 relative">
                <div className="space-y-3 pb-1">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="w-full shadow-sm">
                      <CardHeader className="p-3 pb-1.5">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        {event.location && (
                          <div className="flex items-start mt-1">
                            <Map className="w-3 h-3 text-civitan-gold mr-1 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-600">{event.location}</p>
                          </div>
                        )}
                        {event.time && (
                          <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                        )}
                      </CardHeader>
                      <CardContent className="p-3 py-1">
                        <p className="text-xs">
                          {event.description || (event.isNoMeeting 
                            ? `We will not be having a meeting due to ${event.title.replace(/^🇺🇸\s/, '').split('(')[0].trim()}, but our next meeting is on ${event.nextMeetingDate ? format(new Date(event.nextMeetingDate), "MMMM d, yyyy") : 'the next scheduled date'} and we would love for you to come, bring a friend!` 
                            : "Join us for this exciting event!")}
                        </p>
                      </CardContent>
                      {event.buttonText && (
                        <CardFooter className="p-3 pt-1.5 flex flex-col gap-2">
                          <div className="flex gap-2 w-full">
                            <Button 
                              className={`flex-1 bg-civitan-blue hover:bg-blue-900 text-white text-xs py-2 ${event.externalUrl ? 'group' : ''}`}
                              onClick={() => handleEmailClick(event)}
                            >
                              {event.externalUrl ? (
                                <>
                                  <ExternalLink className="mr-1.5 h-3 w-3 group-hover:animate-pulse" />
                                  {event.buttonText}
                                </>
                              ) : (
                                <>
                                  <Mail className="mr-1.5 h-3 w-3" />
                                  {event.buttonText}
                                </>
                              )}
                            </Button>
                            
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
                          </div>
                          
                          {event.googleMapsUrl && (
                            <Button 
                              variant="outline" 
                              className="w-full border-civitan-blue text-civitan-blue dark:text-white dark:border-white text-xs"
                              asChild
                              size="sm"
                            >
                              <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                <Map className="mr-1.5 h-3 w-3" />
                                Get Directions
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Scroll indicator for mobile */}
              {isMobile && selectedDateEvents.length > 1 && (
                <div className="flex justify-center mt-2 text-gray-400 animate-pulse">
                  <ChevronDown className="h-5 w-5" />
                  <span className="text-xs ml-1">Scroll for more events</span>
                </div>
              )}
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
