
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const galleryImages = [
  {
    src: "/lovable-uploads/63c708c7-1b5a-43a2-8e9d-08ca4ec5fb99.png",
    alt: "Duluth Civitan members at a social event in Gwinnett County",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/41a23cc2-b977-4e3e-bdc8-f9c94d5a3d72.png",
    alt: "Duluth Civitan members at a meeting in Duluth, Georgia",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/678ed1df-9ef5-46f2-8944-f1dafc901018.png",
    alt: "Duluth Civitan members with club banner at Gwinnett community event",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/8387b82f-19f8-4f1a-8f91-6c3d8890996e.png",
    alt: "Duluth Civitan social gathering for Gwinnett County developmental disabilities support",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/ad83702f-43c8-4de3-a275-549a332bbce5.png",
    alt: "Duluth Civitan members at Kids R Kids program in Gwinnett County",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/657d211f-2f66-446f-85e0-32795be59165.png",
    alt: "Duluth Civitan fundraiser dinner supporting Gwinnett County disability programs",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/11821b97-854b-432a-a50f-d6430f825a52.png",
    alt: "Duluth Civitan social dinner with Gwinnett County community leaders",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/e2bfdee5-646c-4834-b5a3-0d73ca739814.png",
    alt: "Duluth Civitan members on a bridge at Gwinnett County park",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/1c1349f8-4383-4ae4-ba60-47937d81ecaa.png",
    alt: "Duluth Civitan members with Differently Abled program participants in Gwinnett County",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/7213e43e-d552-4368-b119-9c09673cc595.png",
    alt: "Duluth Civitan club banner and members at Gwinnett County community event",
    width: 800,
    height: 600
  },
  {
    src: "/lovable-uploads/bd001a11-930f-41c4-94d2-aa356418ff56.png",
    alt: "Duluth Civitan bridge event connecting community members in Gwinnett County",
    width: 800,
    height: 600
  }
];

const GallerySection = () => {
  const isMobile = useIsMobile();
  const [showSwipeHint, setShowSwipeHint] = React.useState(true);

  // Hide swipe hint after 5 seconds on mobile
  React.useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
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
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            See how we're making a difference in the Duluth and greater Gwinnett County community
          </p>
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
                    <div className="overflow-hidden rounded-md h-full aspect-square civitan-shadow">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        width={image.width || "250"}
                        height={image.height || "250"}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
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
  );
};

export default GallerySection;
