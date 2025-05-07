
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Mail } from "lucide-react";

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
  const handleEmailClick = (subject: string) => {
    window.location.href = `mailto:info@duluthcivitanclub.org?subject=${subject}&body=Thank you for your interest in our ${subject} event. Please provide your contact information and we will get back to you shortly.`;
  };

  return (
    <section id="events" className="section bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Stay involved with our community through these upcoming activities and events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="civitan-shadow">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <CalendarDays className="w-5 h-5 text-civitan-gold mr-2" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {event.date} | {event.time}
                  </span>
                </div>
                <CardTitle className="text-xl text-civitan-blue dark:text-white">
                  {event.title}
                </CardTitle>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {event.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-civitan-blue hover:bg-blue-900 text-white"
                  onClick={() => handleEmailClick(event.emailSubject)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {event.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-civitan-blue text-civitan-blue dark:text-white dark:border-white"
            onClick={() => handleEmailClick("Events")}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
