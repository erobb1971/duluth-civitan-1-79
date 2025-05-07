
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Community Service",
    description: "We organize and participate in various community service projects throughout the year.",
    icon: "🤝",
  },
  {
    title: "Leadership Development",
    description: "We provide opportunities for members to develop and enhance their leadership skills.",
    icon: "🚀",
  },
  {
    title: "Social Activities",
    description: "We host social activities and events for members to network and build relationships.",
    icon: "🎉",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            About Civitan Duluth
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Since 1985, Civitan Duluth has been dedicated to serving individual and community needs with an emphasis on helping people with developmental disabilities.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-civitan-gold">
            <p className="italic text-civitan-blue dark:text-white">
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
                <CardTitle className="text-xl text-civitan-blue dark:text-civitan-gold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
