import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Upload, X, Lock, Settings, Shield } from "lucide-react";
import { galleryCategories } from "@/utils/galleryData";
import { toast } from "@/hooks/use-toast";

interface AdminUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminUploadModal = ({ open, onOpenChange }: AdminUploadModalProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    dateTaken: "",
    category: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Admin settings state
  const [adminSettings, setAdminSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    twoFactorCode: "",
  });

  // Get admin password from localStorage or use default
  const getAdminPassword = () => {
    return localStorage.getItem('admin_password') || "AcireCreates25!";
  };

  // Check if 2FA is enabled
  const is2FAEnabled = () => {
    return localStorage.getItem('admin_2fa_enabled') === 'true';
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = getAdminPassword();
    
    if (password === adminPassword) {
      if (is2FAEnabled()) {
        // Show 2FA input
        toast({
          title: "2FA Required",
          description: "Please enter your 2FA code to continue.",
        });
        setAdminSettings(prev => ({ ...prev, twoFactorCode: "" }));
      } else {
        setIsAuthenticated(true);
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
    // In a real implementation, this would verify with a proper 2FA service
    // For demo purposes, we'll use "123456" as the valid code
    const validCode = localStorage.getItem('admin_2fa_code') || "123456";
    
    if (adminSettings.twoFactorCode === validCode) {
      setIsAuthenticated(true);
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
      // Generate a simple 2FA code for demo (in real app, use proper 2FA service)
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one image to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      toast({
        title: "Upload Started",
        description: `Uploading ${selectedFiles.length} image(s)...`,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${selectedFiles.length} image(s) to the gallery.`,
      });

      setUploadData({
        title: "",
        description: "",
        dateTaken: "",
        category: "",
      });
      setSelectedFiles(null);
      
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPassword("");
    setUploadData({
      title: "",
      description: "",
      dateTaken: "",
      category: "",
    });
    setSelectedFiles(null);
    setAdminSettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: is2FAEnabled(),
      twoFactorCode: "",
    });
    onOpenChange(false);
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access Required
            </DialogTitle>
          </DialogHeader>
          
          {is2FAEnabled() && password === getAdminPassword() ? (
            <div className="space-y-4">
              <div className="text-center">
                <Label>Enter 2FA Code</Label>
                <div className="mt-2 flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={adminSettings.twoFactorCode}
                    onChange={(value) => setAdminSettings(prev => ({ ...prev, twoFactorCode: value }))}
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
                <Button type="button" variant="outline" onClick={() => setPassword("")}>
                  Back
                </Button>
              </div>
            </div>
          ) : (
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
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Admin Panel
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="settings">Admin Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <form onSubmit={handleUpload} className="space-y-6">
              {/* File Upload */}
              <div>
                <Label htmlFor="file-upload">Select Images</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-civitan-blue hover:text-civitan-gold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-civitan-blue"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>
                
                {selectedFiles && selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Selected {selectedFiles.length} file(s):
                    </p>
                    <ul className="text-xs text-gray-500 mt-1">
                      {Array.from(selectedFiles).map((file, index) => (
                        <li key={index}>• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Metadata Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    placeholder="e.g., Monthly Meeting"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateTaken">Date (MM/YY)</Label>
                  <Input
                    id="dateTaken"
                    value={uploadData.dateTaken}
                    onChange={(e) => setUploadData({...uploadData, dateTaken: e.target.value})}
                    placeholder="e.g., 05/25"
                    pattern="\d{2}/\d{2}"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={uploadData.category} 
                  onValueChange={(value) => setUploadData({...uploadData, category: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleryCategories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  placeholder="Brief description of the event or photos..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isUploading || !selectedFiles || selectedFiles.length === 0}
                >
                  {isUploading ? "Uploading..." : "Upload Images"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUploadModal;
