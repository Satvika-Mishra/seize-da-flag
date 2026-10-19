"use client";

import Image from "next/image";

export default function CinematicBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background Image: Crisp, high-clarity urban night */}
      <Image
        src="/images/gta_urban_night.jpg"
        alt="Dark urban night background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%] brightness-95 contrast-105 select-none"
      />

      {/* Layer 1: Left-to-Right directional gradient
          Darker on the left for hero text contrast; opens up on center & right to showcase city */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/85 via-[#08090B]/55 to-[#08090B]/30" />

      {/* Layer 2: Top-to-Bottom vertical gradient
          Open and cinematic at the top hero area (~40-50%); smoothly deepens down into the table section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/40 via-[#08090B]/60 via-60% to-[#08090B]/92" />

      {/* Layer 3: Subtle warm amber ambient warmth reflecting the streetlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,_rgba(243,112,33,0.08)_0%,_transparent_65%)]" />

      {/* Layer 4: Gentle edge vignette preserving the central street & skyline */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,_transparent_50%,_rgba(8,9,11,0.55)_100%)]" />

      {/* Subtle architectural hairline borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F37021]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#242B35] to-transparent" />
    </div>
  );
}
