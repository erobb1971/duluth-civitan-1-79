
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, Users, Award, Clock, MapPin, AlertCircle } from "lucide-react";

const MemberDashboard = () => {
  // Mock data - will be replaced with Supabase queries
  const memberInfo = {
    name: "John Doe",
    membershipType: "Active Member",
    joinDate: "2020-01-15",
    role: "Member",
    attendanceRate: 85,
    volunteerHours: 24
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Meeting",
      date: "2024-02-15",
      time: "7:00 PM",
      location: "Community Center",
      type: "meeting"
    },
    {
      id: 2,
      title: "Community Service Day",
      date: "2024-02-20",
      time: "9:00 AM",
      location: "Downtown Park",
      type: "volunteer"
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "New Volunteer Opportunity",
      content: "Help with the upcoming food drive this weekend.",
      date: "2024-02-10",
      priority: "high"
    },
    {
      id: 2,
      title: "Meeting Minutes Available",
      content: "January meeting minutes have been uploaded.",
      date: "2024-02-08",
      priority: "normal"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Member Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Member Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{memberInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant="secondary">{memberInfo.membershipType}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-semibold">{new Date(memberInfo.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold">{memberInfo.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-civitan-blue">
              {memberInfo.attendanceRate}%
            </div>
            <p className="text-sm text-gray-600">Last 12 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Volunteer Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-civitan-gold">
              {memberInfo.volunteerHours}
            </div>
            <p className="text-sm text-gray-600">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
          <CardDescription>
            Events you're registered for or might be interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Badge variant={event.type === "meeting" ? "default" : "secondary"}>
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      {announcement.priority === "high" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              <span className="text-sm">View Calendar</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Meeting Minutes</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Member Directory</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Award className="h-6 w-6" />
              <span className="text-sm">Volunteer Ops</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDashboard;
