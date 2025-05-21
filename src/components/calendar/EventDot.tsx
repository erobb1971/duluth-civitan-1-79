
import React from "react";
import { EventType } from "@/utils/events";

interface EventDotProps {
  type: EventType;
}

const EventDot = ({ type }: EventDotProps) => {
  const dotColors: Record<EventType, string> = {
    civitan: "bg-civitan-blue",
    national: "bg-red-500",
    international: "bg-yellow-500",
  };

  return (
    <div className={`h-1.5 w-1.5 rounded-full ${dotColors[type]} mx-0.5`} />
  );
};

export default EventDot;
