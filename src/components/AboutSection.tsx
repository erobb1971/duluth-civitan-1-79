
import React from "react";
import AboutHero from "./about/AboutHero";
import MissionVisionCards from "./about/MissionVisionCards";
import CoreValuesGrid from "./about/CoreValuesGrid";
import CivitanCreedPanel from "./about/CivitanCreedPanel";

const AboutSection = () => {
  return (
    <section id="about" className="section bg-white overflow-hidden">
      <AboutHero />
      <MissionVisionCards />
      <CoreValuesGrid />
      <CivitanCreedPanel />
    </section>
  );
};

export default AboutSection;
