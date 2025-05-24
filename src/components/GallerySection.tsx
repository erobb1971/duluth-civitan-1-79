
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronsRight, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { galleryImages } from "@/utils/galleryData";
import GalleryModal from "./GalleryModal";

const GallerySection = () => {
  const isMobile = useIsMobile();
  const [showSwipeHint, setShowSwipeHint] = React.useState(true);
  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);
  const [selectedImageId, setSelectedImageId] = React.useState<string>();

  // Hide swipe hint after 5 seconds on mobile
  React.useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleImageClick = (imageId: string) => {
    setSelectedImageId(imageId);
    setGalleryModalOpen(true);
  };

  const handleViewGallery = () => {
    setSelectedImageId(undefined);
    setGalleryModalOpen(true);
  };

  return (
    <>
      <section 
        id="gallery" 
        className="py-4 sm:py-8 bg-white dark:bg-gray-900 overflow-hidden"
      >
        <div className="container mx-auto px-3 sm:px-6">
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3">
              Our Community Impact in Gwinnett County
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2 mb-4">
              See how we're making a difference in the Duluth and greater Gwinnett County community
            </p>
            
            <Button 
              onClick={handleViewGallery}
              className="bg-civitan-blue hover:bg-civitan-blue/90 text-white font-medium px-6 py-2"
            >
              <Images className="mr-2 h-4 w-4" />
              View Full Gallery
            </Button>
          </div>
          
          {/* Mobile swipe indicator */}
          {isMobile && (
            <div className={cn(
              "flex items-center justify-center mb-4 text-sm text-civitan-blue dark:text-civitan-gold gap-1",
              "transition-opacity duration-300",
              showSwipeHint ? "opacity-100" : "opacity-0"
            )}>
              <span className="font-medium">Swipe</span> 
              <ChevronsRight size={16} className="animate-pulse" /> 
              <span>to browse photos</span>
            </div>
          )}
          
          <div className="relative px-1 sm:px-4 my-2 sm:my-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-1 xs:basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1 h-full">
                      <div 
                        className="overflow-hidden rounded-md h-full aspect-square civitan-shadow cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => handleImageClick(image.id)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          width={250}
                          height={250}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 sm:left-2 lg:left-4 hidden sm:flex" />
              <CarouselNext className="right-0 sm:right-2 lg:right-4 hidden sm:flex" />
            </Carousel>
          </div>
        </div>
        
        {/* SEO-friendly hidden text */}
        <div className="sr-only">
          <h3>Duluth Civitan Club in Gwinnett County</h3>
          <p>
            The Duluth Civitan Club has been serving Gwinnett County, Georgia since 2003, 
            focusing on supporting individuals with developmental disabilities through
            various community programs and events. Our members are active throughout
            Duluth and the greater Gwinnett area, making a positive impact on our local community.
          </p>
        </div>
      </section>

      <GalleryModal
        open={galleryModalOpen}
        onOpenChange={setGalleryModalOpen}
        initialImageId={selectedImageId}
      />
    </>
  );
};

export default GallerySection;
