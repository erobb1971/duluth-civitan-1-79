
export interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
  restricted: boolean;
  category: string;
}

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: "January 2024 Meeting Minutes",
    type: "minutes",
    date: "2024-01-15",
    size: "234 KB",
    restricted: false,
    category: "Meeting Minutes"
  },
  {
    id: 2,
    title: "Club Constitution & Bylaws",
    type: "constitution",
    date: "2023-12-01",
    size: "1.2 MB",
    restricted: false,
    category: "Governance"
  },
  {
    id: 3,
    title: "Board Meeting Minutes - February",
    type: "minutes",
    date: "2024-02-05",
    size: "156 KB",
    restricted: true,
    category: "Board Documents"
  },
  {
    id: 4,
    title: "Annual Financial Report 2023",
    type: "financial",
    date: "2024-01-30",
    size: "892 KB",
    restricted: true,
    category: "Financial"
  },
  {
    id: 5,
    title: "Volunteer Guidelines Handbook",
    type: "handbook",
    date: "2023-11-15",
    size: "2.1 MB",
    restricted: false,
    category: "Resources"
  },
  {
    id: 6,
    title: "Event Planning Checklist",
    type: "template",
    date: "2023-10-20",
    size: "87 KB",
    restricted: false,
    category: "Templates"
  }
];
