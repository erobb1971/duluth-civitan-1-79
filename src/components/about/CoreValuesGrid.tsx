
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, Users, Lightbulb, Shield, Handshake, Star } from "lucide-react";

const coreValues = [
  {
    title: "Compassion",
    description: "We serve with empathy, kindness, and genuine care for every individual we support.",
    icon: <HandHeart className="w-8 h-8" />,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Inclusion",
    description: "We believe in creating welcoming spaces where everyone belongs and can contribute.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Innovation",
    description: "We continuously seek creative solutions to better serve our community's evolving needs.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our actions and commitments.",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Collaboration",
    description: "We work together with families, organizations, and community partners to maximize impact.",
    icon: <Handshake className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every program, service, and interaction we provide.",
    icon: <Star className="w-8 h-8" />,
    color: "bg-orange-100 text-orange-600"
  }
];

const CoreValuesGrid = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue mb-4">
          Our Core Values
        </h3>
        <div className="w-16 sm:w-20 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-700">
          These fundamental principles guide everything we do and shape how we serve our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {coreValues.map((value, index) => (
          <Card key={index} className="civitan-shadow hover:shadow-lg transition-shadow duration-300 h-full">
            <CardHeader className="pb-4">
              <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mb-4 mx-auto`}>
                {value.icon}
              </div>
              <CardTitle className="text-xl text-civitan-blue text-center">{value.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-center leading-relaxed">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoreValuesGrid;
