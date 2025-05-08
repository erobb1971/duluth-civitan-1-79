
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/2b8d2cdf-8faf-46dc-9c05-425213ffb8f1.png" 
          alt="Duluth Cityscape" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-civitan-blue/50"></div>
      </div>
      
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
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Phone</h3>
              <p className="text-gray-700">
                <a href="tel:6782420445" className="hover:underline">678-242-0445</a>
              </p>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/90">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Email</h3>
              <p className="text-gray-700">
                <a href="mailto:info@duluthcivitanclub.org" className="hover:underline">info@duluthcivitanclub.org</a>
              </p>
            </CardContent>
          </Card>

          <Card className="civitan-shadow bg-white/90">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue">Location</h3>
              <p className="text-gray-700">
                <a href="https://g.co/kgs/ftSkpxj" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Duluth, Georgia
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
