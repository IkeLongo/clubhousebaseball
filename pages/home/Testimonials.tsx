"use client";

import { Carousel } from "@/components/ui/carousel";

export default function Testimonials() {
  const slideData = [
    {
      title: "Launching community by community",
      src: "/players_listening_to_coach.avif",
    },
    {
      title: "Built by people who coach and live youth baseball",
      src: "/coaching_clinic.jpg",
    },
    {
      title: "Focused on long-term fit, not hype",
      src: "/coach_with_players.webp",
    },
  ];
  return (
    <div className="base relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
