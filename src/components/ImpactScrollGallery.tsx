
"use client"

import React from "react";
import { ContainerScroll, BentoGrid, BentoCell, ContainerScale } from "@/components/ui/hero-gallery-scroll-animation";
import { Button } from "@/components/ui/button";

// Use the existing gallery images
const GALLERY_IMAGES = [
  "/lovable-uploads/63c708c7-1b5a-43a2-8e9d-08ca4ec5fb99.png",
  "/lovable-uploads/41a23cc2-b977-4e3e-bdc8-f9c94d5a3d72.png",
  "/lovable-uploads/678ed1df-9ef5-46f2-8944-f1dafc901018.png",
  "/lovable-uploads/8387b82f-19f8-4f1a-8f91-6c3d8890996e.png",
  "/lovable-uploads/ad83702f-43c8-4de3-a275-549a332bbce5.png",
  "/lovable-uploads/657d211f-2f66-446f-85e0-32795be59165.png",
  "/lovable-uploads/11821b97-854b-432a-a50f-d6430f825a52.png",
];

const ImpactScrollGallery = () => {
  return (
    <ContainerScroll className="h-[250vh] lg:h-[350vh] bg-white">
      <BentoGrid 
        variant="fourCells"
        className="sticky left-0 top-0 z-0 h-screen w-full p-4 md:p-6"
      >
        {GALLERY_IMAGES.slice(0, 4).map((imageSrc, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl"
          >
            <img
              className="size-full object-cover object-center"
              width={500}
              height={500}
              src={imageSrc}
              alt={`Duluth Civitan impact image ${index + 1}`}
              loading="lazy"
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center">
        <h1 className="max-w-xl text-4xl sm:text-5xl font-bold tracking-tighter text-civitan-blue">
          Building Better Communities
        </h1>
        <p className="my-6 max-w-xl text-sm text-gray-700 md:text-base px-4">
          Since 2002, Duluth Civitan has been making a difference in our community through 
          dedicated service, fundraising initiatives, and unwavering advocacy for those with 
          developmental disabilities.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button className="bg-civitan-blue px-4 py-2 font-medium hover:bg-civitan-blue/80">
            Join Us Today
          </Button>
          <Button
            variant="outline"
            className="border-civitan-gold text-civitan-blue hover:bg-civitan-gold/10"
          >
            Learn About Our Impact
          </Button>
        </div>
      </ContainerScale>
    </ContainerScroll>
  );
};

export default ImpactScrollGallery;
