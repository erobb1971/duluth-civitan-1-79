
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Map, Mail, Info } from "lucide-react";

const MeetingScheduleCard: React.FC = () => {
  return (
    <Card className="civitan-shadow h-full">
      <CardHeader className="bg-civitan-blue text-white p-4 sm:p-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          <CardTitle className="text-lg sm:text-xl">Regular Meeting Schedule</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium">2nd Monday of each month at 11:45 AM</p>
            <div className="flex items-start mt-2">
              <Map className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Chamber's 1818 Club</p>
            </div>
          </div>

          <div>
            <p className="font-medium">4th Monday of each month at 12:00 PM (Noon)</p>
            <div className="flex items-start mt-2">
              <Map className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Rotating community locations</p>
            </div>
            <div className="flex items-start mt-2">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">Please contact us for more details if you would like to attend</p>
            </div>
            <div className="mt-3">
              <Button 
                className="bg-civitan-blue hover:bg-blue-900 text-white text-xs sm:text-sm"
                onClick={() => {
                  window.location.href = "mailto:info@duluthcivitanclub.org?subject=Meeting Location Inquiry";
                }}
              >
                <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Contact for Details
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600 italic border-t pt-4 mt-4">
            Note: If a scheduled meeting falls on a holiday, there will be no meeting on that date.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingScheduleCard;
