
import React from "react";

const ConventionBanner: React.FC = () => {
  return (
    <a 
      href="https://civitan.org/convention/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block hover:opacity-90 transition-opacity w-full h-full"
    >
      <div className="h-full">
        <img 
          src="/lovable-uploads/50742192-6c88-49ea-a0c3-f33fd52d643f.png"
          alt="ATLCIVITAN2025"
          className="w-full h-auto rounded-lg shadow-lg object-cover"
          loading="lazy"
        />
      </div>
    </a>
  );
};

export default ConventionBanner;
