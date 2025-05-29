
import React from "react";
import AboutHero from "./about/AboutHero";
import MissionVisionCards from "./about/MissionVisionCards";
import CoreValuesGrid from "./about/CoreValuesGrid";

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white overflow-hidden">
      <AboutHero />
      <MissionVisionCards />
      <CoreValuesGrid />
    </section>
  );
};

export default AboutSection;
