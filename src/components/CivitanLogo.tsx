
import React from "react";

interface CivitanLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const CivitanLogo: React.FC<CivitanLogoProps> = ({ 
  className = "",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "w-10 h-10 md:w-14 md:h-14", // Increased from w-8/h-8 to w-10/h-10
    md: "w-14 h-14 md:w-20 md:h-20", // Increased from w-12/h-12 to w-14/h-14
    lg: "w-20 h-20 md:w-28 md:h-28", // Increased from w-16/h-16 to w-20/h-20
    xl: "w-28 h-28 md:w-36 md:h-36"  // Increased from w-24/h-24 to w-28/h-28
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/lovable-uploads/1404d5f9-287c-4de8-bc05-2d618d082a0e.png" 
        alt="Civitan Duluth Logo" 
        className="w-full h-full object-contain p-1"
      />
    </div>
  );
};

export default CivitanLogo;
