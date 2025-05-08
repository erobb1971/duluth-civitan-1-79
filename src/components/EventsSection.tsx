
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail } from "lucide-react";
import CalendarModal from "./CalendarModal";
import { useIsMobile } from "@/hooks/use-mobile";

const upcomingEvents = [
  {
    title: "Monthly Member Meeting",
    date: "June 15, 2025",
    time: "7:00 PM - 8:30 PM",
    location: "Civitan Clubhouse",
    description: "Monthly meeting for all members with guest speaker on community leadership.",
    buttonText: "RSVP",
    emailSubject: "RSVP"
  },
  {
    title: "Charity Golf Tournament",
    date: "July 8, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Golden Horizon Golf Club",
    description: "Annual charity golf tournament to raise funds for local developmental disability programs.",
    buttonText: "Register",
    emailSubject: "Registration"
  },
  {
    title: "Summer Volunteer Day",
    date: "July 22, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Magic Farm",
    description: "Join us for a day of volunteering at our partner organization, Magic Farm.",
    buttonText: "Volunteer",
    emailSubject: "Volunteer"
  },
];

const EventsSection = () => {
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleEmailClick = (subject: string) => {
    window.location.href = `mailto:info@duluthcivitanclub.org?subject=${subject}&body=Thank you for your interest in our ${subject} event. Please provide your contact information and we will get back to you shortly.`;
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 px-2 sm:px-0">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="civitan-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center mb-2">
                  <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                    {event.date} | {event.time}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl text-civitan-blue dark:text-white">
                  {event.title}
                </CardTitle>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {event.location}
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-2">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-2">
                <Button 
                  className="w-full bg-civitan-blue hover:bg-blue-900 text-white text-xs sm:text-sm py-2"
                  onClick={() => handleEmailClick(event.emailSubject)}
                >
                  <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {event.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
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
    </section>
  );
};

export default EventsSection;
