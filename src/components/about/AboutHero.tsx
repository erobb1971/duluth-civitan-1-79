
import React from "react";

const AboutHero = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-16">
      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-civitan-blue mb-4">
          About Duluth Civitan
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-civitan-gold mx-auto mb-6 sm:mb-8"></div>
        <p className="text-lg sm:text-xl max-w-4xl mx-auto text-gray-700 leading-relaxed">
          Since 2003, Duluth Civitan has been dedicated to improving the lives of children and adults with developmental disabilities in Gwinnett County through hands-on service, fundraising, and advocacy.
        </p>
      </div>

      {/* Mission Quote */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-civitan-blue to-blue-800 p-6 sm:p-8 rounded-lg text-white text-center">
          <blockquote className="text-lg sm:text-xl italic mb-4">
            "Our mission is to build good citizenship by providing a volunteer organization of clubs dedicated to serving individual and community needs with an emphasis on helping people with developmental disabilities."
          </blockquote>
          <cite className="font-semibold text-civitan-gold">— Civitan International</cite>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
