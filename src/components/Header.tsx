"use client";

import { EVENT_CONFIG } from "@/config/event";

interface HeaderProps {
  onOpenRsvp: () => void;
  isTestMode: boolean;
  onToggleTestMode: () => void;
}

export default function Header({
  onOpenRsvp,
  isTestMode,
  onToggleTestMode,
}: HeaderProps) {
  return (
    <header className="relative z-20 w-full border-b border-[#242B35]/80 bg-[#08090B]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href={EVENT_CONFIG.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 focus:outline-none focus:ring-1 focus:ring-[#F37021]"
            aria-label="Return to Seize da Flaq official site"
          >
            {/* Visual Icon Badge */}
            <div className="w-8 h-8 bg-gradient-to-br from-[#1E242E] to-[#12151B] border border-[#343D4B] flex items-center justify-center font-bold text-xs tracking-tighter text-[#F37021] group-hover:border-[#F37021] transition-colors">
              SF
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-[#EDE8DF] font-pricedown uppercase leading-none group-hover:text-white transition-colors">
                  {EVENT_CONFIG.eventName}
                </span>
                <span className="text-[10px] tracking-widest font-mono text-[#F37021] font-semibold bg-[#F37021]/10 px-1.5 py-0.5 border border-[#F37021]/30">
                  {EVENT_CONFIG.edition}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8F9BA8] uppercase leading-tight mt-0.5">
                CYBERONITES CLUB · GLA UNIVERSITY
              </span>
            </div>
          </a>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dataset Mode Switcher (Demo / Live) */}
          <button
            onClick={onToggleTestMode}
            className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 transition-all border ${
              isTestMode
                ? "bg-[#F37021]/15 text-[#F37021] border-[#F37021]/50 hover:bg-[#F37021]/25"
                : "bg-[#141820] text-[#8F9BA8] border-[#2A3340] hover:text-[#EDE8DF] hover:border-[#3E4A5C]"
            }`}
            title="Toggle between Live Shortlist and 150-Team Test Dataset"
            aria-label="Toggle dataset mode"
          >
            <span className="hidden sm:inline">DATASET: </span>
            {isTestMode ? "DEMO (150 TEAMS)" : "LIVE FILE"}
          </button>

          {/* Official Site Link */}
          <a
            href={EVENT_CONFIG.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#A0AAB6] hover:text-white px-3 py-1.5 transition-colors border border-transparent hover:border-[#2A3340]"
          >
            <span>EVENT SITE</span>
            <span className="text-[10px] text-[#F37021]" aria-hidden="true">
              ↗
            </span>
          </a>

          {/* Secondary RSVP Action Button */}
          <button
            onClick={onOpenRsvp}
            className="text-xs font-mono uppercase tracking-widest font-bold bg-[#1B212B] hover:bg-[#F37021] text-[#EDE8DF] hover:text-black px-3.5 sm:px-4 py-1.5 transition-all border border-[#353F4E] hover:border-[#F37021] shadow-sm flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#F37021]"
          >
            <span>RSVP INFO</span>
            <span className="w-1.5 h-1.5 bg-[#F37021] group-hover:bg-black rounded-full animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}
