
import React, { useRef, useEffect } from "react";

const timelineEvents = [
  {
    year: 2003,
    title: "Duluth Civitan Club Founded",
    description: "The Duluth Civitan Club was officially founded on May 22, 2003.",
  },
  {
    year: "2003-2004",
    title: "First Club President",
    description: "Bob Watson served as the first president of the Duluth Civitan Club.",
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
    description: "Jon Hoovestol served as president until his passing.",
  },
  {
    year: "2020-2021",
    title: "Co-Presidential Term",
    description: "Jon Hoovestol and Terry Crouch served as co-presidents.",
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

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < windowHeight * 0.85 && rect.bottom >= 0;
          
          if (isVisible) {
            ref.classList.add('animate-fade-in');
            ref.classList.add('opacity-100');
          }
        }
      });
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
    <section id="timeline" className="section bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-3 sm:mb-4">
            Our Journey Through Time
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-civitan-gold mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 px-2">
            Explore the key milestones in Civitan Duluth's history since our founding in 2003
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="timeline-connector"></div>

          <div className="mb-8 text-center">
            <div className="inline-block bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-civitan-gold">
              <h3 className="text-xl font-bold text-civitan-blue dark:text-white mb-2">Founders / Club Builders</h3>
              <ul className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <li>Terry Crouch (Founder)</li>
                <li>Cheryl Crouch</li>
                <li>Terry Swaim</li>
                <li>Chuck Hartman</li>
              </ul>
            </div>
          </div>

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              ref={el => timelineRefs.current[index] = el}
              className={`timeline-item relative flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } mb-12`}
            >
              <div className="w-1/2"></div>
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "pl-8" : "pr-8 text-right"
                }`}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg civitan-shadow">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
