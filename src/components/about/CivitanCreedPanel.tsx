
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const CivitanCreedPanel = () => {
  return (
    <div className="bg-gradient-to-br from-civitan-blue via-blue-800 to-civitan-blue py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm civitan-shadow">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 bg-civitan-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-8 h-8 text-civitan-blue" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-civitan-blue mb-2">
                  The Civitan Creed
                </h3>
                <div className="w-16 h-1 bg-civitan-gold mx-auto"></div>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed text-center italic">
                  "I believe that Civitan is a way of life, not merely membership in an organization."
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed">
                      I believe in the worth and dignity of every human being and that I should serve others without personal gain.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                      I believe that I should be a good citizen and work for the betterment of my community.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                      I believe in justice, patriotism, and the golden rule.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed">
                      I believe that I should help create an atmosphere of goodwill and understanding between all peoples.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                      I believe that Civitan can help me become a better person and that I, in turn, can help Civitan become a better organization.
                    </p>
                  </div>
                </div>
                
                <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <p className="text-base sm:text-lg font-semibold text-civitan-blue">
                    These beliefs guide our every action and unite us in service to our community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CivitanCreedPanel;
