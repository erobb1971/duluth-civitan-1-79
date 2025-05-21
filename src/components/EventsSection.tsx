import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Map, Mail, ExternalLink, Info, Share2 } from "lucide-react";
import CalendarModal from "./CalendarModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { getNextEvents, formatEventDate, getGoogleCalendarUrl, getICalUrl } from "@/utils/events";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "./ui/tooltip";

// Social media sharing helper functions
const getShareUrl = (platform: string, event: any) => {
  const title = `Check out this event: ${event.title}`;
  const url = window.location.href + '#events';
  const text = `${title} on ${formatEventDate(event.startDate)}${event.time ? ` at ${event.time}` : ''}.${event.location ? ` Location: ${event.location}` : ''}`;

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\nSee more at: ' + url)}`;
    default:
      return '';
  }
};

const EventsSection = () => {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Get the next 3 upcoming events
  const upcomingEvents = getNextEvents(3);
  
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

  // Function to handle social media sharing
  const handleShare = (platform: string, event: any) => {
    const shareUrl = getShareUrl(platform, event);
    window.open(shareUrl, '_blank', 'width=550,height=435');
  };

  // Updated formatter to simply return the event title as-is
  const formatEventTitle = (event: any) => {
    return event.title;
  };

  // Add schema.org Event markup
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": upcomingEvents.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": event.title,
        "startDate": event.startDate,
        "endDate": event.endDate || event.startDate,
        "location": event.location ? {
          "@type": "Place",
          "name": event.location
        } : undefined,
        "description": event.description || ""
      }
    }))
  };

  return (
    <section id="events" className="section bg-white dark:bg-gray-900 py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 sm:mb-4">
            Upcoming Events
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Stay involved with our community through these upcoming activities and events
          </p>
        </div>
        
        {/* Meeting schedule information */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
          <Card className="civitan-shadow">
            <CardHeader className="bg-civitan-blue text-white p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">🗓️ Regular Meeting Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium">2nd Monday of each month at 11:45 AM</p>
                  <div className="flex items-start mt-2">
                    <Map className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">Chamber's 1818 Club</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">4th Monday of each month at 12:00 PM (Noon)</p>
                  <div className="flex items-start mt-2">
                    <Map className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">Rotating community locations</p>
                  </div>
                  <div className="flex items-start mt-2">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">Please contact us for more details if you would like to attend</p>
                  </div>
                  <div className="mt-3">
                    <Button 
                      className="bg-civitan-blue hover:bg-blue-900 text-white text-xs sm:text-sm"
                      onClick={() => {
                        window.location.href = "mailto:info@duluthcivitanclub.org?subject=Meeting Location Inquiry";
                      }}
                    >
                      <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Contact for Details
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 italic border-t pt-4 mt-4">
                  Note: If a scheduled meeting falls on a holiday, there will be no meeting on that date.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
          <a href="https://civitan.org/convention/" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
            <img 
              src="/lovable-uploads/50742192-6c88-49ea-a0c3-f33fd52d643f.png"
              alt="ATLCIVITAN2025"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </a>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-2 sm:px-0">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="civitan-shadow flex flex-col">
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
                    {formatEventTitle(event)}
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
                      ? `We will not be having a meeting due to ${event.title.split('(')[0].trim()}, but our next meeting is on ${event.nextMeetingDate ? formatEventDate(event.nextMeetingDate) : 'the next scheduled date'} and we would love for you to come, bring a friend!`
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
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <Share2 className="h-4 w-4 text-civitan-blue" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Share this event</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare('facebook', event)}>
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('twitter', event)}>
                          Twitter/X
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin', event)}>
                          LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('email', event)}>
                          Email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TooltipProvider>
        
        {!isMobile && (
          <div className="text-center mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              className="border-civitan-blue text-civitan-blue dark:text-white dark:border-white"
              onClick={() => setCalendarModalOpen(true)}
            >
              View All Events
            </Button>
          </div>
        )}
      </div>
      
      <CalendarModal
        open={calendarModalOpen}
        onOpenChange={setCalendarModalOpen}
      />

      {/* Add schema.org Event markup */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </section>
  );
};

export default EventsSection;
