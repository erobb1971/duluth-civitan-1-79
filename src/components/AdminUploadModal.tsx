
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Lock } from "lucide-react";
import AdminAuthForm from "./admin/AdminAuthForm";
import AdminUploadForm from "./admin/AdminUploadForm";
import AdminSettings from "./admin/AdminSettings";

interface AdminUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminUploadModal = ({ open, onOpenChange }: AdminUploadModalProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClose = () => {
    setIsAuthenticated(false);
    onOpenChange(false);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
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
          
          <AdminAuthForm 
            onAuthenticated={handleAuthenticated}
            onCancel={handleClose}
          />
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
            <AdminUploadForm onCancel={handleClose} />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUploadModal;
