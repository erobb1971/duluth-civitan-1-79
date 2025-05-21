
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import TimelineCard from "./TimelineCard";
import { TimelineEvent } from "./timelineData";

interface TimelineCarouselProps {
  events: TimelineEvent[];
  onInteraction: () => void;
}

const TimelineCarousel: React.FC<TimelineCarouselProps> = ({ events, onInteraction }) => {
  const [hoveredYear, setHoveredYear] = useState<string | number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
    <Carousel 
      opts={{ 
        align: "start",
        loop: false,
        containScroll: "trimSnaps",
        dragFree: false,
      }}
      className="w-full"
      onSelect={(index) => {
        // Ensure we're passing a number to setActiveIndex
        if (typeof index === 'number') {
          setActiveIndex(index);
          onInteraction();
        }
      }}
    >
      {/* Navigation arrows positioned above timeline */}
      <div className="hidden sm:block mb-12">
        <CarouselPrevious className="absolute left-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold text-civitan-blue dark:text-civitan-gold" />
        <CarouselNext className="absolute right-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold text-civitan-blue dark:text-civitan-gold" />
      </div>

      <CarouselContent className="-ml-1 md:-ml-4">
        {events.map((event, index) => (
          <CarouselItem 
            key={index} 
            className="pl-1 md:pl-4 xs:basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            onMouseEnter={() => setHoveredYear(event.year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <TimelineCard 
              event={event} 
              isActive={hoveredYear === event.year || activeIndex === index} 
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TimelineCarousel;
