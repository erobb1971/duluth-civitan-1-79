
import React, { useEffect, useState } from "react";
import { scroll, handshake, heart, building, flame, dove } from "lucide-react";

const CivitanCreedPanel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const creedSections = [
    {
      icon: scroll,
      text: "I believe that Civitan is a way of life, not merely membership in an organization.",
      delay: "0ms"
    },
    {
      icon: handshake,
      text: "I believe in the worth and dignity of every human being and that I should serve others without personal gain.",
      delay: "200ms"
    },
    {
      icon: building,
      text: "I believe that I should be a good citizen and work for the betterment of my community.",
      delay: "400ms"
    },
    {
      icon: heart,
      text: "I believe in justice, patriotism, and the golden rule.",
      delay: "600ms"
    },
    {
      icon: flame,
      text: "I believe that I should help create an atmosphere of goodwill and understanding between all peoples.",
      delay: "800ms"
    },
    {
      icon: dove,
      text: "I believe that Civitan can help me become a better person and that I, in turn, can help Civitan become a better organization.",
      delay: "1000ms"
    }
  ];

  return (
    <div className="bg-civitan-blue py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div 
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            The Civitan Creed
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="font-crimson text-lg sm:text-xl text-civitan-gold italic max-w-3xl mx-auto">
            The principles that guide our service and unite us in purpose
          </p>
        </div>

        {/* Creed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {creedSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 sm:gap-6 transition-all duration-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  animationDelay: section.delay,
                  animation: isVisible ? `stagger-fade-in 0.8s ease-out forwards` : 'none'
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-civitan-gold rounded-full flex items-center justify-center mt-1">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-civitan-blue" />
                </div>
                <p className="font-crimson text-base sm:text-lg lg:text-xl text-white leading-relaxed">
                  {section.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Quote */}
        <div 
          className={`text-center mt-12 sm:mt-16 pt-8 border-t border-civitan-gold/30 transition-all duration-800 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="font-playfair text-xl sm:text-2xl lg:text-3xl text-civitan-gold font-semibold italic">
            "Building better citizenship through service"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CivitanCreedPanel;
