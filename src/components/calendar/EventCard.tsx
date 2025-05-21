import React from "react";
import { Event } from "@/utils/events";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Mail, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CalendarAddToButtons from "./CalendarAddToButtons";

interface EventCardProps {
  event: Event;
}

const handleExternalUrl = (event: Event) => {
  window.open(event.externalUrl, "_blank", "noopener,noreferrer");
};

const handleSpectrumGardenTourEmail = () => {
  window.location.href = `mailto:claire@spectrumautism.org?subject=RSVP for Garden Tour&body=I would like to RSVP for the Spectrum Sensory & Harvest Gardens Tour on June 5, 2025. Please provide any additional information needed.`;
  toast({
    title: "Thank you!",
    description: "Your RSVP has been sent to claire@spectrumautism.org.",
  });
};

const handleNoEmail = (event: Event) => {
  toast({
    title: "Thank you!",
    description: event.rsvpMessage || "Your RSVP has been received.",
  });
};

const handleDefaultEmail = () => {
  window.location.href = `mailto:info@duluthcivitanclub.org?subject=Event Inquiry&body=Thank you for your interest in this event. Please provide your contact information and we will get back to you shortly.`;
  toast({
    title: "Thank you!",
    description: "Your interest has been submitted. We'll be in touch soon.",
  });
};

const handleEmailClick = (event: Event) => {
  if (event.externalUrl) {
    handleExternalUrl(event);
    return;
  }

  if (event.id === "spectrum-garden-tour-2025") {
    handleSpectrumGardenTourEmail();
    return;
  }

  if (event.noEmail) {
    handleNoEmail(event);
    return;
  }

  handleDefaultEmail();
};

const EventCard = ({ event }: EventCardProps) => {
  return (
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
            ? `We will not be having a meeting due to ${event.title.replace(/^🇺🇸\s/, '').split('(')[0].trim()}, but our next meeting is on ${event.nextMeetingDate ? new Date(event.nextMeetingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'the next scheduled date'} and we would love for you to come, bring a friend!` 
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
            
            <CalendarAddToButtons event={event} />
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
  );
};

export default EventCard;
