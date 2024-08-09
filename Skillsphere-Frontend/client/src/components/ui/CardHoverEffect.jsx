import React from "react";
import { HoverEffect } from "./ui-child/Card_Hover_Child";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    id: 1,
    title: "Title 1",
    description: "Your Feature description here 1.",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Your Feature description here 2.",
  },
  {
    id: 3,
    title: "Title 3",
    description: "Your Feature description here 3.",
  },
  {
    id: 4,
    title: "Title 4",
    description: "Your Feature description here 4.",
  },
  {
    id: 5,
    title: "Title 5",
    description: "Your Feature description here 5.",
  },
  {
    id: 6,
    title: "Title 6",
    description: "Your Feature description here 6.",
  },
];
