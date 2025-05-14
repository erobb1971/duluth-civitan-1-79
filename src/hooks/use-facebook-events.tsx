
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Define the event interface to match our current structure
export interface FacebookEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  buttonText: string; // "RSVP", "Register", or "Volunteer"
  emailSubject: string;
}

export const useFacebookEvents = () => {
  const [events, setEvents] = useState<FacebookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch from Facebook Graph API
        // For now, we'll simulate with sample data from Facebook page
        // You'll need to replace this with actual API call using Facebook SDK/Graph API
        
        // Simulated data based on https://www.facebook.com/DuluthCivitan/events
        const facebookEvents: FacebookEvent[] = [
          {
            title: "Monthly Member Meeting",
            date: "June 15, 2025",
            time: "7:00 PM - 8:30 PM",
            location: "Civitan Clubhouse",
            description: "Monthly meeting for all members with guest speaker on community leadership.",
            buttonText: "RSVP",
            emailSubject: "RSVP for Monthly Member Meeting on June 15"
          },
          {
            title: "Charity Golf Tournament",
            date: "July 8, 2025",
            time: "9:00 AM - 3:00 PM",
            location: "Golden Horizon Golf Club",
            description: "Annual charity golf tournament to raise funds for local developmental disability programs.",
            buttonText: "Register",
            emailSubject: "Registration for Charity Golf Tournament on July 8"
          },
          {
            title: "Summer Volunteer Day",
            date: "July 22, 2025",
            time: "10:00 AM - 2:00 PM",
            location: "Magic Farm",
            description: "Join us for a day of volunteering at our partner organization, Magic Farm.",
            buttonText: "Volunteer",
            emailSubject: "Volunteer for Summer Volunteer Day on July 22"
          },
        ];
        
        setEvents(facebookEvents);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch Facebook events:", err);
        setError("Failed to load events. Please try again later.");
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to load events from Facebook",
          variant: "destructive",
        });
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
};
