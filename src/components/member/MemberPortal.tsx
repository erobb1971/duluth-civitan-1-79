
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, Calendar, FileText, Users, Bell, Settings, Shield } from "lucide-react";
import MemberDashboard from "./MemberDashboard";
import MemberCalendar from "./MemberCalendar";
import MemberDocuments from "./MemberDocuments";
import MemberDirectory from "./MemberDirectory";
import MemberSettings from "./MemberSettings";

interface MemberPortalProps {
  onLogout: () => void;
}

const MemberPortal = ({ onLogout }: MemberPortalProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-civitan-blue">Member Portal</h2>
          <p className="text-gray-600">Welcome back to your member dashboard</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Directory
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <MemberDashboard />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <MemberCalendar />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <MemberDocuments />
        </TabsContent>

        <TabsContent value="directory" className="space-y-6">
          <MemberDirectory />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <MemberSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberPortal;
