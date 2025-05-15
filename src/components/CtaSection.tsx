
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import MembershipApplicationModal from "./MembershipApplicationModal";

const CtaSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section 
        id="cta-section" 
        ref={sectionRef}
        className="relative bg-civitan-blue py-10 sm:py-16 overflow-hidden"
      >
        {/* Blue background layer with 3D transform effect */}
        <div className={`absolute inset-0 z-0 bg-civitan-blue transition-transform duration-700 ${isVisible ? 'scale-y-100 origin-top' : 'scale-y-75 origin-top'}`}></div>
        
        <div className={`container mx-auto px-4 sm:px-6 relative z-10 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="max-w-5xl mx-auto text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-civitan-gold">
              Ready to make a difference in Gwinnett County?
            </h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-center px-2">
              Become a Civitan today and join our network of community leaders.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 px-2 sm:px-0">
              <div className="glassmorphism-card bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-civitan-gold">Why Join Duluth Civitan?</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">As a Civitan member, you'll have the opportunity to:</p>
                <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>Make a direct impact in your local community</li>
                  <li>Develop leadership and organizational skills</li>
                  <li>Connect with like-minded service-oriented individuals</li>
                  <li>Participate in meaningful service projects</li>
                  <li>Attend social and networking events</li>
                </ul>
              </div>
              <div className="glassmorphism-card bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-civitan-gold">Our Mission</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  We partner with trusted local nonprofits to support inclusive programs 
                  that empower individuals with special needs — helping them thrive and live with dignity.
                </p>
                <p className="mt-2 sm:mt-6 text-sm sm:text-base">
                  Are you a community-driven resident of Duluth or Gwinnett County who wants to make a real difference?
                </p>
                <p className="mt-2 sm:mt-4 text-sm sm:text-base">
                  We're always looking for caring citizens to volunteer, donate, or join as a Civitan member. 
                  Whether you have time, resources, or skills to share, you can help us build a stronger, 
                  more compassionate community.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={handleMembershipClick}
                className="bg-civitan-gold text-civitan-blue hover:bg-yellow-400 font-medium text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-6 h-auto transform transition-all duration-500 hover:scale-105"
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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
