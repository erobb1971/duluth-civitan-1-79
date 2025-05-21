
import React from "react";

const EventsHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 hidden lg:block">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 sm:mb-4">
        Upcoming Events
      </h2>
      <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
      <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
        Stay involved with our community through these upcoming activities and events
      </p>
    </div>
  );
};

export default EventsHeader;
