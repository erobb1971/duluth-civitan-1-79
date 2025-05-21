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
  noEmail?: boolean; // Flag to indicate we should just show a toast without email
  rsvpMessage?: string; // Custom message for RSVP confirmation
  googleMapsUrl?: string; // URL for directions
  isNoMeeting?: boolean; // Flag to indicate this is a "no meeting" event
  nextMeetingDate?: string; // Next meeting date after a holiday or no-meeting event
  externalUrl?: string; // URL for external registration/information
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

// Get next meeting date after a holiday
export const getNextMeetingDate = (currentDate: string): string => {
  // Get all future events sorted by date
  const futureEvents = eventsData
    .filter(event => isAfter(parseISO(event.startDate), parseISO(currentDate)) && !event.isNoMeeting)
    .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
  
  // Return the date of the first future event that's not a holiday or "no meeting"
  return futureEvents.length > 0 ? futureEvents[0].startDate : "";
};

// Generate Google Calendar URL
export const getGoogleCalendarUrl = (event: Event): string => {
  const startDate = event.startDate;
  const endDate = event.endDate || event.startDate;
  const timeStr = event.time ? ` at ${event.time}` : '';
  const locationStr = event.location ? ` at ${event.location}` : '';
  
  // Format: https://calendar.google.com/calendar/render?action=TEMPLATE&text=Title&dates=20250522T090000/20250522T100000&details=Description&location=Location
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const textParam = `&text=${encodeURIComponent(event.title)}`;
  
  // Format dates (using T000000 for all day events)
  const startParam = startDate.replace(/-/g, '') + 'T000000';
  const endParam = endDate.replace(/-/g, '') + 'T235900';
  const datesParam = `&dates=${startParam}/${endParam}`;
  
  // Optional parameters
  const descriptionParam = event.description 
    ? `&details=${encodeURIComponent(event.description)}` 
    : '';
  const locationParam = event.location 
    ? `&location=${encodeURIComponent(event.location)}` 
    : '';
    
  return `${baseUrl}${textParam}${datesParam}${descriptionParam}${locationParam}`;
};

// Generate iCal format data (for Apple Calendar, Outlook, etc.)
export const getICalUrl = (event: Event): string => {
  // Basic format of an iCal file
  const startDate = event.startDate.replace(/-/g, '');
  const endDate = (event.endDate || event.startDate).replace(/-/g, '');
  
  const icalData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Duluth Civitan Club//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    event.description ? `DESCRIPTION:${event.description}` : '',
    event.location ? `LOCATION:${event.location}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icalData)}`;
};

// All events data - Updated to include new Spectrum events and fixed US to USA for national holidays
export const eventsData: Event[] = [
  {
    id: "spectrum-garden-tour-2025",
    title: "🌿 Spectrum Sensory & Harvest Gardens Tour",
    description: "Tour the sensory and harvest gardens at Spectrum Autism Support Center",
    location: "Spectrum Autism Support Center, 2997 Main Street, Duluth, GA 30096",
    startDate: "2025-06-05",
    time: "2:00 PM - 4:00 PM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Spectrum Gardens Tour on June 5",
    googleMapsUrl: "https://maps.google.com/?q=2997+Main+Street+Duluth+GA+30096"
  },
  {
    id: "spectrum-fishing-day-2025",
    title: "🎣 Spectrum Family Fishing Fun Day",
    description: "Family fishing event sponsored by Kyo Autism Therapy",
    location: "Wayne's Hill Pond, Suwanee",
    startDate: "2025-06-07",
    time: "9:30 AM - 12:30 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Family Fishing Fun Day on June 7",
    externalUrl: "https://SpectrumAutism.org", 
    googleMapsUrl: "https://maps.google.com/?q=Wayne's+Hill+Pond+Suwanee+GA"
  },
  {
    id: "cocktail-reception-2025",
    title: "🥂 Cocktail Reception: Meet the Mayor of Duluth, GA Greg Whitlock",
    location: "Courtyard by Marriott, Downtown Duluth",
    startDate: "2025-05-22",
    time: "5:00 PM – 7:00 PM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Cocktail Reception with Mayor on May 22",
    noEmail: true,
    rsvpMessage: "We have received your RSVP and look forward to seeing you there.",
    googleMapsUrl: "https://maps.google.com/?q=Courtyard+by+Marriott+Downtown+Duluth+GA"
  },
  {
    id: "memorial-day-2025",
    title: "🇺🇸 USA Memorial Day (No Meeting)",
    startDate: "2025-05-26",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Memorial Day Inquiry",
    isNoMeeting: true,
    description: "We will not be having a meeting due to Memorial Day, but our next meeting is on June 9th and we would love for you to come, bring a friend!",
    nextMeetingDate: "2025-06-09",
  },
  {
    id: "speaker-owens-baker",
    title: "🗣️ Speaker: Bethany Owens Baker, Senior Provisions",
    description: "Topic: Dimensions of Wellness",
    location: "Chamber's 1818 Club",
    startDate: "2025-06-09",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker Event: Bethany Owens Baker on June 9",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "curiosity-lab-tour",
    title: "🧪 Tour: Curiosity Lab, Peachtree Corners",
    location: "Curiosity Lab, Peachtree Corners",
    startDate: "2025-06-23",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Curiosity Lab Tour on June 23",
    googleMapsUrl: "https://maps.google.com/?q=Curiosity+Lab+Peachtree+Corners+GA"
  },
  {
    id: "independence-day-2025",
    title: "🇺🇸 USA Independence Day (No Meeting)",
    startDate: "2025-07-04",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Independence Day Inquiry",
    isNoMeeting: true,
    description: "We will not be having a meeting due to Independence Day, but our next meeting is on July 14th and we would love for you to come, bring a friend!"
  },
  {
    id: "author-talk-ben-cole",
    title: "📘 Author Talk: Ben Cole",
    description: "Topic: Four Down on Old Peachtree Road",
    location: "Chamber's 1818 Club",
    startDate: "2025-07-14",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Author Talk: Ben Cole on July 14",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "parc-duluth-tour",
    title: "🏡 Tour: Parc @ Duluth, hosted by Rachel Sanders",
    description: "Includes boxed lunch",
    location: "Parc @ Duluth",
    startDate: "2025-07-28",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Parc @ Duluth Tour on July 28",
    googleMapsUrl: "https://maps.google.com/?q=Parc+at+Duluth+GA"
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
    emailSubject: "Registration for Civitan International Conference on August 6-9",
    googleMapsUrl: "https://maps.google.com/?q=Crowne+Plaza+Atlanta+Perimeter+at+Ravinia"
  },
  {
    id: "civitan-business-meeting",
    title: "🏢 Reserved for Civitan Business",
    location: "Chamber's 1818 Club",
    startDate: "2025-08-11",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Civitan Business Meeting on August 11",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "vox-pop-uli-tour",
    title: "🖨️ Tour: Vox Pop Uli, Peachtree Corners",
    description: "Focus: Branding & production",
    location: "Vox Pop Uli, Peachtree Corners",
    startDate: "2025-08-25",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Vox Pop Uli Tour on August 25",
    googleMapsUrl: "https://maps.google.com/?q=Vox+Pop+Uli+Peachtree+Corners+GA"
  },
  {
    id: "labor-day-2025",
    title: "🇺🇸 USA Labor Day (No Meeting)",
    startDate: "2025-09-01",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Labor Day Inquiry",
    isNoMeeting: true,
    description: "We will not be having a meeting due to Labor Day, but our next meeting is on September 8th and we would love for you to come, bring a friend!",
    nextMeetingDate: "2025-09-08"
  },
  {
    id: "speaker-charel-aoun",
    title: "🎓 Speaker: Charel Aoun, GA First Generation Foundation",
    description: "Topic: College access for first-gen students",
    location: "Chamber's 1818 Club",
    startDate: "2025-09-08",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker: Charel Aoun on September 8",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "duluth-fall-festival",
    title: "🎪 Duluth Fall Festival",
    description: "Booth, cotton candy sales, local nonprofit support",
    location: "Downtown Duluth",
    startDate: "2025-09-27",
    endDate: "2025-09-28",
    type: "civitan",
    buttonText: "Volunteer",
    emailSubject: "Volunteer for Duluth Fall Festival on September 27-28",
    googleMapsUrl: "https://maps.google.com/?q=Downtown+Duluth+GA"
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
