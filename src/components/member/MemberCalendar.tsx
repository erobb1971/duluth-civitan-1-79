
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays, Clock, MapPin, Users, Plus } from "lucide-react";

const MemberCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock events data - will be replaced with Supabase queries
  const events = [
    {
      id: 1,
      title: "Monthly Club Meeting",
      date: "2024-02-15",
      time: "7:00 PM - 9:00 PM",
      location: "Community Center, Room 101",
      type: "meeting",
      isRegistered: true,
      attendees: 15,
      maxAttendees: 25
    },
    {
      id: 2,
      title: "Community Service: Food Drive",
      date: "2024-02-20",
      time: "9:00 AM - 1:00 PM",
      location: "Downtown Food Bank",
      type: "volunteer",
      isRegistered: false,
      attendees: 8,
      maxAttendees: 12
    },
    {
      id: 3,
      title: "Board Meeting",
      date: "2024-02-22",
      time: "6:30 PM - 8:00 PM",
      location: "Virtual Meeting",
      type: "board",
      isRegistered: false,
      attendees: 7,
      maxAttendees: 10,
      restricted: true
    }
  ];

  const handleRegister = (eventId: number) => {
    console.log("Registering for event:", eventId);
    // TODO: Implement Supabase event registration
  };

  const handleUnregister = (eventId: number) => {
    console.log("Unregistering from event:", eventId);
    // TODO: Implement Supabase event unregistration
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Member Calendar
          </CardTitle>
          <CardDescription>
            View and register for club events, meetings, and volunteer opportunities
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget Placeholder */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Interactive calendar</p>
                <p className="text-xs">will be implemented with Supabase</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge 
                          variant={
                            event.type === "meeting" ? "default" : 
                            event.type === "volunteer" ? "secondary" : 
                            "outline"
                          }
                        >
                          {event.type}
                        </Badge>
                        {event.restricted && (
                          <Badge variant="destructive">Restricted</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees}/{event.maxAttendees} registered</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {event.restricted ? (
                        <Button variant="outline" disabled>
                          Members Only
                        </Button>
                      ) : event.isRegistered ? (
                        <Button 
                          variant="outline" 
                          onClick={() => handleUnregister(event.id)}
                        >
                          Unregister
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleRegister(event.id)}
                          disabled={event.attendees >= event.maxAttendees}
                        >
                          {event.attendees >= event.maxAttendees ? "Full" : "Register"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Registration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Registered Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.filter(event => event.isRegistered).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{event.title}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <Badge variant="secondary">Registered</Badge>
              </div>
            ))}
            {events.filter(event => event.isRegistered).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No registered events. Browse events above to register.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberCalendar;
