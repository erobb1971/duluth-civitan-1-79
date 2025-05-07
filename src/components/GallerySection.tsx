
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  {
    src: "/lovable-uploads/63c708c7-1b5a-43a2-8e9d-08ca4ec5fb99.png",
    alt: "Duluth Civitan members at a social event"
  },
  {
    src: "/lovable-uploads/41a23cc2-b977-4e3e-bdc8-f9c94d5a3d72.png",
    alt: "Duluth Civitan members at a meeting"
  },
  {
    src: "/lovable-uploads/678ed1df-9ef5-46f2-8944-f1dafc901018.png",
    alt: "Duluth Civitan members with club banner"
  },
  {
    src: "/lovable-uploads/8387b82f-19f8-4f1a-8f91-6c3d8890996e.png",
    alt: "Duluth Civitan social gathering"
  },
  {
    src: "/lovable-uploads/ad83702f-43c8-4de3-a275-549a332bbce5.png",
    alt: "Duluth Civitan members at Kids R Kids"
  },
  {
    src: "/lovable-uploads/657d211f-2f66-446f-85e0-32795be59165.png",
    alt: "Duluth Civitan fundraiser dinner"
  },
  {
    src: "/lovable-uploads/11821b97-854b-432a-a50f-d6430f825a52.png",
    alt: "Duluth Civitan social dinner"
  },
  {
    src: "/lovable-uploads/e2bfdee5-646c-4834-b5a3-0d73ca739814.png",
    alt: "Duluth Civitan members on a bridge"
  },
  {
    src: "/lovable-uploads/1c1349f8-4383-4ae4-ba60-47937d81ecaa.png",
    alt: "Duluth Civitan members with Differently Abled program"
  },
  {
    src: "/lovable-uploads/7213e43e-d552-4368-b119-9c09673cc595.png",
    alt: "Duluth Civitan club banner and members"
  },
  {
    src: "/lovable-uploads/bd001a11-930f-41c4-94d2-aa356418ff56.png",
    alt: "Duluth Civitan bridge event"
  }
];

const GallerySection = () => {
  return (
    <section className="py-5 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Our Community Impact
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            See how we're making a difference in the Duluth community
          </p>
        </div>
        
        {/* Main gallery carousel - visible on all devices */}
        <div className="relative px-4 my-5">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1 h-full">
                    <div className="overflow-hidden rounded-md h-full aspect-square civitan-shadow">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 lg:left-4" />
            <CarouselNext className="right-2 lg:right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
