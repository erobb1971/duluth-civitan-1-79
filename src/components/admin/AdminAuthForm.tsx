
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminAuthFormProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

const AdminAuthForm = ({ onAuthenticated, onCancel }: AdminAuthFormProps) => {
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const getAdminPassword = () => {
    return localStorage.getItem('admin_password') || "admin1234";
  };

  const is2FAEnabled = () => {
    return localStorage.getItem('admin_2fa_enabled') === 'true';
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = getAdminPassword();
    
    if (password === adminPassword) {
      if (is2FAEnabled()) {
        setShowTwoFactor(true);
        toast({
          title: "2FA Required",
          description: "Please enter your 2FA code to continue.",
        });
      } else {
        onAuthenticated();
        toast({
          title: "Access Granted",
          description: "Welcome to the admin upload panel.",
        });
      }
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handle2FASubmit = () => {
    const validCode = localStorage.getItem('admin_2fa_code') || "123456";
    
    if (twoFactorCode === validCode) {
      onAuthenticated();
      toast({
        title: "2FA Verified",
        description: "Welcome to the admin upload panel.",
      });
    } else {
      toast({
        title: "Invalid 2FA Code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setShowTwoFactor(false);
    setPassword("");
    setTwoFactorCode("");
  };

  if (showTwoFactor) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <Label>Enter 2FA Code</Label>
          <div className="mt-2 flex justify-center">
            <InputOTP
              maxLength={6}
              value={twoFactorCode}
              onChange={setTwoFactorCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handle2FASubmit} className="flex-1">
            Verify
          </Button>
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div>
        <Label htmlFor="password">Admin Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="mt-1"
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Authenticate
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminAuthForm;
