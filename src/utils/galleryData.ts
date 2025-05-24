
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  dateTaken: string; // MM/YY format
  category: string;
  uploadTimestamp: number;
  thumbnailSrc?: string;
}

export const galleryCategories = [
  "All",
  "Community Events",
  "Meetings",
  "Fundraisers",
  "Social Gatherings",
  "Volunteer Activities",
  "Special Events"
];

// Enhanced gallery data with new images
export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/lovable-uploads/63c708c7-1b5a-43a2-8e9d-08ca4ec5fb99.png",
    alt: "Duluth Civitan members at a social event in Gwinnett County",
    title: "Social Event",
    description: "Members gathering for community fellowship",
    dateTaken: "03/24",
    category: "Social Gatherings",
    uploadTimestamp: Date.now() - 86400000
  },
  {
    id: "2",
    src: "/lovable-uploads/41a23cc2-b977-4e3e-bdc8-f9c94d5a3d72.png",
    alt: "Duluth Civitan members at a meeting in Duluth, Georgia",
    title: "Club Meeting",
    description: "Regular monthly meeting with members",
    dateTaken: "03/24",
    category: "Meetings",
    uploadTimestamp: Date.now() - 172800000
  },
  {
    id: "3",
    src: "/lovable-uploads/678ed1df-9ef5-46f2-8944-f1dafc901018.png",
    alt: "Duluth Civitan members with club banner at Gwinnett community event",
    title: "Community Event",
    description: "Representing Duluth Civitan at community gathering",
    dateTaken: "02/24",
    category: "Community Events",
    uploadTimestamp: Date.now() - 259200000
  },
  {
    id: "4",
    src: "/lovable-uploads/8387b82f-19f8-4f1a-8f91-6c3d8890996e.png",
    alt: "Duluth Civitan social gathering for Gwinnett County developmental disabilities support",
    title: "Support Gathering",
    description: "Event supporting developmental disabilities programs",
    dateTaken: "02/24",
    category: "Special Events",
    uploadTimestamp: Date.now() - 345600000
  },
  {
    id: "5",
    src: "/lovable-uploads/ad83702f-43c8-4de3-a275-549a332bbce5.png",
    alt: "Duluth Civitan members at Kids R Kids program in Gwinnett County",
    title: "Kids R Kids Program",
    description: "Supporting local children's programs",
    dateTaken: "01/24",
    category: "Volunteer Activities",
    uploadTimestamp: Date.now() - 432000000
  },
  {
    id: "6",
    src: "/lovable-uploads/657d211f-2f66-446f-85e0-32795be59165.png",
    alt: "Duluth Civitan fundraiser dinner supporting Gwinnett County disability programs",
    title: "Fundraiser Dinner",
    description: "Annual fundraising dinner for disability programs",
    dateTaken: "12/23",
    category: "Fundraisers",
    uploadTimestamp: Date.now() - 518400000
  },
  {
    id: "7",
    src: "/lovable-uploads/11821b97-854b-432a-a50f-d6430f825a52.png",
    alt: "Duluth Civitan social dinner with Gwinnett County community leaders",
    title: "Leadership Dinner",
    description: "Dinner with community leaders and officials",
    dateTaken: "12/23",
    category: "Social Gatherings",
    uploadTimestamp: Date.now() - 604800000
  },
  {
    id: "8",
    src: "/lovable-uploads/e2bfdee5-646c-4834-b5a3-0d73ca739814.png",
    alt: "Duluth Civitan members on a bridge at Gwinnett County park",
    title: "Park Event",
    description: "Team building event at local park",
    dateTaken: "11/23",
    category: "Social Gatherings",
    uploadTimestamp: Date.now() - 691200000
  },
  {
    id: "9",
    src: "/lovable-uploads/1c1349f8-4383-4ae4-ba60-47937d81ecaa.png",
    alt: "Duluth Civitan members with Differently Abled program participants in Gwinnett County",
    title: "Differently Abled Program",
    description: "Working with differently abled community members",
    dateTaken: "11/23",
    category: "Volunteer Activities",
    uploadTimestamp: Date.now() - 777600000
  },
  {
    id: "10",
    src: "/lovable-uploads/7213e43e-d552-4368-b119-9c09673cc595.png",
    alt: "Duluth Civitan club banner and members at Gwinnett County community event",
    title: "Community Outreach",
    description: "Outreach event in the community",
    dateTaken: "10/23",
    category: "Community Events",
    uploadTimestamp: Date.now() - 864000000
  },
  {
    id: "11",
    src: "/lovable-uploads/bd001a11-930f-41c4-94d2-aa356418ff56.png",
    alt: "Duluth Civitan bridge event connecting community members in Gwinnett County",
    title: "Community Bridge Event",
    description: "Building connections in our community",
    dateTaken: "10/23",
    category: "Community Events",
    uploadTimestamp: Date.now() - 950400000
  }
];

export const getFilteredImages = (category: string, dateFilter: string, searchTerm: string) => {
  return galleryImages.filter(image => {
    const categoryMatch = category === "All" || image.category === category;
    const dateMatch = !dateFilter || image.dateTaken === dateFilter;
    const searchMatch = !searchTerm || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && dateMatch && searchMatch;
  });
};

export const getUniqueDates = () => {
  const dates = [...new Set(galleryImages.map(img => img.dateTaken))];
  return dates.sort((a, b) => {
    const [monthA, yearA] = a.split('/').map(Number);
    const [monthB, yearB] = b.split('/').map(Number);
    return yearB - yearA || monthB - monthA;
  });
};
