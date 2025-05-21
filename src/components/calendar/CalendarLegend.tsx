
import React from "react";

const CalendarLegend = () => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-civitan-blue mr-1.5"></div>
        <span className="text-xs">Civitan Club</span>
      </div>
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-1.5"></div>
        <span className="text-xs">National Holidays</span>
      </div>
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1.5"></div>
        <span className="text-xs">Civitan Int'l</span>
      </div>
    </div>
  );
};

export default CalendarLegend;
