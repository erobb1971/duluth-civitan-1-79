
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
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/lovable-uploads/1404d5f9-287c-4de8-bc05-2d618d082a0e.png" 
        alt="Civitan Duluth Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CivitanLogo;
