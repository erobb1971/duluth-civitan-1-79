
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import MembershipApplicationModal from "./MembershipApplicationModal";
import CivitanLogo from "./CivitanLogo";

const MembershipSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
  };

  return (
    <section id="membership" className="section bg-[#121628] text-white py-16 md:py-24 relative overflow-hidden">
      {/* Gold accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-civitan-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-civitan-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with enhanced styling */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-civitan-gold mb-6 tracking-tight">
            WE ARE DULUTH CIVITAN
          </h2>
          <div className="w-32 h-1 bg-civitan-gold mx-auto mb-8"></div>
          <p className="text-2xl font-bold mb-3 text-white">Ready to make a difference in Gwinnett County?</p>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Become a Civitan today and join our network of community leaders.
          </p>
        </div>

        {/* Logo and Serving Together - Now at the top with enhanced micro interactions */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <div 
              className="rounded-xl shadow-xl bg-white p-6 transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
              style={{
                transform: isImageHovered ? 'scale(1.05) rotate(1deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              <div className={`relative overflow-hidden rounded-lg ${isImageHovered ? 'ring-4 ring-civitan-gold/70' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-civitan-blue/20 via-transparent to-civitan-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Gold accents that appear on hover */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 bg-civitan-gold/20 rounded-full transition-all duration-500"
                  style={{
                    transform: isImageHovered ? 'translateY(15px) translateX(-15px)' : 'translateY(0) translateX(0)',
                    opacity: isImageHovered ? '1' : '0'
                  }}
                ></div>
                <div 
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-civitan-gold/20 rounded-full transition-all duration-500" 
                  style={{
                    transform: isImageHovered ? 'translateY(-15px) translateX(15px)' : 'translateY(0) translateX(0)',
                    opacity: isImageHovered ? '1' : '0'
                  }}
                ></div>
                
                <img 
                  src="/lovable-uploads/fa18658d-e5c5-46a4-bd9c-2da8a9133237.png" 
                  alt="We Are Civitan" 
                  className="max-w-full h-auto rounded-lg transition-all duration-500"
                  style={{ 
                    width: '220px',
                    filter: isImageHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                  }}
                />
                
                {/* Shimmering effect overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    transform: isImageHovered ? 'translateX(220px)' : 'translateX(-220px)',
                    transition: 'transform 1s ease',
                    opacity: '0.6'
                  }}
                ></div>
              </div>
            </div>
            <div 
              className="mt-4 text-center transition-all duration-500"
              style={{
                transform: isImageHovered ? 'translateY(5px)' : 'translateY(0)',
              }}
            >
              <span 
                className="text-civitan-gold font-medium transition-all duration-500"
                style={{
                  fontSize: isImageHovered ? '1.15rem' : '1rem',
                  textShadow: isImageHovered ? '0 0 8px rgba(255, 199, 44, 0.7)' : 'none'
                }}
              >
                Serving Together
              </span>
            </div>
          </div>

          {/* Two column layout - removed the logo column */}
          <div className="bg-[#1c223a] border border-civitan-gold/40 rounded-2xl p-6 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Why Join Column */}
              <div className="glassmorphism-card bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-civitan-gold">Why Join Duluth Civitan?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-civitan-gold mr-3 flex-shrink-0" />
                    <span>Monthly club meetings and networking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-civitan-gold mr-3 flex-shrink-0" />
                    <span>Community service opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-civitan-gold mr-3 flex-shrink-0" />
                    <span>Family volunteer opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-civitan-gold mr-3 flex-shrink-0" />
                    <span>Social events and children's activities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-civitan-gold mr-3 flex-shrink-0" />
                    <span>Business sponsorship opportunities</span>
                  </li>
                </ul>
              </div>
              
              {/* Our Mission Column */}
              <div className="glassmorphism-card bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-civitan-gold">Our Mission</h3>
                <p className="mb-4">
                  We partner with trusted local nonprofits to support inclusive programs 
                  that empower individuals with special needs — helping them thrive and live with dignity.
                </p>
                <p className="mt-4">
                  Are you a community-driven resident of Duluth or Gwinnett County who wants to make a real difference?
                </p>
                <p className="mt-4">
                  We're always looking for caring citizens to volunteer, donate, or join as a Civitan member. 
                  Whether you have time, resources, or skills to share, you can help us build a stronger, 
                  more compassionate community.
                </p>
              </div>
            </div>
            
            {/* CTA Button with enhanced styling - now below the grid and centered */}
            <div className="text-center mt-12">
              <Button 
                onClick={handleMembershipClick}
                className="bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-bold text-lg px-8 py-6 h-auto rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <Mail className="mr-2 h-5 w-5" />
                Become a Member
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Application Modal */}
      <MembershipApplicationModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
      />
    </section>
  );
};

export default MembershipSection;
