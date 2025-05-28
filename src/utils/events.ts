
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
  speakerBio?: string; // Biography information for speakers
  isHoliday?: boolean; // Flag to indicate this is a holiday event
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

// All events data
export const eventsData: Event[] = [
  // April 2025 Events
  {
    id: "joe-allen-gwinnett-cid-2025",
    title: "🗣️ Speaker: Joe Allen, Gwinnett Place Community Improvement District",
    description: "Topic: Update on Gwinnett Place",
    speakerBio: "Joe Allen has been the Gwinnett Place CID executive director since 2006, holding a Master of Public Administration from Georgia State University. With more than 20 years of directing executive-level administrative operations, economic development initiatives, marketing and public relations, strategic planning, budgeting, and program management. He aspires to serve the board members and commercial property owners in advancing the shared vision that Gwinnett Place will be the model for an internationally diverse, livable urban community.",
    location: "Chamber's 1818 Club",
    startDate: "2025-04-14",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker Event: Joe Allen on April 14",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "town-center-main-suwanee-tour-2025",
    title: "🏙️ Tour: Town Center on Main in Suwanee",
    description: "Town Center on Main is a roughly 13-acre urban park that expands upon the popular Town Center Park, providing even more opportunities for residents to enjoy outdoor activities and connect with nature. This development has been thoughtfully planned and designed to offer a vibrant mix of recreation, relaxation, and entertainment options. This space is designed for everyone—from families enjoying a picnic to athletes on the volleyball courts, walkers traversing the 1,200-foot-long park-spanning bridge to art enthusiasts admiring Greater Good, the Veterans Memorial.",
    location: "421 Main St, Suwanee, GA",
    startDate: "2025-04-28",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Town Center on Main Tour on April 28",
    googleMapsUrl: "https://maps.google.com/?q=421+Main+St+Suwanee+GA"
  },
  
  // May 2025 Events
  {
    id: "mitun-chaudhuri-maka-maka-2025",
    title: "🗣️ Speaker: Mitun Chaudhuri, Maka Maka Home",
    description: "Topic: Transforming Recycled Materials into Fashion, Accessories, and Home Essentials",
    speakerBio: "Mitun holds an MBA in E-Commerce from Georgia State University and a BBA in MIS from the University of Georgia. As a recipient of the Georgia Rotary Student Program Scholarship, she studied in the U.S. as an undergraduate. Driven by a passion for sustainability, she founded MAKA MAKA, a lifestyle brand inspired by global exploration. Her travels—from the remote beauty of Svalbard to the vibrant energy of India—shape the brand's artisan-focused collections, blending culture, craftsmanship, and sustainability.",
    location: "Chamber's 1818 Club",
    startDate: "2025-05-12",
    time: "11:45 AM",
    type: "civitan",
    buttonText: "RSVP",
    emailSubject: "RSVP for Speaker Event: Mitun Chaudhuri on May 12",
    googleMapsUrl: "https://maps.google.com/?q=Chambers+1818+Club+Duluth+GA"
  },
  {
    id: "memorial-day-2025",
    title: "Memorial Day (No Meeting)",
    startDate: "2025-05-26",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Memorial Day Inquiry",
    isNoMeeting: true,
    isHoliday: true,
    description: "We will not be having a meeting due to Memorial Day, but our next meeting is on June 9th and we would love for you to come, bring a friend!",
    nextMeetingDate: "2025-06-09",
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
  
  // June 2025 Events
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
    id: "speaker-owens-baker",
    title: "🗣️ Speaker: Bethany Owens Baker, Senior Provisions",
    description: "Topic: Dimensions of Wellness: Wellness is derived from our ability to understand, accept, and act upon our capacity to lead a purpose-filled and engaged life.",
    speakerBio: "Bethany Baker is the community liaison for Senior Provisions. She graduated from Kennesaw State University with a Bachelor's degree in Sociology, and she currently resides in Bethlehem, GA, with her husband, where they attend church and enjoy regular coffee dates.",
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
    description: "Curiosity Lab at Peachtree Corners is a 5G-enabled living laboratory for startups and established companies to deploy and test developing technologies in a real-world testing environment with no roadblocks, joined by the next generation of intelligent mobility and smart city technology.",
    location: "147 Technology Parkway, Peachtree Corners, GA 30092",
    startDate: "2025-06-23",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Curiosity Lab Tour on June 23",
    googleMapsUrl: "https://maps.google.com/?q=147+Technology+Parkway+Peachtree+Corners+GA+30092"
  },
  
  // July 2025 Events
  {
    id: "independence-day-2025",
    title: "Independence Day (No Meeting)",
    startDate: "2025-07-04",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Independence Day Inquiry",
    isNoMeeting: true,
    isHoliday: true,
    description: "We will not be having a meeting due to Independence Day, but our next meeting is on July 14th and we would love for you to come, bring a friend!"
  },
  {
    id: "author-talk-ben-cole",
    title: "📘 Author Talk: Ben Cole",
    description: "Topic: Four Down on Old Peachtree Road - A few minutes after midnight on December 6, 1953, a flight of Georgia Air National Guard jets preparing to land at Dobbins Air Base near Atlanta, Georgia, disappeared from radar screens. Soon afterwards, the worst fears were realized when the smoldering remains of the four planes were found at the site of a burned farmhouse near Suwanee, Georgia.",
    speakerBio: "Biography information coming soon.",
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
    description: "Includes boxed lunch. Parc at Duluth Community specializes in developing and operating high-end senior independent living, assisted living, and memory care properties.",
    location: "3315 Peachtree Industrial Blvd, Duluth, GA 30096",
    startDate: "2025-07-28",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Parc @ Duluth Tour on July 28",
    googleMapsUrl: "https://maps.google.com/?q=3315+Peachtree+Industrial+Blvd+Duluth+GA+30096"
  },
  
  // August 2025 Events
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
    description: "Vox Pop Uli is a marketing production company that helps companies grow their brand with print, apparel, and specialty engraving. From banners to shirts to engraved Yetis, we help you get your message out to your customers and associates. On a tour, we share our passion for helping customers grow their brand and see firsthand small and large printing.",
    location: "5100 Peachtree Industrial Blvd Unit 600, Peachtree Corners, GA 30071",
    startDate: "2025-08-25",
    time: "12:00 PM",
    type: "civitan",
    buttonText: "Register",
    emailSubject: "Registration for Vox Pop Uli Tour on August 25",
    googleMapsUrl: "https://maps.google.com/?q=5100+Peachtree+Industrial+Blvd+Unit+600+Peachtree+Corners+GA+30071"
  },
  
  // September 2025 Events
  {
    id: "labor-day-2025",
    title: "Labor Day (No Meeting)",
    startDate: "2025-09-01",
    type: "national",
    buttonText: "More Info",
    emailSubject: "Labor Day Inquiry",
    isNoMeeting: true,
    isHoliday: true,
    description: "We will not be having a meeting due to Labor Day, but our next meeting is on September 8th and we would love for you to come, bring a friend!",
    nextMeetingDate: "2025-09-08"
  },
  {
    id: "speaker-charel-aoun",
    title: "🎓 Speaker: Charel Aoun, GA First Generation Foundation",
    description: "Topic: The Georgia First Generation Foundation is a non-profit organization devoted to providing resources for high school students who cannot obtain a college education without these resources. These students must be first-generation students who are passionate about achieving academic success after high school. Unlike other leadership programs, the Georgia First Generation Foundation provides specific strategic plans for any college degree.",
    speakerBio: "Biography information coming soon.",
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
