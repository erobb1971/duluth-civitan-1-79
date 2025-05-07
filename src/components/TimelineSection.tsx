
import React from "react";

const timelineEvents = [
  {
    year: 1985,
    title: "Founding of Civitan Duluth",
    description: "The Civitan Duluth club was founded with a mission to serve the local community.",
  },
  {
    year: 1995,
    title: "10th Anniversary Celebration",
    description: "Marked a decade of service with special events and recognition from city officials.",
  },
  {
    year: 2005,
    title: "Expanded Youth Initiatives",
    description: "Launched new programs targeting youth leadership and community involvement.",
  },
  {
    year: 2010,
    title: "Partnership with Magic Farm",
    description: "Formed a partnership with Magic Farm to support sustainable agricultural education.",
  },
  {
    year: 2015,
    title: "30th Anniversary & City Award",
    description: "Received community service award from the City of Duluth during 30th anniversary celebration.",
  },
  {
    year: 2020,
    title: "Virtual Service Adaptation",
    description: "Adapted service projects to virtual formats during the global pandemic.",
  },
  {
    year: 2023,
    title: "Mayor's State of City Address",
    description: "Hosted and supported the Mayor's State of the City Address at the clubhouse.",
  },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="section bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-civitan-blue dark:text-civitan-gold mb-4">
            Our Journey Through Time
          </h2>
          <div className="w-24 h-1 bg-civitan-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Explore the key milestones in Civitan Duluth's history since our founding in 1985
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="timeline-connector"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={index}
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
                  <p className="text-gray-700 dark:text-gray-300">
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
