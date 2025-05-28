
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ImageIcon, Settings, Mail, DollarSign } from "lucide-react";
import { galleryImages } from "@/utils/galleryData";
import { getUpcomingEvents } from "@/utils/events";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const upcomingEvents = getUpcomingEvents();

  const stats = [
    {
      title: "Total Gallery Images",
      value: galleryImages.length,
      icon: ImageIcon,
      color: "text-blue-600"
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Site Visitors",
      value: "Analytics TBD",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Donations",
      value: "Coming Soon",
      icon: DollarSign,
      color: "text-yellow-600"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "events", label: "Events", icon: Calendar },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "donations", label: "Donations", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-civitan-blue">Duluth Civitan Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your club's website content and settings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-civitan-blue text-white"
                  : "text-gray-600 hover:text-civitan-blue"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-civitan-blue hover:bg-blue-900">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Gallery Images
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Add New Event
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Newsletter
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Gallery image uploaded</span>
                      <Badge variant="secondary">Recent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Event calendar updated</span>
                      <Badge variant="outline">1 day ago</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Member inquiry received</span>
                      <Badge variant="outline">2 days ago</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage upcoming events and meeting schedules</p>
              <div className="space-y-4">
                <Button className="bg-civitan-blue hover:bg-blue-900">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add New Event
                </Button>
                <div className="text-sm text-gray-600">
                  <p>Currently showing {upcomingEvents.length} upcoming events</p>
                  <p className="mt-2">Features coming soon:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Edit existing events</li>
                    <li>Bulk event management</li>
                    <li>Event attendance tracking</li>
                    <li>Automated email reminders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <Card>
            <CardHeader>
              <CardTitle>Gallery Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Upload and organize gallery images</p>
              <div className="space-y-4">
                <Button className="bg-civitan-blue hover:bg-blue-900">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
                <div className="text-sm text-gray-600">
                  <p>Currently {galleryImages.length} images in gallery</p>
                  <p className="mt-2">Features available:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Upload multiple images</li>
                    <li>Categorize images</li>
                    <li>Add descriptions and dates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Donations Tab */}
        {activeTab === "donations" && (
          <Card>
            <CardHeader>
              <CardTitle>Donation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Set up cost-free donation options</p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-civitan-blue mb-2">PayPal Integration</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Set up PayPal donation buttons with no monthly fees - only transaction fees apply.
                  </p>
                  <Button variant="outline">
                    Configure PayPal
                  </Button>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-2">Venmo/Cash App</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Add QR codes and links for direct mobile payments.
                  </p>
                  <Button variant="outline">
                    Set Up Mobile Payments
                  </Button>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-2">Bank Transfer Info</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Display bank account information for direct transfers.
                  </p>
                  <Button variant="outline">
                    Configure Bank Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
