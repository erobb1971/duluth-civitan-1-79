
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
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

  return (
    <section id="contact" className="section relative overflow-hidden hidden md:block">
      {/* Blue background layer */}
      <div className="absolute inset-0 z-0 bg-civitan-blue"></div>
      
      {/* Parallax background image with center bottom position */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          transform: `translateY(${scrollPosition * 0.2}px)`,
          backgroundImage: `url("/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png")`,
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-white">
            Have questions or want to get involved? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="civitan-shadow bg-white/90">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <a href="tel:6782420445" className="hover:scale-110 transition-transform" aria-label="Call us at 678-242-0445">
                <div className="bg-civitan-gold p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-civitan-blue" />
                </div>
              </a>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Phone</h3>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/90">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <a href="mailto:info@duluthcivitanclub.org" className="hover:scale-110 transition-transform" aria-label="Email us at info@duluthcivitanclub.org">
                <div className="bg-civitan-gold p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-civitan-blue" />
                </div>
              </a>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Email</h3>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/90">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <a href="https://g.co/kgs/ftSkpxj" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" aria-label="Find us in Duluth, Georgia">
                <div className="bg-civitan-gold p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-civitan-blue" />
                </div>
              </a>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Location</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
