
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const membershipTiers = [
  {
    title: "Individual",
    price: "$75",
    period: "per year",
    features: [
      "Monthly club meetings",
      "Community service opportunities",
      "Social events access",
      "Member newsletter",
    ],
    buttonText: "Become a Member",
    recommended: false,
  },
  {
    title: "Family",
    price: "$120",
    period: "per year",
    features: [
      "All Individual benefits",
      "Family members included",
      "Family volunteer opportunities",
      "Family social events",
      "Children's activities",
    ],
    buttonText: "Join as Family",
    recommended: true,
  },
  {
    title: "Business",
    price: "$250",
    period: "per year",
    features: [
      "All Family benefits",
      "Business logo on website",
      "Recognition at events",
      "Sponsorship opportunities",
      "Networking events",
    ],
    buttonText: "Business Signup",
    recommended: false,
  },
];

const MembershipSection = () => {
  return (
    <section id="membership" className="section bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Become a Member
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Join our community of service-oriented individuals making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`civitan-shadow relative ${
                tier.recommended 
                  ? "border-2 border-civitan-gold transform md:-translate-y-4" 
                  : ""
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-civitan-gold text-civitan-blue text-sm font-bold py-1 px-4 rounded-full">
                  Recommended
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl text-civitan-blue dark:text-white">{tier.title}</CardTitle>
                <div className="mt-3">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-civitan-gold mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className={`w-full ${
                    tier.recommended
                      ? "bg-civitan-gold text-civitan-blue hover:bg-yellow-500"
                      : "bg-civitan-blue hover:bg-blue-900 text-white"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-civitan-gold">
            <h3 className="text-xl font-bold mb-3 text-civitan-blue dark:text-white">
              Member Benefits
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you become a Civitan Duluth member, you join a global organization dedicated to serving the world, with a special focus on helping people with developmental disabilities.
            </p>
            <div className="mt-6">
              <img 
                src="/lovable-uploads/7771749b-f5ad-4949-8f0b-1d321a504737.png" 
                alt="Civitan Member Card" 
                className="max-w-xs mx-auto rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
