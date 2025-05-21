
import React from "react";

const FoundersSection: React.FC = () => {
  return (
    <div className="mb-12 md:mb-16 text-center">
      <div className="inline-block bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border-2 border-civitan-gold relative z-10 max-w-sm mx-auto transform transition-all hover:-translate-y-1 hover:shadow-xl duration-300">
        <h3 className="text-2xl font-bold text-civitan-blue dark:text-white mb-4">Founders / Club Builders</h3>
        <ul className="text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-2">
          <li className="font-medium text-civitan-blue dark:text-civitan-gold">Terry Crouch (Founder)</li>
          <li>Cheryl Crouch</li>
          <li>Terry Swaim</li>
          <li>Chuck Hartman</li>
        </ul>
      </div>
    </div>
  );
};

export default FoundersSection;
