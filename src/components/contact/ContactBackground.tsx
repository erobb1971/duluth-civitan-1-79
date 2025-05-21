
import React from "react";

interface BackgroundOverlayProps {
  gradient?: boolean;
  image?: string;
  opacity?: number;
  blurAmount?: string;
}

const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({ 
  gradient = true, 
  image,
  opacity = 0.2,
  blurAmount = "blur-3xl"
}) => {
  return (
    <>
      {/* Modern gradient background with blur effect */}
      {gradient && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-civitan-blue to-[#0a1428]"></div>
      )}
      
      {/* Image overlay with parallax effect when scrolling */}
      {image && (
        <div 
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url(${image})`,
            opacity: opacity,
          }}
        ></div>
      )}
      
      {gradient && (
        <div className="absolute inset-0 z-0 opacity-20">
          <div className={`absolute top-0 left-0 w-full h-64 bg-civitan-gold opacity-10 ${blurAmount} rounded-full -translate-x-1/2 -translate-y-1/2`}></div>
          <div className={`absolute bottom-0 right-0 w-full h-64 bg-civitan-gold opacity-10 ${blurAmount} rounded-full translate-x-1/2 translate-y-1/2`}></div>
        </div>
      )}
    </>
  );
};

export default BackgroundOverlay;
