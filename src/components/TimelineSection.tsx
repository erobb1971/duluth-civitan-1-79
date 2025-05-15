
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
  const foundersRef = useRef<HTMLDivElement>(null);
  const [viewportItems, setViewportItems] = useState<boolean[]>([]);
  const [passedItems, setPassedItems] = useState<boolean[]>([]);
  const [foundersVisible, setFoundersVisible] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  
  // Initialize observed items state
  useEffect(() => {
    setViewportItems(new Array(timelineEvents.length).fill(false));
    setPassedItems(new Array(timelineEvents.length).fill(false));
  }, []);

  useEffect(() => {
    // Set up Intersection Observer for timeline items
    const itemObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 50% of the element must be visible
    };

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = timelineRefs.current.findIndex(ref => ref === entry.target);
        if (index !== -1) {
          // Update viewportItems state for current viewport visibility
          setViewportItems(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
          
          // Update passedItems state for items that have been scrolled past
          if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
            setPassedItems(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          } else if (!entry.isIntersecting && entry.boundingClientRect.bottom > window.innerHeight) {
            // Reset when scrolling back up
            setPassedItems(prev => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });
          }
        }
      });
    }, itemObserverOptions);

    // Set up observer for the founders section
    const foundersObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setFoundersVisible(entry.isIntersecting);
      });
    }, { threshold: 0.6 });

    // Set up observer for scroll cue visibility
    const scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.2) {
        setShowScrollCue(false);
      } else {
        setShowScrollCue(true);
      }
    }, { threshold: [0.2, 0.5] });

    // Observe timeline items
    timelineRefs.current.forEach((ref) => {
      if (ref) {
        itemObserver.observe(ref);
      }
    });

    // Observe founders section
    if (foundersRef.current) {
      foundersObserver.observe(foundersRef.current);
    }

    // Observe section for scroll cue
    if (sectionRef.current) {
      scrollObserver.observe(sectionRef.current);
    }

    // Cleanup observers on unmount
    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) itemObserver.unobserve(ref);
      });
      if (foundersRef.current) foundersObserver.unobserve(foundersRef.current);
      if (sectionRef.current) scrollObserver.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="section bg-gray-100 dark:bg-gray-800 py-10 md:py-16 overflow-hidden relative w-full"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3">
            Our Journey Through Time
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Duluth Civitan's history since our founding in 2003
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Founders Section with Enhanced Styling */}
          <div 
            ref={foundersRef}
            className={cn(
              "founders-section mb-12 text-center transition-all duration-700 ease-in-out transform",
              foundersVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
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
          <div className="absolute h-full w-0.5 bg-civitan-gray dark:bg-gray-600 z-0 left-1/2 transform -translate-x-1/2 top-0"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => {
            const isEventVisible = viewportItems[index];
            const isEventPassed = passedItems[index];
            const isEvenIndex = index % 2 === 0;
            
            return (
              <div
                key={index}
                ref={(el) => timelineRefs.current[index] = el}
                className={cn(
                  "timeline-item relative flex mb-12 md:mb-16",
                  isEvenIndex ? "md:flex-row" : "md:flex-row-reverse",
                  "flex-col-reverse"
                )}
              >
                {/* Content box */}
                <div className="md:w-1/2 w-full">
                  <div 
                    className={cn(
                      "timeline-card bg-white dark:bg-gray-900 p-4 md:p-5 lg:p-6 rounded-lg shadow-md",
                      isEvenIndex ? "md:mr-8 md:ml-0" : "md:ml-8 md:mr-0",
                      "mx-auto md:mx-0 max-w-sm md:max-w-none",
                      isEventVisible ? "timeline-card-visible" : "",
                      isEventPassed ? "timeline-card-passed" : "",
                      // 3D transformation classes for passed items
                      "transition-all duration-700 ease-out will-change-transform",
                      "transform-gpu perspective-1000",
                      isEventPassed && !isEventVisible ? 
                        "hover:scale-105 hover:shadow-lg" : 
                        "hover:shadow-md"
                    )}
                    style={{
                      // Apply 3D transformations when passed
                      transformStyle: 'preserve-3d',
                      transform: isEventPassed && !isEventVisible 
                        ? `perspective(1000px) translateY(-8px) translateZ(20px) rotateX(${isEvenIndex ? '5deg' : '5deg'}) rotateY(${isEvenIndex ? '-2deg' : '2deg'})` 
                        : 'perspective(1000px) translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg)',
                      boxShadow: isEventPassed && !isEventVisible 
                        ? '0 15px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)' 
                        : '0 4px 6px rgba(0, 0, 0, 0.05)',
                      opacity: isEventVisible || isEventPassed ? 1 : 0,
                      // Adding a slight delay based on index for staggered appearance
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <span className="inline-block bg-civitan-gold text-civitan-blue px-3 py-1 rounded-full text-sm font-bold mb-2">
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

                {/* Timeline Point with Marker */}
                <div className="md:w-1/2 w-full relative">
                  <div 
                    className={cn(
                      "timeline-point absolute rounded-full z-10",
                      isEventVisible ? "timeline-point-active" : "",
                      "transition-all duration-500"
                    )}
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: isEventVisible || isEventPassed ? '#FFC72C' : '#D1D3D4',
                      top: '24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      boxShadow: isEventVisible 
                        ? '0 0 0 6px rgba(255, 199, 44, 0.3)' 
                        : 'none',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add pulse animation and 3D effect styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 199, 44, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 199, 44, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 199, 44, 0); }
        }
        
        .timeline-point-active {
          animation: pulse 2s infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .timeline-card-passed:hover {
          animation: float 3s ease-in-out infinite;
        }
        
        .timeline-card-visible {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>

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
    </section>
  );
};

export default TimelineSection;
