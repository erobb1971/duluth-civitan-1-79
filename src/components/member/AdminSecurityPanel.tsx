
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SecurityTestDashboard from "../admin/SecurityTestDashboard";

const AdminSecurityPanel = () => {
  const { member } = useAuth();

  if (!member?.is_admin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <p>Admin access required to view security testing tools.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Shield className="h-5 w-5" />
            Admin Security Panel
          </CardTitle>
          <CardDescription>
            Advanced security testing and database management tools for administrators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Administrator Notice</p>
                <p className="text-amber-700 mt-1">
                  This panel provides access to security testing tools and sensitive data management features. 
                  Use these tools carefully and ensure you understand the implications of any changes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SecurityTestDashboard />
    </div>
  );
};

export default AdminSecurityPanel;
