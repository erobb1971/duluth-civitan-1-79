
import React from "react";
import CivitanLogo from "./CivitanLogo";

const Footer = () => {
  return (
    <footer className="bg-civitan-blue text-white pt-12 pb-20 lg:pb-8">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-gray-400">&copy; 2025 Duluth Civitan. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
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
