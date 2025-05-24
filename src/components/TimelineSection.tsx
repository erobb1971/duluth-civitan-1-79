
import React, { useState, useEffect } from "react";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundOverlay } from "@/components/contact";
import { 
  TimelineCarousel, 
  SwipeIndicator, 
  ScrollInstructions,
  FoundersSection,
  timelineEvents
} from "@/components/timeline";

const TimelineSection = () => {
  const [showScrollCue, setShowScrollCue] = useState(true);
  
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
      className="section py-12 md:py-20 relative w-full overflow-hidden"
      aria-label="Duluth Civitan History Timeline"
    >
      {/* Historical train image overlay with parallax - optimized with descriptive alt text */}
      <BackgroundOverlay 
        image="/lovable-uploads/9af4fff5-7215-4b66-9430-1dc86a7d9a58.png" 
        opacity={0.5} 
        gradient={false} 
        altText="Historical Duluth train depot - symbolic of Duluth GA heritage"
      />
      
      {/* Left-to-right gradient overlay - left side shows more background, right side fades it */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-100/70 to-white dark:from-gray-800/50 dark:via-gray-800/70 dark:to-gray-900 opacity-85 z-0"></div>
      
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 dark:from-gray-800 opacity-70 z-0"></div>
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center gap-2 mb-3 text-civitan-blue dark:text-civitan-gold">
            <History className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-wide">History in Gwinnett County</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Our Journey Through Time in Duluth
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Duluth Civitan's history since our founding in 2003, serving the Gwinnett County community
          </p>
        </div>

        {/* Founders Section */}
        <FoundersSection />
        
        {/* Horizontal Timeline with enhanced styling */}
        <div className="relative mt-14 mb-10" onClick={handleInteraction} onTouchStart={handleInteraction}>
          {/* Timeline connector line with gradient and shimmer effect */}
          <div className="absolute h-1 bg-gradient-to-r from-civitan-blue/30 via-civitan-gold to-civitan-blue/30 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0 rounded-full shadow-sm"></div>
          <div className="absolute h-0.5 left-0 right-0 top-1/2 transform -translate-y-1/2 z-1 rounded-full bg-white/50 dark:bg-gray-600/50 animate-pulse"></div>

          {/* Diagonal gradient overlay - left visible to right transparent */}
          <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-br from-white/60 via-white/30 to-transparent dark:from-gray-900/60 dark:via-gray-900/30 dark:to-transparent"></div>

          {/* Mobile swipe indicator */}
          <SwipeIndicator showCue={showScrollCue} isMobile={true} />
          
          {/* Desktop scroll instructions */}
          <ScrollInstructions showCue={showScrollCue} />
          
          {/* Timeline Carousel with enhanced styling */}
          <div className="relative z-10">
            <TimelineCarousel events={timelineEvents} onInteraction={handleInteraction} />
          </div>
        </div>
      </div>
      
      {/* Enhanced persistent swipe indicator at bottom of timeline */}
      <SwipeIndicator showCue={showScrollCue} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent opacity-70 z-0"></div>
    </section>
  );
};

export default TimelineSection;
