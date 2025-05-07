
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-civitan-blue text-white py-2.5 hidden lg:block">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-800 pt-2">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-center">&copy; 2025 Duluth Civitan. All rights reserved.</p>
            <div className="mt-1 md:mt-0 md:ml-6 flex justify-center">
              <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
