
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, AlertTriangle } from "lucide-react";
import { galleryCategories } from "@/utils/galleryData";
import { toast } from "@/hooks/use-toast";

interface AdminUploadFormProps {
  onCancel: () => void;
}

// Input sanitization function
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// File validation function
const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size exceeds 10MB limit.' };
  }
  
  return { isValid: true };
};

const AdminUploadForm = ({ onCancel }: AdminUploadFormProps) => {
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    dateTaken: "",
    category: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setUploadData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Validate each file
      for (let i = 0; i < files.length; i++) {
        const validation = validateFile(files[i]);
        if (!validation.isValid) {
          toast({
            title: "File Validation Error",
            description: `${files[i].name}: ${validation.error}`,
            variant: "destructive",
          });
          return;
        }
      }
      setSelectedFiles(files);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security notice - upload functionality disabled
    toast({
      title: "Upload Disabled",
      description: "For security reasons, file upload functionality requires proper backend authentication and file validation.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="font-medium text-yellow-800">Security Notice</p>
          <p className="text-sm text-yellow-700">
            File upload functionality has been disabled for security reasons. 
            A secure backend with proper authentication and file validation is required.
          </p>
        </div>
      </div>

      <form onSubmit={handleUpload} className="space-y-6">
        {/* File Upload */}
        <div>
          <Label htmlFor="file-upload">Select Images</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md opacity-50">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-not-allowed bg-white rounded-md font-medium text-gray-400"
                >
                  <span>Upload disabled for security</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Requires secure backend implementation</p>
            </div>
          </div>
        </div>

        {/* Metadata Form with input sanitization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={uploadData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Monthly Meeting"
              className="mt-1"
              maxLength={100}
              disabled
            />
          </div>

          <div>
            <Label htmlFor="dateTaken">Date (MM/YY)</Label>
            <Input
              id="dateTaken"
              value={uploadData.dateTaken}
              onChange={(e) => handleInputChange('dateTaken', e.target.value)}
              placeholder="e.g., 05/25"
              pattern="\d{2}/\d{2}"
              className="mt-1"
              maxLength={5}
              disabled
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={uploadData.category} 
            onValueChange={(value) => handleInputChange('category', value)}
            disabled
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
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Brief description of the event or photos..."
            className="mt-1"
            rows={3}
            maxLength={500}
            disabled
          />
        </div>

        <div className="flex gap-2">
          <Button 
            type="submit" 
            className="flex-1"
            disabled
          >
            Upload Disabled
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminUploadForm;
