
import React from "react";

const MeetingScheduleInfo = () => {
  return (
    <div className="w-full mt-4 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
      <div className="font-medium mb-1">🗓️ Regular Meeting Schedule:</div>
      <p>2nd Monday: 11:45 AM at Chamber's 1818 Club</p>
      <p>4th Monday: 12:00 PM at rotating locations</p>
      <div className="text-xs text-gray-500 mt-1 italic">Note: No meetings on holidays</div>
    </div>
  );
};

export default MeetingScheduleInfo;
