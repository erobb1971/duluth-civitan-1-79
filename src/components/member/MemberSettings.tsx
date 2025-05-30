
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User, Shield, Bell, Eye, Save, Upload } from "lucide-react";

const MemberSettings = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    bio: "Active Civitan member passionate about community service.",
    city: "Duluth",
    avatar: null
  });

  const [privacySettings, setPrivacySettings] = useState({
    showInDirectory: true,
    shareEmail: true,
    sharePhone: false,
    shareAddress: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    newsletterUpdates: true,
    volunteerOpportunities: true
  });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrivacyUpdate = (field: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
    // TODO: Implement Supabase profile update
  };

  const handleSavePrivacy = () => {
    console.log("Saving privacy settings:", privacySettings);
    // TODO: Implement Supabase privacy settings update
  };

  const handleSaveNotifications = () => {
    console.log("Saving notification settings:", notificationSettings);
    // TODO: Implement Supabase notification settings update
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Member Settings
          </CardTitle>
          <CardDescription>
            Manage your profile, privacy, and notification preferences
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileData.avatar || undefined} />
              <AvatarFallback className="text-lg">
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="mb-2">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-sm text-gray-600">
                Recommended: Square image, at least 200x200 pixels
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => handleProfileUpdate("city", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell other members about yourself..."
              value={profileData.bio}
              onChange={(e) => handleProfileUpdate("bio", e.target.value)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleSaveProfile}>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control what information is visible to other members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Show in Member Directory</h4>
              <p className="text-sm text-gray-600">
                Allow other members to see your profile in the directory
              </p>
            </div>
            <Switch
              checked={privacySettings.showInDirectory}
              onCheckedChange={(checked) => handlePrivacyUpdate("showInDirectory", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Share Email Address</h4>
              <p className="text-sm text-gray-600">
                Allow other members to see your email address
              </p>
            </div>
            <Switch
              checked={privacySettings.shareEmail}
              onCheckedChange={(checked) => handlePrivacyUpdate("shareEmail", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Share Phone Number</h4>
              <p className="text-sm text-gray-600">
                Allow other members to see your phone number
              </p>
            </div>
            <Switch
              checked={privacySettings.sharePhone}
              onCheckedChange={(checked) => handlePrivacyUpdate("sharePhone", checked)}
            />
          </div>

          <Button onClick={handleSavePrivacy}>
            <Save className="h-4 w-4 mr-2" />
            Save Privacy Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive general notifications via email
              </p>
            </div>
            <Switch
              checked={notificationSettings.emailNotifications}
              onCheckedChange={(checked) => handleNotificationUpdate("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Event Reminders</h4>
              <p className="text-sm text-gray-600">
                Get reminders about upcoming events and meetings
              </p>
            </div>
            <Switch
              checked={notificationSettings.eventReminders}
              onCheckedChange={(checked) => handleNotificationUpdate("eventReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Newsletter Updates</h4>
              <p className="text-sm text-gray-600">
                Receive club newsletters and important announcements
              </p>
            </div>
            <Switch
              checked={notificationSettings.newsletterUpdates}
              onCheckedChange={(checked) => handleNotificationUpdate("newsletterUpdates", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Volunteer Opportunities</h4>
              <p className="text-sm text-gray-600">
                Get notified about new volunteer opportunities
              </p>
            </div>
            <Switch
              checked={notificationSettings.volunteerOpportunities}
              onCheckedChange={(checked) => handleNotificationUpdate("volunteerOpportunities", checked)}
            />
          </div>

          <Button onClick={handleSaveNotifications}>
            <Save className="h-4 w-4 mr-2" />
            Save Notification Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline">
              Change Password
            </Button>
            <Button variant="outline">
              Enable Two-Factor Authentication
            </Button>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Security features will be fully implemented once Supabase authentication is connected.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberSettings;
