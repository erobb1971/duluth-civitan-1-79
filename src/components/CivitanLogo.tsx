
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
    sm: "w-8 h-8 md:w-12 md:h-12",
    md: "w-12 h-12 md:w-16 md:h-16",
    lg: "w-16 h-16 md:w-24 md:h-24",
    xl: "w-24 h-24 md:w-32 md:h-32"
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
