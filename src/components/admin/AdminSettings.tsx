
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Shield, AlertTriangle } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="font-medium text-yellow-800">Security Notice</p>
          <p className="text-sm text-yellow-700">
            Admin settings have been disabled for security reasons. 
            A proper backend authentication system is required.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Password Management
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="text-gray-600">
              Password management requires secure backend implementation with proper encryption,
              session management, and audit logging.
            </p>
          </div>
          <Button disabled>
            Update Password (Disabled)
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border rounded-lg">
            <p className="text-gray-600">
              Two-factor authentication requires secure backend services for token generation,
              validation, and secure storage of recovery codes.
            </p>
          </div>
          <Button disabled>
            Configure 2FA (Disabled)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
