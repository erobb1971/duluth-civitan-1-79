
import React, { useRef, useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  {
    year: 2003,
    title: "Duluth Civitan Club Founded",
    description: "The Duluth Civitan Club was officially founded on May 22, 2003.",
  },
  {
    year: "2003-2004",
    title: "First Club President",
    description: "Bob Watson (Deceased) served as the first president of the Duluth Civitan Club.",
  },
  {
    year: "2004-2005",
    title: "Leadership Transition",
    description: "Scott Jordan took over as the club's president.",
  },
  {
    year: "2005-2006",
    title: "Growing Membership",
    description: "Don Tew led the club as president, focusing on membership growth.",
  },
  {
    year: "2006-2007",
    title: "Community Projects Expansion",
    description: "Erica Dumple's presidency saw an expansion of community service initiatives.",
  },
  {
    year: "2007-2008",
    title: "Strengthening Partnerships",
    description: "Under Melvin Buchanan's leadership, the club formed key community partnerships.",
  },
  {
    year: "2008-2010",
    title: "Two-Year Presidential Term",
    description: "Loren Brown served as president for two consecutive years.",
  },
  {
    year: "2010-2012",
    title: "Increased Fundraising",
    description: "Jerry Robb's two-year term focused on enhancing fundraising efforts.",
  },
  {
    year: "2012-2013",
    title: "Founder's Leadership",
    description: "Founder Terry Crouch served as president.",
  },
  {
    year: "2013-2014",
    title: "New Initiatives",
    description: "Susan Young led the club with a focus on new community initiatives.",
  },
  {
    year: "2014-2015",
    title: "Expanding Reach",
    description: "Sandy Weaver helped expand the club's reach in the community.",
  },
  {
    year: "2015-2016",
    title: "Strategic Growth",
    description: "David Cross implemented strategic growth plans for the club.",
  },
  {
    year: "2016-2017",
    title: "Return Leadership",
    description: "Sandy Weaver returned for another term as president.",
  },
  {
    year: "2017-2018",
    title: "Enhancing Community Impact",
    description: "Claire Dees focused on enhancing the club's community impact.",
  },
  {
    year: "2018-2019",
    title: "Membership Drive",
    description: "Kim Stufflet led a successful membership drive.",
  },
  {
    year: "2019-2020",
    title: "Transition Period",
    description: "Jon Hoovestol (Deceased) served as president.",
  },
  {
    year: "2020-2021",
    title: "Co-Presidential Term",
    description: "Jon Hoovestol & Terry Crouch served as co-presidents.",
  },
  {
    year: "2021-2022",
    title: "Pandemic Response",
    description: "Terry Crouch led the club through pandemic-related challenges.",
  },
  {
    year: "2022-2024",
    title: "Two-Year Leadership",
    description: "Claire Dees served another term, focusing on post-pandemic recovery.",
  },
  {
    year: "2024-2025",
    title: "Current Leadership",
    description: "Kim Stufflet returned as president for the current term.",
  },
  {
    year: "Oct 2025-2026",
    title: "Upcoming Leadership",
    description: "Cheryl Crouch will begin her term as president in October 2025.",
  },
];

const TimelineSection = () => {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Handle timeline items animation
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isItemVisible = rect.top < windowHeight * 0.85 && rect.bottom >= 0;
          
          if (isItemVisible) {
            ref.classList.add('animate-fade-in');
            ref.classList.add('opacity-100');
          }
        }
      });

      // Check if the founders section is visible
      const foundersSection = document.querySelector('.founders-section');
      if (foundersSection) {
        const rect = foundersSection.getBoundingClientRect();
        if (rect.top < windowHeight * 0.85 && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
      
      // Hide scroll cue when scrolled down enough
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const scrolledIntoSection = sectionRect.top < windowHeight * 0.3;
        setShowScrollCue(!scrolledIntoSection);
      }
    };

    // Initialize timeline items as invisible
    timelineRefs.current.forEach(ref => {
      if (ref) {
        ref.classList.add('opacity-0');
        ref.classList.add('translate-y-4');
        ref.classList.add('transition-all');
        ref.classList.add('duration-500');
      }
    });

    // Check visibility on initial load
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="section bg-gray-100 dark:bg-gray-800 py-10 md:py-16 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3">
            Our Journey Through Time
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Civitan Duluth's history since our founding in 2003
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Founders Section with Enhanced Styling */}
          <div className={`founders-section mb-12 text-center transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md border-2 border-civitan-gold relative z-10 max-w-sm mx-auto">
              <h3 className="text-xl font-bold text-civitan-blue dark:text-white mb-3">Founders / Club Builders</h3>
              <ul className="text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-1">
                <li className="font-medium">Terry Crouch (Founder)</li>
                <li>Cheryl Crouch</li>
                <li>Terry Swaim</li>
                <li>Chuck Hartman</li>
              </ul>
            </div>
          </div>

          {/* Timeline Connector Line */}
          <div className="timeline-connector"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              ref={el => timelineRefs.current[index] = el}
              className={`timeline-item relative flex mb-12 ${
                index % 2 === 0 
                  ? "md:flex-row flex-col-reverse" 
                  : "md:flex-row-reverse flex-col-reverse"
              }`}
            >
              {/* For mobile: always show content below the timeline point */}
              <div className="md:w-1/2 w-full md:px-0 px-4">
                <div 
                  className={`
                    bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg civitan-shadow
                    ${index % 2 === 0 
                      ? "md:ml-8 md:mr-4" 
                      : "md:mr-8 md:ml-4"
                    }
                    md:text-left ${index % 2 === 0 ? "md:text-left" : "md:text-right"} text-left
                  `}
                >
                  <span className={`
                    inline-block bg-civitan-gold text-civitan-blue px-3 py-1 rounded-full 
                    text-sm font-bold mb-2
                  `}>
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold text-civitan-blue dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue indicator */}
      <div 
        className={cn(
          "absolute bottom-4 left-1/2 transform -translate-x-1/2 text-civitan-blue dark:text-civitan-gold transition-opacity duration-500",
          showScrollCue ? "opacity-80" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center animate-bounce cursor-pointer">
          <span className="text-xs mb-1">Scroll for more</span>
          <ChevronsDown size={20} />
        </div>
      </div>

      {/* Transition overlay for smoother scroll to CTA section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-civitan-blue to-transparent z-20"></div>
    </section>
  );
};

export default TimelineSection;
