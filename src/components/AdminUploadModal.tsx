
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Lock } from "lucide-react";
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

  const adminPassword = "duluthcivitan2025"; // In production, this would be more secure

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin upload panel.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive",
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
      // In a real implementation, this would upload to your server/storage
      // For now, we'll simulate the upload process
      
      toast({
        title: "Upload Started",
        description: `Uploading ${selectedFiles.length} image(s)...`,
      });

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically:
      // 1. Upload files to your storage service
      // 2. Add metadata to your database
      // 3. Update the gallery data
      
      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${selectedFiles.length} image(s) to the gallery.`,
      });

      // Reset form
      setUploadData({
        title: "",
        description: "",
        dateTaken: "",
        category: "",
      });
      setSelectedFiles(null);
      
      // Reset file input
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
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Images to Gallery
          </DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default AdminUploadModal;
