
import { format, isAfter, isBefore, isEqual, parseISO, startOfDay } from "date-fns";

export type EventType = "civitan" | "national" | "international";

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: string; // ISO format
  endDate?: string; // ISO format
  time?: string;
  type: EventType;
  buttonText?: string;
  emailSubject?: string;
}

const today = startOfDay(new Date());

// Helper function to determine if an event is in the future
export const isEventInFuture = (event: Event): boolean => {
  const eventDate = parseISO(event.startDate);
  return isAfter(eventDate, today) || isEqual(eventDate, today);
};

// Helper function to format date for display
export const formatEventDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "MMMM d, yyyy");
};

// All events data
export const eventsData: Event[] = [
  {
    id: "cocktail-reception-2025",
    title: "🥂 Cocktail Reception: Meet the Mayor of Duluth",
    location: "Courtyard by Marriott, Downtown Duluth",
    startDate: "2025-05-22",
    time: "5:00 PM – 7:00 PM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Cocktail Reception with Mayor on May 22"
  },
  {
    id: "memorial-day-2025",
    title: "🇺🇸 Memorial Day (No Meeting)",
    startDate: "2025-05-26",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Memorial Day Inquiry"
  },
  {
    id: "speaker-owens-baker",
    title: "🗣️ Speaker: Bethany Owens Baker, Senior Provisions",
    description: "Topic: Dimensions of Wellness",
    startDate: "2025-06-09",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker Event: Bethany Owens Baker on June 9"
  },
  {
    id: "curiosity-lab-tour",
    title: "🧪 Tour: Curiosity Lab, Peachtree Corners",
    startDate: "2025-06-23",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Curiosity Lab Tour on June 23"
  },
  {
    id: "author-talk-ben-cole",
    title: "📘 Author Talk: Ben Cole",
    description: "Topic: Four Down on Old Peachtree Road",
    startDate: "2025-07-14",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Author Talk: Ben Cole on July 14"
  },
  {
    id: "parc-duluth-tour",
    title: "🏡 Tour: Parc @ Duluth, hosted by Rachel Sanders",
    description: "Includes boxed lunch",
    startDate: "2025-07-28",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Parc @ Duluth Tour on July 28"
  },
  {
    id: "civitan-international-conference",
    title: "🌍 Civitan International Conference",
    description: "Duluth Civitan to provide raffle gifts and slideshow",
    location: "Crowne Plaza, Atlanta Perimeter at Ravinia",
    startDate: "2025-08-06",
    endDate: "2025-08-09",
    type: "international",
    buttonText: "Register",
    emailSubject: "Registration for Civitan International Conference on August 6-9"
  },
  {
    id: "civitan-business-meeting",
    title: "🏢 Reserved for Civitan Business",
    startDate: "2025-08-11",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Civitan Business Meeting on August 11"
  },
  {
    id: "vox-pop-uli-tour",
    title: "🖨️ Tour: Vox Pop Uli, Peachtree Corners",
    description: "Focus: Branding & production",
    startDate: "2025-08-25",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Vox Pop Uli Tour on August 25"
  },
  {
    id: "speaker-charel-aoun",
    title: "🎓 Speaker: Charel Aoun, GA First Generation Foundation",
    description: "Topic: College access for first-gen students",
    startDate: "2025-09-08",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker: Charel Aoun on September 8"
  },
  {
    id: "duluth-fall-festival",
    title: "🎪 Duluth Fall Festival",
    description: "Booth, cotton candy sales, local nonprofit support",
    startDate: "2025-09-27",
    endDate: "2025-09-28",
    type: "civitan",
    buttonText: "Volunteer",
    emailSubject: "Volunteer for Duluth Fall Festival on September 27-28"
  },
  // National holidays
  {
    id: "independence-day-2025",
    title: "🇺🇸 Independence Day",
    startDate: "2025-07-04",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Independence Day Inquiry"
  },
  {
    id: "labor-day-2025",
    title: "🇺🇸 Labor Day",
    startDate: "2025-09-01",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Labor Day Inquiry"
  }
];

// Get upcoming events (future events)
export const getUpcomingEvents = (): Event[] => {
  return eventsData
    .filter(isEventInFuture)
    .sort((a, b) => {
      // Sort by date
      return parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
    });
};

// Get next N upcoming events
export const getNextEvents = (count: number): Event[] => {
  return getUpcomingEvents().slice(0, count);
};

// Function to get event dots for calendar
export const getEventDots = (date: Date | undefined): { type: EventType; event: Event; }[] => {
  if (!date) return [];
  
  const formattedDate = format(date, "yyyy-MM-dd");
  return eventsData
    .filter(event => {
      // For multi-day events
      if (event.endDate) {
        const eventStart = parseISO(event.startDate);
        const eventEnd = parseISO(event.endDate);
        return (
          isBefore(eventStart, date) && isAfter(eventEnd, date) ||
          format(eventStart, "yyyy-MM-dd") === formattedDate ||
          format(eventEnd, "yyyy-MM-dd") === formattedDate
        );
      }
      
      // For single day events
      return event.startDate === formattedDate;
    })
    .map(event => ({ type: event.type, event }));
};
