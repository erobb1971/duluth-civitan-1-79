
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, X, Search, Filter, Upload } from "lucide-react";
import { GalleryImage, galleryCategories, getFilteredImages, getUniqueDates } from "@/utils/galleryData";
import AdminUploadModal from "./AdminUploadModal";
import { cn } from "@/lib/utils";

interface GalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialImageId?: string;
}

const GalleryModal = ({ open, onOpenChange, initialImageId }: GalleryModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("all-dates");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Update the filtering function to handle the new "all-dates" value
  const filteredImages = getFilteredImages(
    selectedCategory, 
    selectedDate === "all-dates" ? "" : selectedDate, 
    searchTerm
  );
  const uniqueDates = getUniqueDates();

  useEffect(() => {
    if (initialImageId && filteredImages.length > 0) {
      const index = filteredImages.findIndex(img => img.id === initialImageId);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [initialImageId, filteredImages]);

  // Reset currentImageIndex when filteredImages changes and current index is out of bounds
  useEffect(() => {
    if (filteredImages.length > 0 && currentImageIndex >= filteredImages.length) {
      setCurrentImageIndex(0);
    }
  }, [filteredImages, currentImageIndex]);

  const handlePrevious = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!open) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        setIsFullScreen(false);
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [open]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDate("all-dates");
    setSearchTerm("");
  };

  // Secret admin access - click logo 5 times
  const [clickCount, setClickCount] = useState(0);
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setAdminModalOpen(true);
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 3000);
  };

  // Early return for empty state
  if (filteredImages.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">No images found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search term.</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Safe access to currentImage - ensure we have a valid index
  const currentImage = filteredImages[Math.min(currentImageIndex, filteredImages.length - 1)];

  // Additional safety check - if currentImage is still undefined, show error state
  if (!currentImage) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Error loading image</h3>
            <p className="text-gray-600 mb-4">There was a problem loading the selected image.</p>
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Close Gallery
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className={cn(
            "p-0 gap-0 overflow-hidden",
            isFullScreen 
              ? "max-w-full max-h-full w-screen h-screen" 
              : "max-w-6xl max-h-[90vh] w-[95vw]"
          )}
        >
          {!isFullScreen && (
            <DialogHeader className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle 
                  className="cursor-pointer select-none"
                  onClick={handleLogoClick}
                >
                  Duluth Civitan Gallery
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAdminModalOpen(true)}
                    className="opacity-20 hover:opacity-100"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
          )}

          {showFilters && !isFullScreen && (
            <div className="p-4 border-b bg-gray-50 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleryCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-dates">All dates</SelectItem>
                    {uniqueDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {date}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''} found
                </span>
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          <div className="relative flex-1 bg-black">
            <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-[500px]">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={() => setIsFullScreen(!isFullScreen)}
              />
              
              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12"
                onClick={handlePrevious}
                disabled={filteredImages.length <= 1}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white h-12 w-12"
                onClick={handleNext}
                disabled={filteredImages.length <= 1}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded">
                {currentImageIndex + 1} of {filteredImages.length}
              </div>

              {isFullScreen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => setIsFullScreen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              )}
            </div>
          </div>

          {!isFullScreen && (
            <div className="p-4 border-t bg-white">
              <h3 className="font-semibold text-lg mb-2">{currentImage.title}</h3>
              {currentImage.description && (
                <p className="text-gray-600 mb-2">{currentImage.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{currentImage.dateTaken}</span>
                <span>•</span>
                <span>{currentImage.category}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AdminUploadModal
        open={adminModalOpen}
        onOpenChange={setAdminModalOpen}
      />
    </>
  );
};

export default GalleryModal;
