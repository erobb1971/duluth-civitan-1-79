
import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";

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

// Function to format event date from utils/events.ts
const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

interface ShareButtonsProps {
  event: any;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ event }) => {
  // Function to handle social media sharing
  const handleShare = (platform: string, event: any) => {
    const shareUrl = getShareUrl(platform, event);
    window.open(shareUrl, '_blank', 'width=550,height=435');
  };

  return (
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
  );
};

export default ShareButtons;
