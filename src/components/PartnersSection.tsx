
import React from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

interface Partner {
  name: string;
  description: string;
  category: string;
  logo: string;
  website?: string;
}

const partners: Partner[] = [
  {
    name: "Spectrum Autism Support",
    description: "Provides support for individuals with autism and their families.",
    category: "Disability & Special Needs Support",
    logo: "🧠",
    website: "https://spectrumautism.org"
  },
  {
    name: "Annandale Village",
    description: "A residential nonprofit community for adults with developmental disabilities and brain injuries.",
    category: "Disability & Special Needs Support",
    logo: "🏡",
    website: "https://annandale.org"
  },
  {
    name: "Creative Enterprises, Inc.",
    description: "Offers employment and life skills training for people with disabilities.",
    category: "Disability & Special Needs Support",
    logo: "💼",
    website: "https://creativeenterprises.org"
  },
  {
    name: "Camp Big Heart",
    description: "Summer camp for children and adults with developmental disabilities.",
    category: "Disability & Special Needs Support",
    logo: "⛺",
    website: "https://campbigheart.org"
  },
  {
    name: "Driving Magic Farm",
    description: "Hosts therapeutic riding programs and events for those with disabilities.",
    category: "Disability & Special Needs Support",
    logo: "🐎"
  },
  {
    name: "Rainbow Village",
    description: "Transitional housing and support programs for homeless families.",
    category: "Community Support & Homelessness",
    logo: "🌈",
    website: "https://rainbowvillage.org"
  },
  {
    name: "Duluth Fall Festival",
    description: "Major local festival supporting downtown Duluth development and nonprofit organizations.",
    category: "Community Events & Beautification",
    logo: "🎪",
    website: "https://duluthfallfestival.org"
  },
  {
    name: "Gwinnett Place CID",
    description: "The Gwinnett Place Community Improvement District focusing on local revitalization.",
    category: "Community Events & Beautification",
    logo: "🏙️",
    website: "https://gwinnettplacecid.com"
  },
  {
    name: "Curiosity Lab at Peachtree Corners",
    description: "Supported via educational tours and partnership visits promoting technology and smart city awareness.",
    category: "Community Events & Beautification",
    logo: "🔬",
    website: "https://curiositylabptc.com"
  },
  {
    name: "Georgia First Generation Foundation",
    description: "Supports first-generation high school students in accessing college education.",
    category: "Education & Youth Empowerment",
    logo: "🎓",
    website: "https://georgiafirstgen.org"
  },
  {
    name: "Senior Provisions",
    description: "Focused on wellness education and resources for aging adults.",
    category: "Education & Youth Empowerment",
    logo: "👵"
  },
  {
    name: "Local Schools and Churches",
    description: "Frequently involved in clergy appreciation and youth events.",
    category: "Education & Youth Empowerment",
    logo: "🏫"
  }
];

const PartnersSection = () => {
  return (
    <section id="partners" className="section bg-gray-50 dark:bg-gray-900 py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3">
            Our Partners
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Organizations and charities we work with to serve our community
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <Card 
                key={index} 
                className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg civitan-shadow border-t-4 border-t-civitan-gold"
              >
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <div className="text-4xl sm:text-5xl mb-3">{partner.logo}</div>
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-civitan-blue hover:text-blue-700 dark:text-civitan-gold dark:hover:text-yellow-400 transition-colors"
                        aria-label={`Visit ${partner.name} website`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-civitan-blue dark:text-white mb-1">{partner.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{partner.category}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-auto">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
