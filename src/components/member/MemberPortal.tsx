
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, Calendar, FileText, Users, Settings, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MemberDashboard from "./MemberDashboard";
import MemberCalendar from "./MemberCalendar";
import MemberDocuments from "./MemberDocuments";
import MemberDirectory from "./MemberDirectory";
import MemberSettings from "./MemberSettings";

interface MemberPortalProps {
  onLogout: () => void;
}

const MemberPortal = ({ onLogout }: MemberPortalProps) => {
  const { member } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!member) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading member information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-civitan-blue">
            Welcome, {member.first_name} {member.last_name}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-600">Member #{member.member_number}</p>
            {member.is_admin && (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                <Shield className="h-3 w-3" />
                Admin
              </div>
            )}
          </div>
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
