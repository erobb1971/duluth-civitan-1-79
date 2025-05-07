
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Mail } from "lucide-react";
import MembershipApplicationModal from "./MembershipApplicationModal";

const CtaSection = () => {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);

  const handleMembershipClick = () => {
    window.location.href = "mailto:info@duluthcivitanclub.org?subject=Membership Application&body=Thank you for your interest in becoming a member of Duluth Civitan. Please provide your contact information and we will get back to you shortly.";
  };

  return (
    <>
      <section className="bg-civitan-blue py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-civitan-gold">
              Ready to make a difference in Gwinnett County?
            </h2>
            <p className="text-xl mb-12 text-center">
              Become a Civitan today and join our network of community leaders.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
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
              <div className="bg-white/10 p-6 rounded-lg">
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
    </>
  );
};

export default CtaSection;
