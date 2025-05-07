
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
        src="/lovable-uploads/a51d13aa-c110-46e7-8d46-e1ce5016ecb3.png" 
        alt="Civitan Duluth Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CivitanLogo;
