
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Community Service",
    description: "We organize and participate in various community service projects throughout the year in Gwinnett County.",
    icon: "🤝",
  },
  {
    title: "Leadership Development",
    description: "We provide opportunities for members to develop and enhance their leadership skills through service.",
    icon: "🚀",
  },
  {
    title: "Social Activities",
    description: "We host social activities and events for members to network and build relationships within our community.",
    icon: "🎉",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue mb-4">
            About Duluth Civitan
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Since 2002, Duluth Civitan has been dedicated to improving the lives of children and adults with developmental disabilities in Gwinnett County through hands-on service, fundraising, and advocacy.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-civitan-gold">
            <p className="italic text-civitan-blue">
              "Our mission is to build good citizenship by providing a volunteer organization of clubs dedicated to serving individual and community needs with an emphasis on helping people with developmental disabilities."
            </p>
            <p className="mt-4 font-semibold text-right">— Civitan International</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="civitan-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle className="text-xl text-civitan-blue">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
