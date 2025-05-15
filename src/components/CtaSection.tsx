
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import MembershipApplicationModal from "./MembershipApplicationModal";

const CtaSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMembershipClick = () => {
    setMembershipModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
        
        // Calculate scroll progress for subtle 3D transform
        // Limit the effect to avoid causing layout issues
        if (isInView) {
          const sectionTop = sectionRef.current.offsetTop - window.innerHeight;
          const scrollPosition = window.scrollY;
          const progress = Math.min(
            Math.max(0, (scrollPosition - sectionTop) / (window.innerHeight * 0.5)), 
            1
          );
          setScrollProgress(progress);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate 3D transform based on scroll progress
  const transform = `
    perspective(1000px)
    scale(${1 + scrollProgress * 0.02})
    translateY(${scrollProgress * -5}px)
    rotateX(${scrollProgress * 1}deg)
  `;

  return (
    <>
      <section 
        id="cta-section" 
        ref={sectionRef}
        className="relative py-10 sm:py-16 overflow-hidden z-10"
      >
        {/* Glassmorphism card with fixed positioning within container */}
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div 
            className={`absolute inset-0 z-0 rounded-3xl transition-all duration-300 shadow-xl
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `} 
            style={{
              transform,
              backgroundColor: 'rgba(0, 32, 91, 0.85)', // civitan-blue with transparency
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: `0 ${10 + scrollProgress * 10}px ${20 + scrollProgress * 15}px rgba(0, 0, 0, ${0.3 + scrollProgress * 0.1})`,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          ></div>
          
          <div className={`relative z-10 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="max-w-5xl mx-auto text-white pt-8 pb-4">
              {/* WE ARE DULUTH CIVITAN Image - Fixed path and added error handling */}
              <div className="flex justify-center mb-8 sm:mb-10">
                <img 
                  src="/lovable-uploads/aee0f8ab-c08c-4902-8029-9185987b6644.png" 
                  alt="WE ARE DULUTH CIVITAN" 
                  className="max-w-full h-auto w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 object-contain"
                  onError={(e) => {
                    console.error("Image failed to load");
                    // Provide a text fallback if image fails
                    e.currentTarget.style.display = 'none';
                    const container = e.currentTarget.parentElement;
                    if (container) {
                      const fallback = document.createElement('h2');
                      fallback.className = 'text-2xl md:text-4xl font-bold text-civitan-gold';
                      fallback.textContent = 'WE ARE DULUTH CIVITAN';
                      container.appendChild(fallback);
                    }
                  }}
                />
              </div>

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
