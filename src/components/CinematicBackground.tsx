"use client";

import Image from "next/image";

export default function CinematicBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Image */}
      <Image
        src="/images/gta_urban_night.jpg"
        alt="Dark urban night background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105 opacity-40 brightness-75 contrast-125"
      />

      {/* Atmospheric Gradients & Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/90 via-[#0A0C10]/85 to-[#08090B]/95" />

      {/* Gritty Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(8,9,11,0.92)_85%)]" />

      {/* Subtle Horizontal Scanline Grid */}
      <div className="absolute inset-0 bg-scanlines opacity-25" />

      {/* Top and Bottom Lighting Accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F37021]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#242B35] to-transparent" />
    </div>
  );
}
