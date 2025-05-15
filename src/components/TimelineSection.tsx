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
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [cardTransforms, setCardTransforms] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize card transforms array
    setCardTransforms(Array(timelineEvents.length).fill(''));

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Handle timeline items animation with enhanced 3D effects and pulsing
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isItemVisible = rect.top < windowHeight * 0.85 && rect.bottom >= 0;
          
          if (isItemVisible) {
            ref.classList.add('animate-fade-in');
            ref.classList.add('opacity-100');
            
            // Add pulsing effect to the timeline point
            const timelinePoint = ref.querySelector('.timeline-point');
            if (timelinePoint) {
              timelinePoint.classList.add('timeline-point-pulse');
            }
            
            // Calculate how far the item is in the viewport (0 to 1)
            const viewportProgress = Math.min(
              Math.max(0, 1 - (rect.top / (windowHeight * 0.7))), 
              1
            );
            
            // Apply 3D transform based on scroll position - staggered effect
            const depth = 0.5 + (index % 3) * 0.2; // Vary the depth effect
            const rotationDirection = index % 2 === 0 ? 1 : -1; // Alternate rotation direction
            const translateY = viewportProgress * -10;
            const scale = 1 + viewportProgress * 0.03;
            const rotateX = viewportProgress * 2 * depth;
            const rotateY = viewportProgress * rotationDirection * depth;
            
            const transform = `
              perspective(1000px)
              scale(${scale})
              translateY(${translateY}px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;
            
            // Update shadow based on transform
            const shadowBlur = 10 + viewportProgress * 15;
            const shadowOpacity = 0.1 + viewportProgress * 0.1;
            
            ref.style.boxShadow = `0 ${5 + viewportProgress * 10}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
            
            // Store the transform to prevent unnecessary re-renders
            const newTransforms = [...cardTransforms];
            newTransforms[index] = transform;
            setCardTransforms(newTransforms);
            
            ref.style.transform = transform;
            ref.style.zIndex = `${10 + index}`;
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

      // Handle last item special animation for transition to CTA section
      if (lastItemRef.current) {
        const lastItemRect = lastItemRef.current.getBoundingClientRect();
        const ctaSection = document.getElementById('cta-section');
        
        if (ctaSection) {
          const ctaRect = ctaSection.getBoundingClientRect();
          
          // Check if we're approaching the CTA section
          const threshold = windowHeight * 0.5;
          const nearCta = ctaRect.top - threshold < windowHeight;

          // Calculate how close we are to triggering the expansion (0 to 1)
          const expansionProgress = Math.min(
            Math.max(0, 1 - ((ctaRect.top - windowHeight * 0.3) / windowHeight)), 
            1
          );
          
          setIsExpanding(expansionProgress > 0);
          
          if (lastItemRef.current) {
            // Apply stronger 3D transform and expansion based on scroll position
            if (expansionProgress > 0) {
              lastItemRef.current.style.transform = `
                scale(${1 + expansionProgress * 0.15})
                translateY(${expansionProgress * -30}px)
                perspective(1000px)
                rotateX(${expansionProgress * 8}deg)
              `;
              lastItemRef.current.style.zIndex = '30';
              lastItemRef.current.style.boxShadow = `0 ${expansionProgress * 25}px ${expansionProgress * 40}px rgba(0, 0, 0, ${expansionProgress * 0.25})`;
            }
          }
        }
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
  }, [cardTransforms.length]);

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
            Explore the key milestones in Duluth Civitan's history since our founding in 2003
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

          {/* Updated Timeline Connector Line */}
          <div className="timeline-connector absolute h-full w-1 bg-civitan-gray z-0 left-1/2 transform -translate-x-1/2"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => {
            const isLastItem = index === timelineEvents.length - 1;
            
            return (
              <div
                key={index}
                ref={el => {
                  timelineRefs.current[index] = el;
                  if (isLastItem) lastItemRef.current = el;
                }}
                className={`timeline-item relative flex mb-12 transition-all duration-500 ${
                  isLastItem ? 'last-timeline-item' : ''
                } ${
                  index % 2 === 0 
                    ? "md:flex-row flex-col-reverse" 
                    : "md:flex-row-reverse flex-col-reverse"
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, box-shadow',
                }}
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
                      ${isLastItem && isExpanding ? 'expanding-card' : ''}
                      timeline-card
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
                <div className="md:w-1/2 w-full relative">
                  {/* Timeline point with pulsing effect */}
                  <div className="timeline-point absolute w-4 h-4 bg-civitan-gold rounded-full z-10" 
                       style={{
                         top: '1.5rem',
                         left: '50%',
                         transform: 'translateX(-50%)',
                       }}>
                  </div>
                </div>
              </div>
            );
          })}
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
    </section>
  );
};

export default TimelineSection;
