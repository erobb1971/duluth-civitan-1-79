
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, Mail } from "lucide-react";
import MembershipApplicationModal from "./MembershipApplicationModal";

const CtaSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
  };

  return (
    <>
      <section className="relative bg-civitan-blue py-16 overflow-hidden">
        {/* Blue background layer */}
        <div className="absolute inset-0 z-0 bg-civitan-blue"></div>
        
        {/* Parallax background image with top center position */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ 
            transform: `translateY(${scrollPosition * 0.2}px)`,
            backgroundImage: `url("/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png")`,
            backgroundPosition: "top center", // Changed to top center
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-civitan-gold">
              Ready to make a difference in Gwinnett County?
            </h2>
            <p className="text-xl mb-12 text-center">
              Become a Civitan today and join our network of community leaders.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glassmorphism-card bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-civitan-gold">Why Join Duluth Civitan?</h3>
                <p className="mb-4">As a Civitan member, you'll have the opportunity to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Make a direct impact in your local community</li>
                  <li>Develop leadership and organizational skills</li>
                  <li>Connect with like-minded service-oriented individuals</li>
                  <li>Participate in meaningful service projects</li>
                  <li>Attend social and networking events</li>
                </ul>
              </div>
              <div className="glassmorphism-card bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4 text-civitan-gold">Our Mission</h3>
                <p className="mb-4">
                  We partner with trusted local nonprofits to support inclusive programs 
                  that empower individuals with special needs — helping them thrive and live with dignity.
                </p>
                <p className="mt-6">
                  Are you a community-driven resident of Duluth or Gwinnett County who wants to make a real difference?
                </p>
                <p className="mt-4">
                  We're always looking for caring citizens to volunteer, donate, or join as a Civitan member. 
                  Whether you have time, resources, or skills to share, you can help us build a stronger, 
                  more compassionate community.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleMembershipClick}
                className="bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-medium text-lg px-8 py-6 h-auto"
              >
                <Mail className="mr-2" />
                Become a Member
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MembershipApplicationModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
      />
    </>
  );
};

export default CtaSection;
