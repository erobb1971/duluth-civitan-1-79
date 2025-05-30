
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminAuthFormProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

const AdminAuthForm = ({ onAuthenticated, onCancel }: AdminAuthFormProps) => {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security notice - admin functionality disabled
    toast({
      title: "Admin Access Disabled",
      description: "For security reasons, admin functionality requires proper backend authentication. Please contact the system administrator.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="font-medium text-yellow-800">Security Notice</p>
          <p className="text-sm text-yellow-700">
            Admin functionality has been disabled for security reasons. 
            A proper backend authentication system is required.
          </p>
        </div>
      </div>
      
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">Admin Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin access disabled"
            className="mt-1"
            disabled
          />
        </div>
        
        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled>
            <Lock className="h-4 w-4 mr-2" />
            Access Disabled
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAuthForm;
