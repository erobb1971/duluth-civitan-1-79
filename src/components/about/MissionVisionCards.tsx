
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";

const MissionVisionCards = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Mission Card */}
          <Card className="civitan-shadow h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-civitan-blue rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl text-civitan-blue">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                To empower individuals with developmental disabilities in Gwinnett County through dedicated service, innovative programs, and community advocacy.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                We believe every person deserves dignity, respect, and the opportunity to reach their full potential within our community.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="civitan-shadow h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-civitan-gold rounded-full">
                  <Eye className="w-6 h-6 text-civitan-blue" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl text-civitan-blue">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                A fully inclusive Gwinnett County where every individual with developmental disabilities has equal access to opportunities, resources, and community support.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Together, we're building bridges of understanding and creating lasting positive change in our community.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionCards;
