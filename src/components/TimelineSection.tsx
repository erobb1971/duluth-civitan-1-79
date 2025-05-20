
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const timelineEvents = [
  {
    year: 2003,
    title: "Duluth Civitan Club Founded",
    description: "The Duluth Civitan Club was officially founded on May 22, 2003.",
  },
  {
    year: "2003-2004",
    title: "First Club President",
    description: "Bob Watson (Deceased) served as the first president of the Duluth Civitan Club.",
  },
  {
    year: "2004-2005",
    title: "Leadership Transition",
    description: "Scott Jordan took over as the club's president.",
  },
  {
    year: "2005-2006",
    title: "Growing Membership",
    description: "Don Tew led the club as president, focusing on membership growth.",
  },
  {
    year: "2006-2007",
    title: "Community Projects Expansion",
    description: "Erica Dumple's presidency saw an expansion of community service initiatives.",
  },
  {
    year: "2007-2008",
    title: "Strengthening Partnerships",
    description: "Under Melvin Buchanan's leadership, the club formed key community partnerships.",
  },
  {
    year: "2008-2010",
    title: "Two-Year Presidential Term",
    description: "Loren Brown served as president for two consecutive years.",
  },
  {
    year: "2010-2012",
    title: "Increased Fundraising",
    description: "Jerry Robb's two-year term focused on enhancing fundraising efforts.",
  },
  {
    year: "2012-2013",
    title: "Founder's Leadership",
    description: "Founder Terry Crouch served as president.",
  },
  {
    year: "2013-2014",
    title: "New Initiatives",
    description: "Susan Young led the club with a focus on new community initiatives.",
  },
  {
    year: "2014-2015",
    title: "Expanding Reach",
    description: "Sandy Weaver helped expand the club's reach in the community.",
  },
  {
    year: "2015-2016",
    title: "Strategic Growth",
    description: "David Cross implemented strategic growth plans for the club.",
  },
  {
    year: "2016-2017",
    title: "Return Leadership",
    description: "Sandy Weaver returned for another term as president.",
  },
  {
    year: "2017-2018",
    title: "Enhancing Community Impact",
    description: "Claire Dees focused on enhancing the club's community impact.",
  },
  {
    year: "2018-2019",
    title: "Membership Drive",
    description: "Kim Stufflet led a successful membership drive.",
  },
  {
    year: "2019-2020",
    title: "Transition Period",
    description: "Jon Hoovestol (Deceased) served as president.",
  },
  {
    year: "2020-2021",
    title: "Co-Presidential Term",
    description: "Jon Hoovestol & Terry Crouch served as co-presidents.",
  },
  {
    year: "2021-2022",
    title: "Pandemic Response",
    description: "Terry Crouch led the club through pandemic-related challenges.",
  },
  {
    year: "2022-2024",
    title: "Two-Year Leadership",
    description: "Claire Dees served another term, focusing on post-pandemic recovery.",
  },
  {
    year: "2024-2025",
    title: "Current Leadership",
    description: "Kim Stufflet returned as president for the current term.",
  },
  {
    year: "Oct 2025-2026",
    title: "Upcoming Leadership",
    description: "Cheryl Crouch will begin her term as president in October 2025.",
  },
];

const TimelineSection = () => {
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [hoveredYear, setHoveredYear] = useState<string | number | null>(null);
  const isMobile = useIsMobile();
  
  // Hide scroll cue after user has interacted with timeline
  const handleInteraction = () => {
    setShowScrollCue(false);
  };

  // Auto-hide scroll cue after a longer time (10 seconds) to ensure users see it
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollCue(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="timeline" 
      className="section bg-gray-100 dark:bg-gray-800 py-10 md:py-16 relative w-full overflow-hidden"
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3">
            Our Journey Through Time
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Duluth Civitan's history since our founding in 2003
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-block bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md border-2 border-civitan-gold relative z-10 max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-civitan-blue dark:text-white mb-3">Founders / Club Builders</h3>
            <ul className="text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-1">
              <li className="font-medium">Terry Crouch (Founder)</li>
              <li>Cheryl Crouch</li>
              <li>Terry Swaim</li>
              <li>Chuck Hartman</li>
            </ul>
          </div>
        </div>
        
        {/* Horizontal Timeline */}
        <div className="relative mt-8" onClick={handleInteraction} onTouchStart={handleInteraction}>
          {/* Timeline connector line */}
          <div className="absolute h-0.5 bg-civitan-gray dark:bg-gray-600 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>

          {/* Mobile swipe indicator - Always visible on mobile */}
          <div className={cn(
            "flex items-center justify-center mb-4 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
            "md:hidden transition-opacity duration-300",
            "sticky z-10"
          )}>
            <span className="font-medium">Swipe</span> 
            <ChevronsRight size={16} className="animate-pulse" /> 
            <span>to explore our history</span>
          </div>
          
          {/* Desktop scroll instructions */}
          <div className={cn(
            "hidden md:flex items-center justify-center mb-4 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
            "transition-opacity duration-300",
            showScrollCue ? "opacity-100" : "opacity-0"
          )}>
            <ChevronLeft size={16} /> 
            <span>Scroll or use arrows</span> 
            <ChevronRight size={16} />
            <span>to explore our history</span>
          </div>
          
          {/* Timeline Carousel */}
          <Carousel 
            opts={{ 
              align: "start",
              loop: false,
              containScroll: "trimSnaps",
              dragFree: false,
            }}
            className="w-full"
          >
            {/* Navigation arrows positioned above timeline */}
            <div className="hidden sm:block mb-12">
              <CarouselPrevious className="absolute left-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold" />
              <CarouselNext className="absolute right-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold" />
            </div>

            <CarouselContent className="-ml-1 md:-ml-4">
              {timelineEvents.map((event, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-1 md:pl-4 xs:basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  onMouseEnter={() => setHoveredYear(event.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                >
                  <div className="relative h-full">
                    {/* Timeline point */}
                    <div className={cn(
                      "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
                      "w-4 h-4 rounded-full bg-civitan-gold transition-all duration-300",
                      hoveredYear === event.year ? "scale-150" : ""
                    )}>
                      {/* Pulsing effect */}
                      <span className={cn(
                        "absolute inset-0 rounded-full",
                        "animate-pulse bg-civitan-gold/30"
                      )}></span>
                    </div>
                    
                    {/* Year indicator */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="h-8"></div> {/* Spacer for timeline points */}
                      <span className="inline-block bg-civitan-blue dark:bg-civitan-gold text-white dark:text-civitan-blue px-3 py-1 rounded-full text-sm font-bold mb-2">
                        {event.year}
                      </span>
                    </div>
                    
                    {/* Card content - Fixed height removed to prevent content from being cut off */}
                    <div className={cn(
                      "bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md",
                      "mb-6 flex flex-col transition-all duration-300", /* removed fixed height */
                      "min-h-[150px]", /* minimum height instead of fixed height */
                      hoveredYear === event.year ? "transform -translate-y-2" : ""
                    )}>
                      <h3 className="text-lg md:text-xl font-bold text-civitan-blue dark:text-white mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      
      {/* Persistent swipe indicator at bottom of timeline */}
      <div className={cn(
        "absolute bottom-4 w-full flex justify-center",
        "md:transition-opacity md:duration-500",
        "md:" + (showScrollCue ? "opacity-90" : "opacity-0 pointer-events-none")
      )}>
        <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
          <span className="font-medium">Swipe</span>
          <ChevronsRight size={16} className="animate-pulse" />
          <span>for more history</span>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
