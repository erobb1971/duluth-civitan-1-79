
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const [adminSettings, setAdminSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: localStorage.getItem('admin_2fa_enabled') === 'true',
  });

  const getAdminPassword = () => {
    return localStorage.getItem('admin_password') || "AcireCreates25!";
  };

  const handlePasswordChange = () => {
    if (adminSettings.currentPassword !== getAdminPassword()) {
      toast({
        title: "Error",
        description: "Current password is incorrect.",
        variant: "destructive",
      });
      return;
    }

    if (adminSettings.newPassword !== adminSettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (adminSettings.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('admin_password', adminSettings.newPassword);
    setAdminSettings({
      ...adminSettings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast({
      title: "Password Updated",
      description: "Your admin password has been successfully changed.",
    });
  };

  const toggle2FA = () => {
    const newState = !adminSettings.twoFactorEnabled;
    setAdminSettings(prev => ({ ...prev, twoFactorEnabled: newState }));
    
    if (newState) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('admin_2fa_code', code);
      localStorage.setItem('admin_2fa_enabled', 'true');
      
      toast({
        title: "2FA Enabled",
        description: `Your 2FA code is: ${code} (save this securely)`,
      });
    } else {
      localStorage.removeItem('admin_2fa_enabled');
      localStorage.removeItem('admin_2fa_code');
      
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={adminSettings.currentPassword}
              onChange={(e) => setAdminSettings({...adminSettings, currentPassword: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={adminSettings.newPassword}
              onChange={(e) => setAdminSettings({...adminSettings, newPassword: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={adminSettings.confirmPassword}
              onChange={(e) => setAdminSettings({...adminSettings, confirmPassword: e.target.value})}
              className="mt-1"
            />
          </div>
          <Button onClick={handlePasswordChange}>
            Update Password
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your admin account
              </p>
            </div>
            <Button
              onClick={toggle2FA}
              variant={adminSettings.twoFactorEnabled ? "destructive" : "default"}
            >
              {adminSettings.twoFactorEnabled ? "Disable" : "Enable"} 2FA
            </Button>
          </div>
          
          {adminSettings.twoFactorEnabled && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Save your 2FA code securely. You'll need it every time you log in.
                Current code: {localStorage.getItem('admin_2fa_code')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
