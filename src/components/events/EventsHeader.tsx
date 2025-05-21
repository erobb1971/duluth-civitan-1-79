
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const EventsHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative text-center mb-8 sm:mb-12 overflow-hidden">
      {/* Background image with fade-out effect - hidden on small mobile screens */}
      {!isMobile && (
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover" 
          style={{
            backgroundImage: "url('https://civitan.org/wp-content/uploads/2024/10/Newsletter-Header-Photos-2021-5.png')",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))"
          }}
        ></div>
      )}
      
      {/* Content with slightly darkened overlay for text visibility */}
      <div className="relative z-10 py-8 bg-gradient-to-b from-white/70 to-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 sm:mb-4">
          Upcoming Events
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
        <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
          Stay involved with our community through these upcoming activities and events
        </p>
      </div>
    </div>
  );
};

export default EventsHeader;
