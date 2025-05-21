
import React from "react";

const ContactBackground: React.FC = () => {
  return (
    <>
      {/* Modern gradient background with blur effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-civitan-blue to-[#0a1428]"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-civitan-gold opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
    </>
  );
};

export default ContactBackground;
