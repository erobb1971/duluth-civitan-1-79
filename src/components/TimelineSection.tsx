
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, ChevronsRight, History } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
      className="section py-12 md:py-20 relative w-full overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 dark:from-gray-800 opacity-70"></div>
      <div className="container mx-auto px-3 sm:px-6">
        <div className="text-center mb-10 md:mb-14 relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-3 text-civitan-blue dark:text-civitan-gold">
            <History className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-wide">History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Our Journey Through Time
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Duluth Civitan's history since our founding in 2003
          </p>
        </div>

        {/* Founders Section with improved styling */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-block bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border-2 border-civitan-gold relative z-10 max-w-sm mx-auto transform transition-all hover:-translate-y-1 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-bold text-civitan-blue dark:text-white mb-4">Founders / Club Builders</h3>
            <ul className="text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-2">
              <li className="font-medium text-civitan-blue dark:text-civitan-gold">Terry Crouch (Founder)</li>
              <li>Cheryl Crouch</li>
              <li>Terry Swaim</li>
              <li>Chuck Hartman</li>
            </ul>
          </div>
        </div>
        
        {/* Horizontal Timeline with enhanced styling */}
        <div className="relative mt-14 mb-10" onClick={handleInteraction} onTouchStart={handleInteraction}>
          {/* Timeline connector line with gradient and shimmer effect */}
          <div className="absolute h-1 bg-gradient-to-r from-civitan-blue/30 via-civitan-gold to-civitan-blue/30 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 rounded-full shadow-sm"></div>
          <div className="absolute h-0.5 left-0 right-0 top-1/2 transform -translate-y-1/2 z-1 rounded-full bg-white/50 dark:bg-gray-600/50 animate-pulse"></div>

          {/* Mobile swipe indicator - Always visible on mobile */}
          <div className={cn(
            "flex items-center justify-center mb-6 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
            "md:hidden transition-opacity duration-300",
            "sticky z-10"
          )}>
            <span className="font-medium">Swipe</span> 
            <ChevronsRight size={16} className="animate-pulse" /> 
            <span>to explore our history</span>
          </div>
          
          {/* Desktop scroll instructions */}
          <div className={cn(
            "hidden md:flex items-center justify-center mb-6 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
            "transition-opacity duration-300",
            showScrollCue ? "opacity-100" : "opacity-0"
          )}>
            <ChevronLeft size={16} /> 
            <span>Scroll or use arrows</span> 
            <ChevronRight size={16} />
            <span>to explore our history</span>
          </div>
          
          {/* Timeline Carousel with enhanced styling */}
          <Carousel 
            opts={{ 
              align: "start",
              loop: false,
              containScroll: "trimSnaps",
              dragFree: false,
            }}
            className="w-full"
            onSelect={(index) => {
              // Fix: Ensure we're passing a number to setActiveIndex
              if (typeof index === 'number') {
                setActiveIndex(index);
                handleInteraction();
              }
            }}
          >
            {/* Navigation arrows positioned above timeline */}
            <div className="hidden sm:block mb-12">
              <CarouselPrevious className="absolute left-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold text-civitan-blue dark:text-civitan-gold" />
              <CarouselNext className="absolute right-0 top-0 transform -translate-y-14 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-civitan-gold text-civitan-blue dark:text-civitan-gold" />
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
                    {/* Enhanced timeline point */}
                    <div className={cn(
                      "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
                      "w-5 h-5 rounded-full bg-civitan-gold border-2 border-white dark:border-gray-800 shadow-md transition-all duration-300",
                      (hoveredYear === event.year || activeIndex === index) ? "scale-150" : ""
                    )}>
                      {/* Enhanced pulsing effect */}
                      <span className={cn(
                        "absolute inset-0 rounded-full",
                        "animate-pulse bg-civitan-gold/60"
                      )}></span>
                    </div>
                    
                    {/* Year indicator with enhanced styling */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="h-8"></div> {/* Spacer for timeline points */}
                      <span className={cn(
                        "inline-block bg-civitan-blue dark:bg-civitan-gold text-white dark:text-civitan-blue px-4 py-1.5 rounded-full text-sm font-bold mb-3 shadow-md transition-transform duration-300",
                        (hoveredYear === event.year || activeIndex === index) ? "transform scale-110" : ""
                      )}>
                        {event.year}
                      </span>
                    </div>
                    
                    {/* Card content with enhanced styling */}
                    <div className={cn(
                      "bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md",
                      "mb-6 flex flex-col transition-all duration-300",
                      "min-h-[170px] border border-gray-100 dark:border-gray-700",
                      (hoveredYear === event.year || activeIndex === index) ? 
                        "transform -translate-y-2 shadow-lg border-civitan-gold dark:border-civitan-gold" : ""
                    )}>
                      <h3 className="text-lg md:text-xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 line-clamp-2">
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
      
      {/* Enhanced persistent swipe indicator at bottom of timeline */}
      <div className={cn(
        "absolute bottom-4 w-full flex justify-center",
        "md:transition-opacity md:duration-500",
        "md:" + (showScrollCue ? "opacity-90" : "opacity-0 pointer-events-none")
      )}>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          <span className="font-medium">Swipe</span>
          <ChevronsRight size={16} className="animate-pulse text-civitan-gold" />
          <span>for more history</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent opacity-70"></div>
    </section>
  );
};

export default TimelineSection;
