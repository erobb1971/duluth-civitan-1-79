
import React, { useEffect, useState } from "react";
import { Heart, Users, Building, Handshake, Globe, Target, Eye, Hand, Lightbulb, ArrowUp, UserCheck, Compass } from "lucide-react";

const CivitanCreedPanel = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const creedSections = [
    {
      icon: Heart,
      text: "I believe that Civitan is a way of life, not merely membership in an organization.",
      delay: "0ms"
    },
    {
      icon: Users,
      text: "I believe in the worth and dignity of every human being and that I should serve others without personal gain.",
      delay: "100ms"
    },
    {
      icon: Building,
      text: "I believe that I should be a good citizen and work for the betterment of my community.",
      delay: "200ms"
    },
    {
      icon: Handshake,
      text: "I believe in justice, patriotism, and the golden rule.",
      delay: "300ms"
    },
    {
      icon: Globe,
      text: "I believe that I should help create an atmosphere of goodwill and understanding between all peoples.",
      delay: "400ms"
    },
    {
      icon: Target,
      text: "I believe that Civitan can help me become a better person and that I, in turn, can help Civitan become a better organization.",
      delay: "500ms"
    },
    {
      icon: Eye,
      text: "I believe in the brotherhood of man under the fatherhood of God.",
      delay: "600ms"
    },
    {
      icon: Hand,
      text: "I believe that I should live in such a way that when I am gone, the world will be a little better because I have lived.",
      delay: "700ms"
    },
    {
      icon: Lightbulb,
      text: "I believe that service to others is the best work of life.",
      delay: "800ms"
    },
    {
      icon: ArrowUp,
      text: "I believe in the power of individual effort and community action.",
      delay: "900ms"
    },
    {
      icon: UserCheck,
      text: "I believe that working together we can build better communities.",
      delay: "1000ms"
    },
    {
      icon: Compass,
      text: "I believe that Civitan builds good citizenship through fellowship and service.",
      delay: "1100ms"
    }
  ];

  return (
    <div className="bg-civitan-blue py-16 sm:py-20 lg:py-24 -mt-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
          <p className="font-crimson text-base sm:text-lg text-civitan-gold italic max-w-3xl mx-auto">
            The principles that guide our service and unite us in purpose
          </p>
        </div>

        {/* Creed Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {creedSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 sm:gap-5 transition-all duration-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  animationDelay: section.delay,
                  animation: isVisible ? `stagger-fade-in 0.8s ease-out forwards` : 'none'
                }}
              >
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-civitan-gold rounded-full flex items-center justify-center mt-1">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-civitan-blue" />
                </div>
                <p className="font-crimson text-base sm:text-lg text-white leading-relaxed">
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
          <p className="font-crimson text-base sm:text-lg text-civitan-gold font-semibold italic">
            "Building better citizenship through service"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CivitanCreedPanel;
