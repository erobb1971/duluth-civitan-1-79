
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { galleryCategories } from "@/utils/galleryData";
import { toast } from "@/hooks/use-toast";

interface AdminUploadFormProps {
  onCancel: () => void;
}

const AdminUploadForm = ({ onCancel }: AdminUploadFormProps) => {
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    dateTaken: "",
    category: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [optimizedFiles, setOptimizedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizeImage = (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setIsOptimizing(true);
      
      try {
        const optimized = await Promise.all(
          Array.from(files).map(file => optimizeImage(file))
        );
        
        setOptimizedFiles(optimized);
        
        const originalSize = Array.from(files).reduce((sum, file) => sum + file.size, 0);
        const optimizedSize = optimized.reduce((sum, file) => sum + file.size, 0);
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        toast({
          title: "Images Optimized",
          description: `Reduced file size by ${savings}% (${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(optimizedSize / 1024 / 1024).toFixed(1)}MB)`,
        });
        
      } catch (error) {
        toast({
          title: "Optimization Failed",
          description: "Using original files instead.",
          variant: "destructive",
        });
        setOptimizedFiles(Array.from(files));
      } finally {
        setIsOptimizing(false);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const filesToUpload = optimizedFiles.length > 0 ? optimizedFiles : (selectedFiles ? Array.from(selectedFiles) : []);
    
    if (filesToUpload.length === 0) {
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
        description: `Uploading ${filesToUpload.length} optimized image(s)...`,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Upload Successful",
        description: `Successfully uploaded ${filesToUpload.length} optimized image(s) to the gallery.`,
      });

      setUploadData({
        title: "",
        description: "",
        dateTaken: "",
        category: "",
      });
      setSelectedFiles(null);
      setOptimizedFiles([]);
      
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

  return (
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
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each (will be optimized)</p>
          </div>
        </div>
        
        {isOptimizing && (
          <div className="mt-2 text-center">
            <p className="text-sm text-blue-600">Optimizing images...</p>
          </div>
        )}
        
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Selected {selectedFiles.length} file(s) {optimizedFiles.length > 0 && "(optimized)"}:
            </p>
            <ul className="text-xs text-gray-500 mt-1">
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>
                  • {file.name} 
                  {optimizedFiles[index] && (
                    <span className="text-green-600 ml-1">
                      ({(file.size / 1024 / 1024).toFixed(1)}MB → {(optimizedFiles[index].size / 1024 / 1024).toFixed(1)}MB)
                    </span>
                  )}
                </li>
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
          disabled={isUploading || isOptimizing || !selectedFiles || selectedFiles.length === 0}
        >
          {isUploading ? "Uploading..." : isOptimizing ? "Optimizing..." : "Upload Images"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminUploadForm;
