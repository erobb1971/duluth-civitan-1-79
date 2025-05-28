
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Map, Mail, ExternalLink } from "lucide-react";
import { formatEventDate } from "@/utils/events";
import { toast } from "@/hooks/use-toast";
import CalendarButton from "./CalendarButton";
import ShareButtons from "./ShareButtons";
import HolidayEventTitle from "./HolidayEventTitle";

interface EventCardProps {
  event: any;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const handleEmailClick = (event: { emailSubject?: string, noEmail?: boolean, rsvpMessage?: string, externalUrl?: string, id?: string }) => {
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
    
    // Otherwise, handle as before with email
    window.location.href = `mailto:info@duluthcivitanclub.org?subject=${event.emailSubject || "Event Inquiry"}&body=Thank you for your interest in this event. Please provide your contact information and we will get back to you shortly.`;
    
    // Show thank you toast
    toast({
      title: "Thank you!",
      description: "Your interest has been submitted. We'll be in touch soon.",
    });
  };

  return (
    <Card className="civitan-shadow flex flex-col">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center mb-2">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2" />
          <time 
            dateTime={event.startDate} 
            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm"
          >
            {formatEventDate(event.startDate)} {event.time && `| ${event.time}`}
          </time>
        </div>
        <CardTitle className="text-lg sm:text-xl text-civitan-blue dark:text-white">
          <HolidayEventTitle event={event} />
        </CardTitle>
        {event.location && (
          <div className="flex items-start mt-2">
            <Map className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
            <address className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 not-italic">
              {event.location}
            </address>
          </div>
        )}
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-2 flex-grow">
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          {event.description || (event.isNoMeeting 
            ? `We will not be having a meeting due to ${event.title.replace(/^🇺🇸\s/, '').split('(')[0].trim()}, but our next meeting is on ${event.nextMeetingDate ? formatEventDate(event.nextMeetingDate) : 'the next scheduled date'} and we would love for you to come, bring a friend!`
            : "Join us for this exciting event!")}
        </p>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-2 flex flex-col gap-2 mt-auto">
        <div className="flex gap-2 w-full">
          <Button 
            className={`flex-1 bg-civitan-blue hover:bg-blue-900 text-white text-xs sm:text-sm py-2 ${event.externalUrl ? 'group' : ''}`}
            onClick={() => handleEmailClick(event)}
          >
            {event.externalUrl ? (
              <>
                <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-pulse" />
                {event.buttonText || "Register"}
              </>
            ) : (
              <>
                <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {event.buttonText || "RSVP"}
              </>
            )}
          </Button>
          
          <CalendarButton event={event} />
        </div>
        
        <div className="flex justify-between items-center w-full">
          {event.googleMapsUrl && (
            <Button 
              variant="outline" 
              className="flex-1 border-civitan-blue text-civitan-blue dark:text-white dark:border-white text-xs sm:text-sm"
              asChild
            >
              <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Map className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Get Directions
              </a>
            </Button>
          )}
          
          <ShareButtons event={event} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
