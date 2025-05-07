
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Have questions or want to get involved? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="civitan-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue dark:text-white">Phone</h3>
              <p className="text-gray-700 dark:text-gray-300">(555) 123-4567</p>
            </CardContent>
          </Card>

          <Card className="civitan-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue dark:text-white">Email</h3>
              <p className="text-gray-700 dark:text-gray-300">info@civitanduluth.org</p>
            </CardContent>
          </Card>

          <Card className="civitan-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-civitan-gold p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-civitan-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-civitan-blue dark:text-white">Location</h3>
              <p className="text-gray-700 dark:text-gray-300">
                3455 Golden Horizon Blvd<br />
                Duluth, GA 30096
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="civitan-shadow">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-6 text-civitan-blue dark:text-white text-center">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={5}
                  />
                </div>
                <div className="text-center">
                  <Button className="bg-civitan-blue hover:bg-blue-900 text-white px-8">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
