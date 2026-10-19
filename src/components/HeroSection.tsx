import { EVENT_CONFIG } from "@/config/event";

export default function HeroSection() {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-[#242B35]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3.5 px-2.5 py-1 bg-[#12161E]/90 backdrop-blur-sm border border-[#2B3542] text-[11px] font-mono tracking-widest text-[#F37021] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#F37021]" />
            <span>SDF//26 — SHORTLIST ARCHIVE</span>
          </div>

          {/* Main Campaign Headline with crisp contrast shadow */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#EDE8DF] font-oswald leading-none mb-2 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]">
            THE SELECTED<span className="text-[#F37021]">.</span>
          </h1>

          {/* Supporting Heading / Accent */}
          <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#C4CDD7] font-oswald mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            YOUR NEXT MISSION STARTS HERE.
          </h2>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base text-[#B8C4D2] leading-relaxed max-w-2xl font-space mb-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            The screening round is complete. Find your crew in the shortlist below and
            check your team details before completing the RSVP process for{" "}
            <span className="text-white font-semibold">{EVENT_CONFIG.eventName}</span>.
          </p>

          {/* Metadata Line */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#9AA7B6] tracking-wider uppercase pt-2 border-t border-[#1E2530]/80">
            <span className="flex items-center gap-1.5 text-[#F59E0B]">
              <span className="inline-block w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
              21–22 NOV 2026
            </span>
            <span className="text-[#364252]">•</span>
            <span>GLA UNIVERSITY, MATHURA</span>
            <span className="text-[#364252]">•</span>
            <span>OFFENSIVE CYBERSECURITY CTF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
