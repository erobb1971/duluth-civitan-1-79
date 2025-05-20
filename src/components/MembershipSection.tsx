
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const MembershipSection = () => {
  return (
    <section id="membership" className="section bg-[#121628] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-civitan-gold mb-6">
            Become a Member
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Join our community of service-oriented individuals making a difference
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#1c223a] border-2 border-civitan-gold">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Member Benefits</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-civitan-gold mr-3 flex-shrink-0" />
                      <span>Monthly club meetings and networking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-civitan-gold mr-3 flex-shrink-0" />
                      <span>Community service opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-civitan-gold mr-3 flex-shrink-0" />
                      <span>Family volunteer opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-civitan-gold mr-3 flex-shrink-0" />
                      <span>Social events and children's activities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-civitan-gold mr-3 flex-shrink-0" />
                      <span>Business sponsorship opportunities</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">Membership Dues</h3>
                  <ul className="space-y-3 text-white">
                    <li className="text-base">Dues include lunch at 1818 Club events</li>
                    <li className="text-base">$95 per quarter</li>
                    <li className="text-base">$375 per Year</li>
                    <li className="text-base">$125 per Year support individual (no meals included)</li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/aee0f8ab-c08c-4902-8029-9185987b6644.png" 
                    alt="We Are Civitan" 
                    className="max-w-full h-auto rounded-lg shadow-xl" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
