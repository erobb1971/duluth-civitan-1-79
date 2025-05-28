
import React from "react";
import { Event } from "@/utils/events";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Mail, ExternalLink } from "lucide-react";
import { handleEmailClick } from "@/utils/emailHandlers";
import CalendarAddToButtons from "./CalendarAddToButtons";
import HolidayEventTitle from "../events/HolidayEventTitle";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card key={event.id} className="w-full shadow-sm">
      <CardHeader className="p-3 pb-1.5">
        <h4 className="text-sm font-medium">
          <HolidayEventTitle event={event} />
        </h4>
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
