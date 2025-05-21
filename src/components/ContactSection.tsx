
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ContactSection = () => {
  const isMobile = useIsMobile();

  // Don't render the section on mobile devices
  if (isMobile) return null;

  return (
    <section id="contact" className="section relative overflow-hidden pt-16 pb-20">
      {/* Blue background layer with improved gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-civitan-blue to-[#0a1428]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">
            Have questions or want to get involved? Reach out to us through any of these channels:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="civitan-shadow bg-white/95 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:-translate-y-2">
            <CardContent className="pt-6 p-8 flex flex-col items-center text-center">
              <a href="tel:678-242-0445" className="group" aria-label="Call us at 678-242-0445">
                <div className="bg-civitan-gold p-4 rounded-full mb-6 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Phone className="h-8 w-8 text-civitan-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-civitan-blue">Give Us a Call</h3>
                <p className="text-gray-600">678-242-0445</p>
              </a>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/95 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:-translate-y-2">
            <CardContent className="pt-6 p-8 flex flex-col items-center text-center">
              <a href="mailto:info@duluthcivitanclub.org" className="group" aria-label="Email us at info@duluthcivitanclub.org">
                <div className="bg-civitan-gold p-4 rounded-full mb-6 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Mail className="h-8 w-8 text-civitan-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-civitan-blue">Send an Email</h3>
                <p className="text-gray-600">info@duluthcivitanclub.org</p>
              </a>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/95 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:-translate-y-2">
            <CardContent className="pt-6 p-8 flex flex-col items-center text-center">
              <a href="https://www.google.com/maps/place/Downtown+Duluth,+Duluth,+GA/@34.0028474,-84.1484762,17z" target="_blank" rel="noopener noreferrer" className="group" aria-label="Find us in Downtown Duluth, Georgia">
                <div className="bg-civitan-gold p-4 rounded-full mb-6 transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <MapPin className="h-8 w-8 text-civitan-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-civitan-blue">Visit Us</h3>
                <p className="text-gray-600">Downtown Duluth, GA</p>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
